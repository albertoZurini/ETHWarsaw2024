import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { currencies } from "@/utils/currencies";
import InvoiceDashboard from "@requestnetwork/invoice-dashboard/react";
import { useConnectWallet } from "@web3-onboard/react";
import Head from "next/head";

export default function InvoiceDashboardPage() {
  const [{ wallet }] = useConnectWallet();
  const { requestNetwork } = useAppContext();

  return (
    <>
      <Head>
        <title>Request Invoicing</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <InvoiceDashboard
          config={config}
          currencies={currencies}
          requestNetwork={requestNetwork}
          wallet={wallet}
        />
      </div>
    </>
  );
}
