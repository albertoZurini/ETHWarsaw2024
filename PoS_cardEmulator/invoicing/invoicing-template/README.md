# Request Invoicing (Invoicing Template)

A simple invoicing template for creating, paying, and viewing requests in Request Network.

Built with:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Request Network](https://request.network/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## Install

```
npm install
```

## Run

```
npm run start
```

## Develop

```
cp .env.example .env.local
npm run dev
```

## Deploy

We deploy to an [EasyPanel](https://easypanel.io/) server using Github Actions and [Heroku Buildpacks](https://devcenter.heroku.com/articles/buildpacks). You could easily deploy to Vercel, Netlify, or any other platform.

- [deploy-to-staging.yml](/.github/workflows/deploy-to-staging.yml) - Deploy to Staging on push to `main` branch.
- [deploy-to-production.yml](/.github/workflows/deploy-to-production.yml) - Deploy to Production on release published in Github.

## Environment Variables

Before deploying, ensure you have created a `.env` or `.env.local` file in the root of your project. Below is a list of available environment variables. You can also take a look at the [.env.example](./.env.example) file for reference.

> **:warning: WARNING:** The default `PAYMENTS_SUBGRAPH_URL`s are rate-limited and should be replaced with your own subgraph URLs.

| Variable Name                                  | Description                          | Required |
| ---------------------------------------------- | ------------------------------------ | -------- |
| NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID          | Your Wallet Connect Project ID       | ✅       |
| NEXT_PUBLIC_SUPPORT_EMAIL                      | Support email address                | ✅       |
| NEXT_PUBLIC_APP_URL                            | The application URL                  | ✅       |
| NEXT_PUBLIC_RPC_URL_ETHEREUM                   | RPC URL for Ethereum                 | ✅       |
| NEXT_PUBLIC_RPC_URL_POLYGON                    | RPC URL for Polygon                  | ✅       |
| NEXT_PUBLIC_RPC_URL_SEPOLIA                    | RPC URL for Sepolia                  | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ARBITRUM_ONE | Subgraph URL for Arbitrum One        | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_AVALANCHE    | Subgraph URL for Avalanche           | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BASE         | Subgraph URL for Base                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_BSC          | Subgraph URL for Binance Smart Chain | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CELO         | Subgraph URL for Celo                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_CORE         | Subgraph URL for Core                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FANTOM       | Subgraph URL for Fantom              | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_FUSE         | Subgraph URL for Fuse                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MAINNET      | Subgraph URL for Mainnet             | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MATIC        | Subgraph URL for Matic               | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_MOONBEAM     | Subgraph URL for Moonbeam            | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_NEAR         | Subgraph URL for Near                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_NEAR_TESTNET | Subgraph URL for Near Testnet        | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_OPTIMISM     | Subgraph URL for Optimism            | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_RONIN        | Subgraph URL for Ronin               | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_SEPOLIA      | Subgraph URL for Sepolia             | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_TOMBCHAIN    | Subgraph URL for Tombchain           | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_XDAI         | Subgraph URL for xDai                | ✅       |
| NEXT_PUBLIC_PAYMENTS_SUBGRAPH_URL_ZKSYNCERA    | Subgraph URL for ZkSyncEra           | ✅       |

## Configuration

In your next.config.js file, ensure you have the following configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
};

export default nextConfig;
```

#### Explanation

This configuration ensures that the Svelte web components render correctly. The swcMinify: false setting is crucial because Svelte web components and their rendering nature can sometimes conflict with aggressive minification processes. Disabling SWC minification helps prevent potential issues with web component rendering.
