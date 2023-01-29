import { Test } from '@nestjs/testing';

import { AppModule } from '../../../app.module';
import { PrismaService } from '../../../prisma/prisma.service';
import { SaleService } from '../../sale.service';

describe('SaleService Integration', () => {
  let prisma: PrismaService;
  let saleService: SaleService;
  let customerId: string;
  let productId: string;
  let orderId: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    saleService = moduleRef.get(SaleService);
  });

  describe('createSale', () => {
    const customer = {
        email: "string",
        firstName: "string",
        lastName: "string",
        phone: "string",
    };

    const product = {
        description: "productDes",
        itemPrice: 10,
        name: "product",
    };

    const order = {
        customer: {
          connect: {
            id: "string"
          },
        },
        discount: 0,
        product: {
          connect: {
            id: "string",
          }
        },
        quantity: 1,
        totalPrice: 10,
    };

    const sale = {
        customerId: "string",
        orders: {
          connect: [
            {
              id: "string",
            },
          ],
        },
    };

    it('should create customer', async () => {
      const createdCustomer = await prisma.customer.create({ data: customer});

      expect(createdCustomer.firstName).toBe(customer.firstName)
      expect(createdCustomer.lastName).toBe(customer.lastName)
      expect(createdCustomer.email).toBe(customer.email)

      customerId = createdCustomer.id;
    });

    it('should create product', async () => {
      const createdProduct = await prisma.product.create({ data: product });

      expect(createdProduct.name).toBe(product.name)
      expect(createdProduct.itemPrice).toBe(product.itemPrice)
      expect(createdProduct.description).toBe(product.description)

      productId = createdProduct.id;
    });

    it('should create order', async () => {
      order.customer.connect.id = customerId;
      order.product.connect.id = productId;
      const createdOrder = await prisma.order.create({ data: order });

      expect(createdOrder.quantity).toBe(order.quantity)
      expect(createdOrder.discount).toBe(order.discount)
      expect(createdOrder.totalPrice).toBe(order.totalPrice)

      orderId = createdOrder.id;
    });

    it('should create sale', async () => {
      sale.customerId = customerId;
      sale.orders.connect[0].id = orderId;

      const createdSale = await saleService.create({ data: sale })
      
      expect(createdSale.customerId).toBe(customerId)
      expect(createdSale.id).toBeDefined()
    });
  });
});
