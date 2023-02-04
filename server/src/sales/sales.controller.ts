import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SalesService } from "./sales.service";
import { SalesControllerBase } from "./base/sales.controller.base";

@swagger.ApiTags("sales")
@common.Controller("sales")
export class SalesController extends SalesControllerBase {
  constructor(
    protected readonly service: SalesService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
