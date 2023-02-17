import { Module } from "@nestjs/common";
import { SalesModuleBase } from "./base/Sales.module.base";
import { SalesService } from "./sales.service";
import { SaleController } from "./sales.controller";
import { SaleResolver } from "./sales.resolver";

@Module({
  imports: [SalesModuleBase],
  controllers: [SaleController],
  providers: [SalesService, SaleResolver],
  exports: [SalesService],
})
export class SalesModule {}