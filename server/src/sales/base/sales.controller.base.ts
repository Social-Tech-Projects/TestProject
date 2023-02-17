import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as errors from "../../errors";
import { SalesService } from "../sales.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { SalesCreateInput } from "./SalesCreateInput";
import { Sales } from "./Sales";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SaleControllerBase {
  constructor(
    protected readonly service: SalesService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Sales })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(@common.Body() data: SalesCreateInput): Promise<Sales> {
    return await this.service.create({
      data: {
        ...data,
        order: data.order
          ? {
              connect: data.order,
            }
          : undefined,
        product: data.product
          ? {
              connect: data.product,
            }
          : undefined,
      },
      select: {
        createdAt: true,
        id: true,
        order: {
          select: {
            id: true,
          },
        },
        payementMethod: true,
        price: true,
        product: {
          select: {
            id: true,
          },
        },
        updatedAt: true,
      },
    });
  }

}