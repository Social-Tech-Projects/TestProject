import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SaleWhereInput } from "./SaleWhereInput";
import { Type } from "class-transformer";
import { SaleOrderByInput } from "./SaleOrderByInput";

@ArgsType()
class SaleFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SaleWhereInput,
  })
  @Field(() => SaleWhereInput, { nullable: true })
  @Type(() => SaleWhereInput)
  where?: SaleWhereInput;

  @ApiProperty({
    required: false,
    type: [SaleOrderByInput],
  })
  @Field(() => [SaleOrderByInput], { nullable: true })
  @Type(() => SaleOrderByInput)
  orderBy?: Array<SaleOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { SaleFindManyArgs };
