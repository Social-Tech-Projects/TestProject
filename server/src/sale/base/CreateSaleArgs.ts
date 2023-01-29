import { ArgsType, Field } from "@nestjs/graphql";
import { SaleCreateInput } from "./SaleCreateInput";

@ArgsType()
class CreateSaleArgs {
  @Field(() => SaleCreateInput, { nullable: false })
  data!: SaleCreateInput;
}

export { CreateSaleArgs };
