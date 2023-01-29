import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested, IsOptional } from "class-validator";

import { SaleWhereInput } from "./SaleWhereInput";
import { Type } from "class-transformer";

@InputType()
class SaleListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => SaleWhereInput,
  })
  @ValidateNested()
  @Type(() => SaleWhereInput)
  @IsOptional()
  @Field(() => SaleWhereInput, {
    nullable: true,
  })
  every?: SaleWhereInput;

  @ApiProperty({
    required: false,
    type: () => SaleWhereInput,
  })
  @ValidateNested()
  @Type(() => SaleWhereInput)
  @IsOptional()
  @Field(() => SaleWhereInput, {
    nullable: true,
  })
  some?: SaleWhereInput;

  @ApiProperty({
    required: false,
    type: () => SaleWhereInput,
  })
  @ValidateNested()
  @Type(() => SaleWhereInput)
  @IsOptional()
  @Field(() => SaleWhereInput, {
    nullable: true,
  })
  none?: SaleWhereInput;
}
export { SaleListRelationFilter };
