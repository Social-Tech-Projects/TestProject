import { ArgsType, Field } from "@nestjs/graphql";

import { SaleWhereUniqueInput } from "./SaleWhereUniqueInput";

@ArgsType()
class DeleteSaleArgs {
  @Field(() => SaleWhereUniqueInput, { nullable: false })
  where!: SaleWhereUniqueInput;
}

export { DeleteSaleArgs };
