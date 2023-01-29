import { ArgsType, Field } from "@nestjs/graphql";

import { SaleWhereUniqueInput } from "./SaleWhereUniqueInput";
import { SaleUpdateInput } from "./SaleUpdateInput";

@ArgsType()
class UpdateSaleArgs {
  @Field(() => SaleWhereUniqueInput, { nullable: false })
  where!: SaleWhereUniqueInput;
  @Field(() => SaleUpdateInput, { nullable: false })
  data!: SaleUpdateInput;
}

export { UpdateSaleArgs };
