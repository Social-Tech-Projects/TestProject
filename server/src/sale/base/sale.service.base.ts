import { PrismaService } from "../../prisma/prisma.service";

import { Prisma, Sale } from "@prisma/client";

export class SaleServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.SaleFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleFindManyArgs>
  ): Promise<Sale[]> {
    return this.prisma.sale.findMany(args);
  }

  async findOne<T extends Prisma.SaleFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleFindUniqueArgs>
  ): Promise<Sale | null> {
    return this.prisma.sale.findUnique(args);
  }

  async create<T extends Prisma.SaleCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleCreateArgs>
  ): Promise<Sale> {
    return this.prisma.sale.create<T>(args);
  }

  async update<T extends Prisma.SaleUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleUpdateArgs>
  ): Promise<Sale> {
    return this.prisma.sale.update<T>(args);
  }

  async delete<T extends Prisma.SaleDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SaleDeleteArgs>
  ): Promise<Sale> {
    return this.prisma.sale.delete(args);
  }
}
