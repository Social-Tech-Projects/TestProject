import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, ValidateNested, IsString } from "class-validator";
import { Type } from "class-transformer";

import { OrderCreateNestedManyWithoutProductsInput } from "./OrderCreateNestedManyWithoutProductsInput";

@InputType()
class SaleCreateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Field(() => String, {
    nullable: true,
  })
  customerId!: string;

  @ApiProperty({
    required: true,
    type: () => OrderCreateNestedManyWithoutProductsInput,
  })
  @ValidateNested()
  @Type(() => OrderCreateNestedManyWithoutProductsInput)
  @IsOptional()
  @Field(() => OrderCreateNestedManyWithoutProductsInput, {
    nullable: true,
  })
  orders!: OrderCreateNestedManyWithoutProductsInput;
}

export { SaleCreateInput };
