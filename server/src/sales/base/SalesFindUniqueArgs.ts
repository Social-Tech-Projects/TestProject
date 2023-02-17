import { ArgsType, Field } from "@nestjs/graphql";
import { SalesWhereUniqueInput } from "./SalesWhereUniqueInput";

@ArgsType()
class SalesFindUniqueArgs {
  @Field(() => SalesWhereUniqueInput, { nullable: false })
  where!: SalesWhereUniqueInput;
}

export { SalesFindUniqueArgs };
