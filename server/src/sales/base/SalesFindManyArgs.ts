import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SalesWhereInput } from "./SalesWhereInput";
import { Type } from "class-transformer";
import { SalesOrderByInput } from "./SalesOrderByInput";

@ArgsType()
class SalesFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SalesWhereInput,
  })
  @Field(() => SalesWhereInput, { nullable: true })
  @Type(() => SalesWhereInput)
  where?: SalesWhereInput;

  @ApiProperty({
    required: false,
    type: [SalesOrderByInput],
  })
  @Field(() => [SalesOrderByInput], { nullable: true })
  @Type(() => SalesOrderByInput)
  orderBy?: Array<SalesOrderByInput>;

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

export { SalesFindManyArgs };
