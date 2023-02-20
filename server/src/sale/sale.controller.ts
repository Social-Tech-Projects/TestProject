import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SaleService } from "./sale.service";
import { SaleControllerBase } from "./base/sale.controller.base";

@swagger.ApiTags("sales")
@common.Controller("sales")
export class SaleController extends SaleControllerBase {
  constructor(
    protected readonly service: SaleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
