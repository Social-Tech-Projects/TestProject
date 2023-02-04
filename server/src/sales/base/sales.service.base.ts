
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, Sales, Order } from "@prisma/client";

export class SalesServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SalesFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesFindManyArgs>
  ): Promise<number> {
    return this.prisma.sales.count(args);
  }

  async findMany<T extends Prisma.SalesFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesFindManyArgs>
  ): Promise<Sales[]> {
    return this.prisma.sales.findMany(args);
  }
  async findOne<T extends Prisma.SalesFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesFindUniqueArgs>
  ): Promise<Sales | null> {
    return this.prisma.sales.findUnique(args);
  }
  async create<T extends Prisma.SalesCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesCreateArgs>
  ): Promise<Sales> {
    return this.prisma.sales.create<T>(args);
  }
  async update<T extends Prisma.SalesUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesUpdateArgs>
  ): Promise<Sales> {
    return this.prisma.sales.update<T>(args);
  }
  async delete<T extends Prisma.SalesDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SalesDeleteArgs>
  ): Promise<Sales> {
    return this.prisma.sales.delete(args);
  }

  async getOrder(parentId: string): Promise<Order | null> {
    return this.prisma.sales
      .findUnique({
        where: { id: parentId },
      })
      .order();
  }

}
