import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { SaleService } from "../sale.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { SaleCreateInput } from "./SaleCreateInput";
import { Sale } from "./Sale";
import { SaleFindManyArgs } from "./SaleFindManyArgs";

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SaleControllerBase {
  constructor(
    protected readonly service: SaleService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) { }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sale",
    action: "read",
    possession: "any",
  })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Sale] })
  @swagger.ApiForbiddenResponse()
  @ApiNestedQuery(SaleFindManyArgs)
  async findMany(@common.Req() request: Request): Promise<Sale[]> {
    const args = plainToClass(SaleFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        id: true,
        order: {
          select: {
            id: true
          }
        },
        note: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sale",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Sale })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(@common.Body() data: SaleCreateInput): Promise<Sale> {
    return await this.service.create({
      data: {
        ...data,
        order: data.order
          ? {
            connect: data.order,
          }
          : undefined,
      },
      select: {
        id: true,
        order: {
          select: {
            id: true,
          },
        },
        note: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
