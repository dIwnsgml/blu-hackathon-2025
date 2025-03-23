"use client";

import { QueryClientProvider } from "@tanstack/react-query";

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
      <AppProvider>{children}</AppProvider>
    </QueryClientProvider>
  );
}

function AppProvider({ children }) {
  return { children };
}
