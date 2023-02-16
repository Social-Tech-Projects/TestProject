import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SaleServiceBase } from "./base/sale.service.base";

@Injectable()
export class SaleService extends SaleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
