import { Module } from "@nestjs/common";

import { SaleModuleBase } from "./base/sale.module.base";
import { SaleService } from "./sale.service";
import { SaleController } from "./sale.controller";
import { SaleResolver } from "./sale.resolver";

@Module({
  imports: [SaleModuleBase],
  controllers: [SaleController],
  providers: [SaleService, SaleResolver],
  exports: [SaleService],
})
export class SaleModule {}
