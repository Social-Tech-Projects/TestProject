import * as swagger from '@nestjs/swagger';
import * as common from '@nestjs/common';
import * as nestAccessControl from 'nest-access-control';
import { SalesControllerBase } from './base/sales.controller.base';
import { SalesService } from './sales.service';

@swagger.ApiTags('sales')
@common.Controller('sales')
export class SalesController extends SalesControllerBase {
  constructor(
    protected readonly service: SalesService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
