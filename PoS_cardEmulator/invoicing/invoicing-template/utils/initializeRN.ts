import { RequestNetwork } from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { getTheGraphClient } from "@requestnetwork/payment-detection";

export const initializeRequestNetwork = (setter: any, walletClient: any) => {
  try {
    const web3SignatureProvider = new Web3SignatureProvider(walletClient);

    const requestNetwork = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL: "https://gnosis.gateway.request.network/",
      },
      signatureProvider: web3SignatureProvider,
      httpConfig: {
        getConfirmationMaxRetry: 120,
      },
      paymentOptions: {
        getSubgraphClient: (chain: string) => {
          // Ternary because cannot dynamically access environment variables in the browser
          const paymentsSubgraphUrl =
            chain === "arbitrum-one"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ARBITRUM_ONE
              : chain === "avalanche"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_AVALANCHE
              : chain === "base"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BASE
              : chain === "bsc"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BSC
              : chain === "celo"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CELO
              : chain === "core"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CORE
              : chain === "fantom"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FANTOM
              : chain === "fuse"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FUSE
              : chain === "mainnet"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MAINNET
              : chain === "matic"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MATIC
              : chain === "moonbeam"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MOONBEAM
              : chain === "near"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_NEAR
              : chain === "near-testnet"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_NEAR_TESTNET
              : chain === "optimism"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_OPTIMISM
              : chain === "ronin"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_RONIN
              : chain === "sepolia"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_SEPOLIA
              : chain === "tombchain"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_TOMBCHAIN
              : chain === "xdai"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_XDAI
              : chain === "zksyncera"
              ? process.env.NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ZKSYNCERA
              : undefined;
          if (!paymentsSubgraphUrl) {
            throw new Error(`Cannot get subgraph client for unknown chain: ${chain}`);
          }
          return getTheGraphClient(chain, paymentsSubgraphUrl);
        },
      },
    });

    setter(requestNetwork);
  } catch (error) {
    console.error("Failed to initialize the Request Network:", error);
    setter(null);
  }
};
