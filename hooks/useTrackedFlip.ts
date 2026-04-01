"use client";

import { useCallback } from "react";
import { Address, Hex, parseEventLogs } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";

import { quickFlipAbi } from "@/lib/abi/quickFlipAbi";
import { APP_NAME, QUICKFLIP_APP_ID } from "@/lib/constants";
import { DATA_SUFFIX, quickFlipContract } from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

export type FlipEventData = {
  player: Address;
  guess: boolean;
  result: boolean;
  win: boolean;
};

type FlipTrackedInput = {
  guess: boolean;
  userAddress: Address;
};

type FlipTrackedOutput = {
  txHash: Hex;
  flipEvent: FlipEventData | null;
};

export function useTrackedFlip() {
  const publicClient = usePublicClient({ chainId: base.id });
  const { writeContractAsync, isPending } = useWriteContract();

  const flipTracked = useCallback(
    async ({ guess, userAddress }: FlipTrackedInput): Promise<FlipTrackedOutput> => {
      const txHash = await writeContractAsync({
        ...quickFlipContract,
        functionName: "flip",
        args: [guess],
        dataSuffix: DATA_SUFFIX as Hex
      });

      void trackTransaction(QUICKFLIP_APP_ID, APP_NAME, userAddress, txHash);

      let flipEvent: FlipEventData | null = null;
      if (publicClient) {
        try {
          const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
          const events = parseEventLogs({
            abi: quickFlipAbi,
            eventName: "Flip",
            logs: receipt.logs
          });
          const args = events[0]?.args;
          if (args?.player !== undefined) {
            flipEvent = {
              player: args.player as Address,
              guess: Boolean(args.guess),
              result: Boolean(args.result),
              win: Boolean(args.win)
            };
          }
        } catch {
          flipEvent = null;
        }
      }

      return { txHash, flipEvent };
    },
    [publicClient, writeContractAsync]
  );

  return {
    flipTracked,
    isFlipping: isPending
  };
}
