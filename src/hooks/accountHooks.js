import { getAccount } from "@/apis/accountApi";
import { updateQueryData } from "@/utils/tools";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useAccount() {
  const queryClient = useQueryClient();

  const queryResult = useQuery({
    queryKey: [`useAccount`],
    queryFn: getAccount,
    staleTime: 1000 * 60 * 10,
    select: (response) => response?.data?.userinfo || false,
  });

  const {
    data: accountData,
    refetch: accountRefetch,
    isLoading: accountIsLoading,
    error: accountError,
  } = queryResult;

  const clearAccountData = useCallback(() => {
    queryClient.removeQueries({ queryKey: "useAccount" });
  }, []);

  const updateUserInfo = useCallback(async (newData) => {
    await queryClient.setQueryData(["useAccount"], (oldData) => {
      return updateQueryData(oldData, newData, "userinfo");
    });
  }, []);

  return {
    accountData,
    accountRefetch,
    accountError,
    accountIsLoading,
    clearAccountData,
    updateUserInfo,
    ...queryResult,
  };
}
