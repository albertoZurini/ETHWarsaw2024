import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { WalletState } from "@web3-onboard/core";
import { useConnectWallet } from "@web3-onboard/react";
import { initializeRequestNetwork } from "./initializeRN";
import type { RequestNetwork } from "@requestnetwork/request-client.js";

interface ContextType {
  wallet: WalletState | null;
  requestNetwork: RequestNetwork | null;
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  const [{ wallet }] = useConnectWallet();
  const [requestNetwork, setRequestNetwork] = useState<RequestNetwork | null>(
    null
  );

  useEffect(() => {
    if (wallet) {
      const { provider } = wallet;
      initializeRequestNetwork(setRequestNetwork, provider);
    }
  }, [wallet]);

  return (
    <Context.Provider
      value={{
        wallet,
        requestNetwork,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext must be used within a Context Provider");
  }
  return context;
};
