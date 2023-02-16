import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { OrderWhereUniqueInput } from '../../order/base/OrderWhereUniqueInput';
import { ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { PaymentType } from './Sales';

@InputType()
class SalesCreateInput {
  @ApiProperty({
    required: false,
    type: () => OrderWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => OrderWhereUniqueInput)
  @IsOptional()
  @Field(() => OrderWhereUniqueInput, {
    nullable: true,
  })
  order?: OrderWhereUniqueInput | null;

  @ApiProperty({
    required: true,
    enum: PaymentType,
  })
  @IsEnum(PaymentType)
  @Field(() => PaymentType)
  paymentType!: PaymentType;
}

export { SalesCreateInput };
