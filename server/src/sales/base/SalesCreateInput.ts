import { InputType, Field, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerWhereUniqueInput } from "../../customer/base/CustomerWhereUniqueInput";
import { ValidateNested, IsOptional, IsNumber, IsInt, IsString, IsEnum } from "class-validator";
import { Type } from "class-transformer";
import { ProductWhereUniqueInput } from "../../product/base/ProductWhereUniqueInput";

export enum PaymentMode {
  CASH = 'cash',
  CARD = 'card',
  UPI = 'upi',
}

registerEnumType(PaymentMode, {
  name: "PaymentModeType",
});

export enum Status {
  RECEIVED = 'received',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  RETURNED = 'returned',
}

registerEnumType(Status, {
  name: "StatusType",
});

@InputType()
class SalesCreateInput {
  @ApiProperty({
    required: false,
    type: () => CustomerWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => CustomerWhereUniqueInput)
  @IsOptional()
  @Field(() => CustomerWhereUniqueInput, {
    nullable: true,
  })
  customer?: CustomerWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  discount?: number | null;

  @ApiProperty({
    required: false,
    type: () => ProductWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ProductWhereUniqueInput)
  @IsOptional()
  @Field(() => ProductWhereUniqueInput, {
    nullable: true,
  })
  product?: ProductWhereUniqueInput | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  quantity?: number | null;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  @Field(() => Number, {
    nullable: true,
  })
  totalPrice?: number | null;

  @ApiProperty({
    required: false,
    enum: [Status.DELIVERED, Status.RECEIVED, Status.RETURNED, Status.SHIPPED],
  })
  @IsEnum(Status)
  @IsOptional()
  @Field(() => Status, {
    nullable: true,
    defaultValue: Status.RECEIVED,
  })
  status?: Status | Status.RECEIVED;

  @ApiProperty({
    required: false,
    enum: [PaymentMode.CARD, PaymentMode.CASH, PaymentMode.UPI],
  })
  @IsEnum(PaymentMode)
  @IsOptional()
  @Field(() => PaymentMode, {
    nullable: true,
    defaultValue: PaymentMode.CASH,
  })
  paymentMode?: PaymentMode | PaymentMode.CASH;
}

export { SalesCreateInput };
