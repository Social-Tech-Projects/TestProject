import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateSalesArgs } from "./CreateSalesArgs";
// import { UpdateSaleArgs } from "./UpdateSaleArgs";
// import { DeleteSaleArgs } from "./DeleteSaleArgs";
// import { SaleFindManyArgs } from "./SaleFindManyArgs";
import { SalesFindUniqueArgs } from "./SalesFindUniqueArgs";
import { Sales } from "./Sales";
import { Order } from "../../order/base/Order";
import { Product } from "../../product/base/Product";
import { SalesService } from "../sales.service";
import { SalesCreateInput } from './SalesCreateInput'

@graphql.Resolver(() => Sales)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SaleResolverBase {
  constructor(
    protected readonly service: SalesService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  // @graphql.Query(() => MetaQueryPayload)
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "read",
  //   possession: "any",
  // })
  // async _salesMeta(
  //   @graphql.Args() args: SaleFindManyArgs
  // ): Promise<MetaQueryPayload> {
  //   const results = await this.service.count({
  //     ...args,
  //     skip: undefined,
  //     take: undefined,
  //   });
  //   return {
  //     count: results,
  //   };
  // }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  // @graphql.Query(() => [Sales])
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "read",
  //   possession: "any",
  // })
  // async sales(@graphql.Args() args: SalesFindManyArgs): Promise<Sales[]> {
  //   return this.service.findMany(args);
  // }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  // @graphql.Query(() => Sales, { nullable: true })
  // @nestAccessControl.UseRoles({
  //   resource: "Sales",
  //   action: "read",
  //   possession: "own",
  // })
  // async sale(@graphql.Args() args: SalesFindUniqueArgs): Promise<Sales | null> {
  //   const result = await this.service.findOne(args);
  //   if (result === null) {
  //     return null;
  //   }
  //   return result;
  // }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => Sales)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "create",
    possession: "any",
  })
  async createSale(@graphql.Args() args: CreateSalesArgs): Promise<Sales> {
    console.log(args);
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