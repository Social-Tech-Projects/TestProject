import { Module } from '@nestjs/common';
import { SalesModuleBase } from './base/sales.module.base';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

@Module({
  imports: [SalesModuleBase],
  controllers: [SalesController],
  exports: [SalesService],
  providers: [SalesService],
})
export class SalesModule {}
