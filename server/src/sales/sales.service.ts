import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SalesServiceBase } from "./base/sales.service.base";

@Injectable()
export class SalesService extends SalesServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
