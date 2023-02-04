
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { SalesService } from "../sales.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { SalesCreateInput } from "./SalesCreateInput";
import { SalesWhereUniqueInput } from "./SalesWhereUniqueInput";
import { SalesFindManyArgs } from "./SalesFindManyArgs";
import { SalesUpdateInput } from "./SalesUpdateInput";
import { Sales } from "./Sales";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SalesControllerBase {
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
          : undefined
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        order: {
          select: {
            id: true,
          },
        },

        paymentType: true
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "read",
    possession: "any",
  })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Sales] })
  @swagger.ApiForbiddenResponse()
  @ApiNestedQuery(SalesFindManyArgs)
  async findMany(@common.Req() request: Request): Promise<Sales[]> {
    const args = plainToClass(SalesFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        order: {
          select: {
            id: true,
          },
        },

        paymentType: true
      },

    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "read",
    possession: "own",
  })
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Sales })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SalesWhereUniqueInput
  ): Promise<Sales | null> {
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        order: {
          select: {
            id: true,
          },
        },

        paymentType: true
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Sales })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SalesWhereUniqueInput,
    @common.Body() data: SalesUpdateInput
  ): Promise<Sales | null> {
    try {
      return await this.service.update({
        where: params,
        data: {
          ...data,

          order: data.order
          ? {
              connect: data.order,
            }
          : undefined
        },
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
    
            order: {
              select: {
                id: true,
              },
            },
    
            paymentType: true
          },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @nestAccessControl.UseRoles({
    resource: "Sales",
    action: "delete",
    possession: "any",
  })
  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Sales })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SalesWhereUniqueInput
  ): Promise<Sales | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
            id: true,
            createdAt: true,
            updatedAt: true,
    
            order: {
              select: {
                id: true,
              },
            },
    
            paymentType: true
          },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
