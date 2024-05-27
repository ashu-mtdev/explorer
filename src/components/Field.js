export const convertField = name => {
  // ethereum
  return ethereumField[name];
};
export const convertBitCoinField = name => {
  return bitCoinFields[name];
}; //bitcoin

const ethereumField = {
  from_email: "From email",
  to_email: "To email",
  v: "v",
  baseFeePerGas: "Base fee per gas",
  maxPriorityFeePerGas: "Max priority fee per gas",
  chainId: "Chain Id",
  maxFeePerGas: "Base fee per gas",
  gasPrice: "Gas Price",
  gas: "Gas Limit",
  hash: "Hash",
  input: "Input",
  nonce: "Nonce",
  r: "r",
  s: "s",
  to: "to",
  transactionIndex: "Transaction Index",
  type: "Type",
  value: "Internal Value",
  data: "Data",
  timestamp: "Time"
};
const bitCoinFields = {
  size: "Size",
  weight: "Weight",
  is_coinbase: "Coinbase",
  version: "Version",
  fee: "Fee",
  feePerKB: "Fee per KB",
  feePerKWU: "Fee per KWU",
  witness: "Witness",
  locktime: "Locktime",
  version: "Version",
  gasPrice: "Gas Price",
  chainId: "Chain Id",
  gas: "Gas ",
  hash: "hash",
  input: "input",
  nonce: "nonce",
  r: "r",
  s: "s",
  to: "to",
  transactionIndex: "Transaction Index",
  type: "type",
  value: "value",
  data: "data",
  timestamp: "Time"
};

export const SITE_DATA = {
  name: "Blockchain Checker",
  telegram: "https://telegram.me/jasonw_23",
  twitter: "https://twitter.com/Blockchain25608",
  linkedin: "#",
  github: "https://github.com/Blockchainchecker"
};

export const FAQ_DATA = [
  {
    index: 1,
    question: "Why is my transaction taking so long to process?",
    answer:
      "If your transaction is delayed, the likely cause is a low transaction fee. Miners prioritize transactions based on fees, leading to delays that can range from minutes to several days. To expedite your transaction, increase the fee to incentivize miners."
  },
  {
    index: 2,
    question: "How can I speed up my transaction?",
    answer:
      "If your transaction supports replace-by-fee (RBF), resend it with a higher fee using your wallet. If RBF isn't enabled, wait or increase the gas price in your wallet or exchange settings. Not all platforms allow fee adjustments, so check with your provider."
  },
  {
    index: 3,
    question: `Why does ${SITE_DATA.name} show my Bitcoins as 'unspent'?`,
    answer:
      "'Unspent' coins in Bitcoin-like networks indicate funds received but not yet sent from an address. You can transfer these coins if you possess the related private key. Remember, a transaction often involves multiple receivers, and you can only spend coins from addresses with corresponding private keys."
  },
  {
    index: 4,
    question: "Can I reverse a wrongly sent cryptocurrency transaction?",
    answer: `Blockchain transactions are irreversible once confirmed in a block. Contact your wallet or exchange for potential solutions. ${SITE_DATA.name} cannot process transactions or reverse them in public blockchains.`
  },
  {
    index: 5,
    question: `Why does ${SITE_DATA.name} display my money, and how does it have access to my funds?`,
    answer: `${SITE_DATA.name} offers insights into public blockchain data, allowing users to check balances and transaction history. However, your money isn't stored on ${SITE_DATA.name}; it merely provides access to publicly available blockchain information.`
  },
  {
    index: 6,
    question:
      "Can I retrieve funds sent to the wrong Bitcoin Cash/Bitcoin SV address?",
    answer:
      "Recovering funds sent to a wrong address depends on the recipient. If it's you, export and import your private keys between wallets. If it's an exchange or someone else, contact the relevant support for assistance."
  },
  {
    index: 7,
    question:
      "Can I retrieve Ethereum sent to an ERC-20 address (or vice versa)?",
    answer: `Contact the exchange if you mistakenly deposited Ethereum into an ERC-20 address. If you control both addresses, consult your wallet for retrieval instructions. ${SITE_DATA.name} cannot assist in this process.`
  },
  {
    index: 8,
    question:
      "Can I retrieve Ethereum or ERC20 tokens sent to a Binance Smart Chain address (or vice versa)?",
    answer:
      "If you own the private key for the BSC address, import it into an Ethereum wallet to move the funds. Not all platforms support this retrieval; consult your wallet or exchange for guidance."
  },
  {
    index: 9,
    question: "What does 'Bitcoin halving' mean?",
    answer: `Bitcoin halving occurs every four years, reducing the block reward for miners by half. This process limits inflation and maintains the cryptocurrency's scarcity. For detailed information, explore our halving countdown dashboard on ${SITE_DATA.name}.`
  }
];
