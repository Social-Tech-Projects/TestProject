import { Module } from "@nestjs/common";
import { SalesModuleBase } from "./base/sales.module.base";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";
import { SalesResolver } from "./sales.resolver";

@Module({
  imports: [SalesModuleBase],
  controllers: [SalesController],
  providers: [SalesService, SalesResolver],
  exports: [SalesService],
})
export class SalesModule {}
