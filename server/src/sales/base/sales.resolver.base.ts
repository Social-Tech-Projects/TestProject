import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateSalesArgs } from "./CreateSalesArgs";
import { Sales } from "./Sales";
import { SalesService } from "../sales.service";

@graphql.Resolver(() => Sales)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SaleResolverBase {
  constructor(
    protected readonly service: SalesService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Sales)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "create",
    possession: "any",
  })
  async createSale(@graphql.Args() args: CreateSalesArgs): Promise<Sales> {
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        order: args.data.order
          ? {
              connect: args.data.order,
            }
          : undefined,

        product: args.data.product
          ? {
              connect: args.data.product,
            }
          : undefined,
      },
    });
  }
}