import { defineEntity, type InferEntity, p } from "@mikro-orm/core";
import { v4 } from "uuid";

export const WalletSchema = defineEntity({
  name: "Wallet",
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v4()),
  },
});

export type IWallet = InferEntity<typeof WalletSchema>;
