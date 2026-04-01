"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { useReadContract } from "wagmi";

import { quickFlipContract } from "@/lib/contracts";

type UseWinsResult = {
  wins: bigint;
  winsText: string;
  isLoading: boolean;
  errorMessage: string | null;
  refetchWins: () => Promise<unknown>;
};

export function useWins(address?: Address): UseWinsResult {
  const result = useReadContract({
    ...quickFlipContract,
    functionName: "getWins",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      refetchOnWindowFocus: true
    }
  });

  const wins = (result.data ?? 0n) as bigint;
  const errorMessage = useMemo(() => {
    if (!result.error) return null;
    return result.error.message || "Failed to read onchain wins.";
  }, [result.error]);

  return {
    wins,
    winsText: wins.toString(),
    isLoading: result.isLoading || result.isRefetching,
    errorMessage,
    refetchWins: result.refetch
  };
}
