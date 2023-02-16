import { Module } from "@nestjs/common";
import { SaleModuleBase } from "./base/sale.module.base";
import { SaleService } from "./sale.service";
import { SaleController } from "./sale.controller";

@Module({
  imports: [SaleModuleBase],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [SaleService],
})
export class SaleModule { }
