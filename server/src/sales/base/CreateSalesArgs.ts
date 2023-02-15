import { ArgsType, Field } from "@nestjs/graphql";
import { SalesCreateInput } from "./SalesCreateInput";

@ArgsType()
class CreateSalesArgs {
  @Field(() => SalesCreateInput, { nullable: false })
  data!: SalesCreateInput;
}

export { CreateSalesArgs };
