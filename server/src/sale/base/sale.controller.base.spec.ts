import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
  ValidationPipe,
} from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { SaleController } from "../sale.controller";
import { SaleService } from "../sale.service";

const ORDER = {
  id: "exampleId",
  customerId: 'customerId',
  productId: 'productId',
  quantity: 42,
  totalPrice: 42,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const nonExistingId = "nonExistingId";
const existingId = "existingId";

const CREATE_INPUT = {
  id: "exampleId",
  orderId: ORDER.id,
  note: 'a sale note',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CREATE_RESULT = {
  id: "exampleId",
  orderId: ORDER.id,
  note: 'a sale note',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const FIND_MANY_RESULT = [
  {
    createdAt: new Date(),
    discount: 42.42,
    id: "exampleId",
    quantity: 42,
    totalPrice: 42,
    updatedAt: new Date(),
  },
];

const FIND_ONE_RESULT = {
  id: "exampleId",
  orderId: ORDER.id,
  note: 'a sale note',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};

const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Sale", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SaleService,
          useValue: service,
        },
      ],
      controllers: [SaleController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  test("GET /sales", async () => {
    await request(app.getHttpServer())
      .get("/sales")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  describe("POST /sales", () => {
    test("should create a sale", async () => {
      await request(app.getHttpServer())
        .post("/sales")
        .send(CREATE_INPUT)
        .expect(HttpStatus.CREATED)
        .expect({
          ...CREATE_RESULT,
          createdAt: CREATE_RESULT.createdAt.toISOString(),
          updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        });
    });

    test("should throw validation when order invalid", async () => {
      const CREATE_INVALID_INPUT = {
        id: "exampleId",
        order: 1,
        note: 'note',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await request(app.getHttpServer())
        .post("/sales")
        .send(CREATE_INVALID_INPUT)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            "order.nested property order must be either object or array"
          ],
          error: "Bad Request"
        });
    });

    test("should throw validation when note is not string", async () => {
      const CREATE_INVALID_INPUT = {
        id: "exampleId",
        note: 2222,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await request(app.getHttpServer())
        .post("/sales")
        .send(CREATE_INVALID_INPUT)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: 400,
          message: [
            "note must be a string"
          ],
          error: "Bad Request"
        });
    });

    test("should throw conflict when existing resource", async () => {
      let agent = request(app.getHttpServer());
      await agent
        .post("/sales")
        .send(CREATE_INPUT)
        .expect(HttpStatus.CREATED)
        .expect({
          ...CREATE_RESULT,
          createdAt: CREATE_RESULT.createdAt.toISOString(),
          updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        })
        .then(function () {
          agent
            .post("/sales")
            .send(CREATE_INPUT)
            .expect(HttpStatus.CONFLICT)
            .expect({
              statusCode: HttpStatus.CONFLICT,
            });
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
