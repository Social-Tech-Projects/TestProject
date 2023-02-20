import { PrismaService } from "../../prisma/prisma.service";
// @ts-ignore
import { Prisma, Sale, Order } from "@prisma/client";

export class SaleServiceBase {
  constructor(protected readonly prisma: PrismaService) { }

  async findMany<T extends Prisma.SaleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleFindManyArgs>
  ): Promise<Sale[]> {
    return this.prisma.sale.findMany(args);
  }

  async create<T extends Prisma.SaleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleCreateArgs>
  ): Promise<Sale> {
    // @ts-ignore
    return this.prisma.sale.create<T>(args);
  }

  async getOrder(parentId: string): Promise<Order | null> {
    return this.prisma.sale
      .findUnique({
        where: { id: parentId },
      })
      .order();
  }
}
