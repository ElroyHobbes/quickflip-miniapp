export const quickFlipAbi = [
  {
    type: "function",
    name: "flip",
    stateMutability: "nonpayable",
    inputs: [{ name: "guess", type: "bool" }],
    outputs: []
  },
  {
    type: "function",
    name: "getWins",
    stateMutability: "view",
    inputs: [{ name: "player", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  {
    type: "function",
    name: "wins",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  {
    type: "event",
    name: "Flip",
    anonymous: false,
    inputs: [
      { indexed: true, name: "player", type: "address" },
      { indexed: false, name: "guess", type: "bool" },
      { indexed: false, name: "result", type: "bool" },
      { indexed: false, name: "win", type: "bool" }
    ]
  }
] as const;
