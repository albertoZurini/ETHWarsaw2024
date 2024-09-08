import { Types } from "@requestnetwork/request-client.js";

export const currencies = [
  {
    symbol: "FAU",
    address: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
    network: "sepolia",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ERC20,
  },
  {
    symbol: "ETH",
    address: "eth",
    network: "sepolia",
    decimals: 18,
    type: Types.RequestLogic.CURRENCY.ETH,
  },
];
