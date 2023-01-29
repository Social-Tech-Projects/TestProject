import { ArgsType, Field } from "@nestjs/graphql";

import { SaleWhereUniqueInput } from "./SaleWhereUniqueInput";

@ArgsType()
class SaleFindUniqueArgs {
  @Field(() => SaleWhereUniqueInput, { nullable: false })
  where!: SaleWhereUniqueInput;
}

export { SaleFindUniqueArgs };
