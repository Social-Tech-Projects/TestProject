import { PrismaService } from '../prisma/prisma.service';
import { SalesServiceBase } from './base/sales.service.base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService extends SalesServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
