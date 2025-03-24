"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProviders, { AccountModalContext } from "./ModalProviders";
import { useContext, useEffect } from "react";
import { useAccount } from "@/hooks/accountHooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failiureCount, err) => {
        console.log(err?.response?.status, "err");
        if (err?.response?.status) {
          const retryableStatusCodes = [500, 502, 503, 504, 408];
          return retryableStatusCodes.includes(err.response.status);
        }

        // Retry if it's a network error (e.g., ECONNABORTED)
        return err.message === "Network Error" || err.code === "ECONNABORTED";
      },
      retryDelay: (retryCount) => {
        return Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, etc.
      },
      gcTime: 1000 * 60 * 10,
    },
  },
});

export function AppContainer({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProviders>
        <AppProvider>{children}</AppProvider>
      </ModalProviders>
    </QueryClientProvider>
  );
}

function AppProvider({ children }) {
  const { accountData } = useAccount();

  const { setIsAccountModal } = useContext(AccountModalContext);

  useEffect(() => {
    if (accountData) {
      setIsAccountModal(false);
      return;
    }

    setIsAccountModal(true);
  }, [accountData]);

  return children;
}
