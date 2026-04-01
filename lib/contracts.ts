import { Attribution } from "ox/erc8021";
import type { Hex } from "viem";

import { quickFlipAbi } from "@/lib/abi/quickFlipAbi";
import {
  QUICKFLIP_BUILDER_CODE,
  QUICKFLIP_BUILDER_DATA_SUFFIX,
  QUICKFLIP_CONTRACT_ADDRESS
} from "@/lib/constants";

// 这里已替换为真实 Builder Code: bc_hots2jvt
export const DATA_SUFFIX_FROM_CODE = Attribution.toDataSuffix({
  codes: [QUICKFLIP_BUILDER_CODE]
});

// 使用你提供的 encoded string，确保与 Builder 归因一致
export const DATA_SUFFIX = QUICKFLIP_BUILDER_DATA_SUFFIX as Hex;

export const quickFlipContract = {
  address: QUICKFLIP_CONTRACT_ADDRESS,
  abi: quickFlipAbi
} as const;
