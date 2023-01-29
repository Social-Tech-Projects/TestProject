import { InputType } from "@nestjs/graphql";
import { PartialType } from "@nestjs/swagger";

import { SaleCreateInput } from "./SaleCreateInput";

@InputType()
class SaleUpdateInput extends PartialType(SaleCreateInput) {}

export { SaleUpdateInput };
