import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import * as nestAccessControl from 'nest-access-control';
import * as defaultAuthGuard from '../../auth/defaultAuth.guard';
import * as errors from '../../errors';
import { SalesService } from '../sales.service';
import { AclValidateRequestInterceptor } from '../../interceptors/aclValidateRequest.interceptor';
import { SalesCreateInput } from './SalesCreateInput';
import { Sales } from './Sales';

@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class SalesControllerBase {
  constructor(
    protected readonly service: SalesService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: 'Sales',
    action: 'create',
    possession: 'any',
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
      },
      select: {
        id: true,
        order: {
          select: {
            id: true,
          },
        },
        paymentType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
