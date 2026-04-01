import { Attribution } from "ox/erc8021";

import { quickFlipAbi } from "@/lib/abi/quickFlipAbi";
import {
  BUILDER_CODE_PLACEHOLDER,
  QUICKFLIP_CONTRACT_ADDRESS
} from "@/lib/constants";

// 这里替换为真实 Builder Code
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: [BUILDER_CODE_PLACEHOLDER]
});

export const quickFlipContract = {
  address: QUICKFLIP_CONTRACT_ADDRESS,
  abi: quickFlipAbi
} as const;
