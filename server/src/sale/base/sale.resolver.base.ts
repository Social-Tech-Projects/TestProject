import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";

import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateSaleArgs } from "./CreateSaleArgs";
import { UpdateSaleArgs } from "./UpdateSaleArgs";
import { DeleteSaleArgs } from "./DeleteSaleArgs";
import { SaleFindManyArgs } from "./SaleFindManyArgs";
import { SaleFindUniqueArgs } from "./SaleFindUniqueArgs";
import { Sale } from "./Sale";
import { OrderFindManyArgs } from "../../order/base/OrderFindManyArgs";
import { Order } from "../../order/base/Order";
import { SaleService } from "../sale.service";

@graphql.Resolver(() => Sale)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SaleResolverBase {
  constructor(
    protected readonly service: SaleService,
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
  // @graphql.Query(() => [Sale])
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "read",
  //   possession: "any",
  // })
  // async sales(
  //   @graphql.Args() args: SaleFindManyArgs
  // ): Promise<Sale[]> {
  //   return this.service.findMany(args);
  // }

  // @common.UseInterceptors(AclFilterResponseInterceptor)
  // @graphql.Query(() => Sale, { nullable: true })
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "read",
  //   possession: "own",
  // })
  // async sale(
  //   @graphql.Args() args: SaleFindUniqueArgs
  // ): Promise<Sale | null> {
  //   const result = await this.service.findOne(args);
  //   if (result === null) {
  //     return null;
  //   }
  //   return result;
  // }

  // @common.UseInterceptors(AclValidateRequestInterceptor)
  // @graphql.Mutation(() => Sale)
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "create",
  //   possession: "any",
  // })
  // async createSale(
  //   @graphql.Args() args: CreateSaleArgs
  // ): Promise<Sale> {
  //   return await this.service.create({
  //     ...args,
  //     data: args.data,
  //   });
  // }

  // @common.UseInterceptors(AclValidateRequestInterceptor)
  // @graphql.Mutation(() => Sale)
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "update",
  //   possession: "any",
  // })
  // async updateSale(
  //   @graphql.Args() args: UpdateSaleArgs
  // ): Promise<Sale | null> {
  //   try {
  //     return await this.service.update({
  //       ...args,
  //       data: args.data,
  //     });
  //   } catch (error) {
  //     if (isRecordNotFoundError(error)) {
  //       throw new apollo.ApolloError(
  //         `No resource was found for ${JSON.stringify(args.where)}`
  //       );
  //     }
  //     throw error;
  //   }
  // }

  // @graphql.Mutation(() => Sale)
  // @nestAccessControl.UseRoles({
  //   resource: "Sale",
  //   action: "delete",
  //   possession: "any",
  // })
  // async deleteSale(
  //   @graphql.Args() args: DeleteSaleArgs
  // ): Promise<Sale | null> {
  //   try {
  //     return await this.service.delete(args);
  //   } catch (error) {
  //     if (isRecordNotFoundError(error)) {
  //       throw new apollo.ApolloError(
  //         `No resource was found for ${JSON.stringify(args.where)}`
  //       );
  //     }
  //     throw error;
  //   }
  // }
}
