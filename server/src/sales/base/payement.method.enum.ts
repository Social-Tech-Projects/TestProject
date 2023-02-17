import { registerEnumType } from "@nestjs/graphql";

export enum EnumSalePayementMethod {
  Online = "online",
  Offline = "offline",
}

registerEnumType(EnumSalePayementMethod, {
  name: "EnumSalePayementMethod",
});