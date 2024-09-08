import CreateInvoiceForm from "@requestnetwork/create-invoice-form/react";
import Head from "next/head";
import { config } from "@/utils/config";
import { useAppContext } from "@/utils/context";
import { currencies } from "@/utils/currencies";

export default function CreateInvoice() {
  const { wallet, requestNetwork } = useAppContext();

  return (
    <>
      <Head>
        <title>Request Invoicing - Create an Invoice</title>
      </Head>
      <div className="container m-auto  w-[100%]">
        <CreateInvoiceForm
          config={config}
          signer={wallet?.accounts[0]?.address || ""}
          requestNetwork={requestNetwork}
          currencies={currencies}
        />
      </div>
    </>
  );
}
