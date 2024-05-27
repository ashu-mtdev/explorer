const axios = require("axios");
const { findUser } = require("./user.details.controller");
const { findEthTx } = require("./admin.transaction.ethereum.controller");
// const { find: } = require("./")
const CustomResponse = require("../middleware/Responses");
const bitcoinAddressValidation = require("bitcoin-address-validation");
const ethereum_address = require("ethereum-address");
const { validateReqField } = require("../middleware/Validations");
require("dotenv").config();
const { ETHERSCAN_APIKEY, INFURA_ETH_PROVIDER } = process.env;
const { Web3 } = require("web3");
const { findBtcTx } = require("./admin.transaction.bitcoin.controller");
const web3 = new Web3(INFURA_ETH_PROVIDER);

const fetchTransactions = async (req, res) => {
  const { searchItem, pageNumber } = req.query;
  const reqField = { searchItem, pageNumber };
  if (!validateReqField(reqField, res)) return null;

  const { network, address, hash, findBy } = await identifySearchValueType(
    searchItem
  );
  try {
    let txData = {};
    if (hash == null && network == "Bitcoin") {
      txData = await axios.request(
        `https://mempool.space/api/address/${address}/txs`
      );
      txData.data = await replaceBitcoinAddressesWithNames(txData.data);
      for (let index = 0; index < txData.data.length; index++) {
        const data = await findBtcTx({ txid: txData.data[index].txid });
        if (data.length) {
          txData.data[index] = data;
        }
      }
    } else if (hash == null && network == "Ethereum") {
      txData = await axios.request(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&page=${pageNumber}&offset=10&sort=desc&apikey=${ETHERSCAN_APIKEY}`
      );
      txData.data.result = await replaceEthereumAddressesWithNames(
        txData.data.result
      );
      for (let index = 0; index < txData.data.result.length; index++) {
        const data = await findEthTx({ hash: txData.data.result[index].hash });
        if (data.length) {
          txData.data.result[index] = data;
        }
      }
    } else if (address == null && network == "Ethereum") {
      const data = await findEthTx({ hash });
      if (data.length) {
        txData.data = data;
      } else {
        txData.data = await web3.eth.getTransaction(hash);
        if (txData.data) {
          let block = await web3.eth.getBlock(txData.data.blockHashs);
          txData.data.timestamp = block.timestamp;
          txData.data.confirmations = block.transactions.length;
          txData.data.baseFeePerGas = block.baseFeePerGas.toString();
        }
        for (const key in txData.data) {
          if (typeof txData.data[key] === "bigint") {
            txData.data[key] = txData.data[key].toString();
          }
        }
        let receipt = await web3.eth.getTransactionReceipt(hash);
        txData.data.status = (receipt?.status).toString();
        txData.data.logs = [];
        let logs = [];
        logs = receipt.logs.map(async (item) => {
          let addressDetails = await getAddressDetails(item.address);
          return {
            logIndex: item.logIndex.toString(),
            address: addressDetails?.name || item.address,
            data: item.data,
            topics: item.topics,
          };
        });
        txData.data.logs = await Promise.all(logs);
        txData.data.gasUsed = receipt.gasUsed.toString();
        txData.data = await replaceEthereumAddressesWithNames([txData.data]);
        internalTxs = await axios.request(
          `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${hash}&apikey=${ETHERSCAN_APIKEY}`
        );
        if (internalTxs.data.result.length) {
          txData.data[0].internalTxs = internalTxs.data.result;
        }
      }
    } else if (address == null && network == "Bitcoin") {
      data = await findBtcTx({ txid: hash });
      if (data.length) {
        txData.data = data;
      } else {
        txData = await axios.request(`https://mempool.space/api/tx/${hash}`);
        txData.data = await replaceBitcoinAddressesWithNames([txData.data]);
      }
    }
    if (txData) {
      CustomResponse.success(res, `Data ${findBy}`, {
        network: network,
        data: txData.data,
      });
    } else {
      CustomResponse.error(res, `Data ${findBy}`, network);
    }
  } catch (error) {
    console.log(error);
    CustomResponse.error(res, `Data cannot be fetched`, error.message);
  }
};

const identifySearchValueType = async (value) => {
  if (bitcoinAddressValidation.validate(value, "mainnet")) {
    return {
      network: "Bitcoin",
      address: value,
      hash: null,
      findBy: "by address",
    };
  } else if (ethereum_address.isAddress(value)) {
    return {
      network: "Ethereum",
      address: value,
      hash: null,
      findBy: "by address",
    };
  } else if (
    (await identifyHashType(value)).network == "Ethereum" ||
    (await identifyHashType(value)).network == "Bitcoin"
  ) {
    return {
      network: (await identifyHashType(value)).network,
      address: null,
      hash: value,
      findBy: "by hash",
    };
  } else {
    const result = await findUser({ name: value });
    if (result == null) {
      return {
        network: "",
        address: null,
        hash: null,
        findBy: "cannot be found for invalid address",
      };
    } else {
      return {
        network: (await identifySearchValueType(result.address)).network,
        address: result.address,
        hash: null,
        findBy: "by name",
      };
    }
  }
};

const identifyHashType = async (value) => {
  if (value.startsWith("0x") && value.length === 66) {
    return { network: "Ethereum" };
  } else if (value.length === 64) {
    return { network: "Bitcoin" };
  } else {
    return { network: "Invalid Hash" };
  }
};

const replaceEthereumAddressesWithNames = async (transactions) => {
  try {
    let addressDetails = {};
    let addressChecked = {};
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      let fromDetails;
      let toDetails;
      if (addressChecked[transaction.from]) {
        fromDetails = await addressDetails[transaction.from];
      } else {
        fromDetails = await getAddressDetails(transaction.from);
        addressDetails[transaction.from] = fromDetails;
        addressChecked[transaction.from] = true;
      }
      if (addressChecked[transaction.to]) {
        toDetails = await addressDetails[transaction.to];
      } else {
        toDetails = await getAddressDetails(transaction.to);
        addressDetails[transaction.to] = toDetails;
        addressChecked[transaction.to] = true;
      }
      transaction.from = fromDetails?.name || transaction.from;
      transaction.from_email = fromDetails?.email;
      transaction.to = toDetails?.name || transaction.to;
      transaction.to_email = toDetails?.email;
    }
    return transactions;
  } catch (error) {
    console.log(error);
    return "Error in searching for a name with address:" + error;
  }
};

const replaceBitcoinAddressesWithNames = async (transactions) => {
  try {
    let addressDetails = {};
    let addressChecked = {};
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];

      //check vin address
      for (let i = 0; i < transaction.vin.length; i++) {
        if (
          !(
            transaction.vin[i].prevout == null &&
            transaction.vin[i].is_coinbase == true
          )
        ) {
          let scriptpubkey_address =
            transaction.vin[i].prevout.scriptpubkey_address;
          let { updatedAddressNames, updatedNamesChecked } =
            await checkBitcoinAddressName(
              addressChecked,
              addressDetails,
              scriptpubkey_address
            );
          addressDetails = updatedAddressNames;
          addressChecked = updatedNamesChecked;
          transaction.vin[i].prevout.scriptpubkey_address =
            updatedAddressNames[scriptpubkey_address]?.name ||
            transaction.vin[i].prevout.scriptpubkey_address;
          transaction.vin[i].prevout.email =
            updatedAddressNames[scriptpubkey_address]?.email;
        }
      }

      //check vout addresses
      for (let j = 0; j < transaction.vout.length; j++) {
        let scriptpubkey_address = transaction.vout[j].scriptpubkey_address;
        let { updatedAddressNames, updatedNamesChecked } =
          await checkBitcoinAddressName(
            addressChecked,
            addressDetails,
            scriptpubkey_address
          );
        addressDetails = updatedAddressNames;
        addressChecked = updatedNamesChecked;

        transaction.vout[j].scriptpubkey_address =
          updatedAddressNames[scriptpubkey_address]?.name ||
          transaction.vout[j].scriptpubkey_address;
        transaction.vout[j].email =
          updatedAddressNames[scriptpubkey_address]?.email;
      }
    }
    return transactions;
  } catch (error) {
    console.log(error);
    return "Error in searching for a name with address:" + error;
  }
};

const checkBitcoinAddressName = async (
  namesChecked,
  addressDetails,
  scriptpubkey_address
) => {
  let address_details;
  if (namesChecked[scriptpubkey_address]) {
    address_details = await addressDetails[scriptpubkey_address];
  } else {
    address_details = await getAddressDetails(scriptpubkey_address);
    addressDetails[scriptpubkey_address] = address_details;
    namesChecked[scriptpubkey_address] = true;
  }
  return {
    // scriptpubkey_name: address_details.name,
    updatedAddressNames: addressDetails,
    updatedNamesChecked: namesChecked,
  };
};

// Function to retrieve the name associated with an address from MongoDB
async function getAddressDetails(address) {
  const filter = {
    $or: [{ address: { $regex: `${address}`, $options: "i" } }],
  };
  // const filter = { address: address ? address.toLowerCase() : address };
  let result = await findUser(filter);
  return result ? { name: result.name, email: result.email } : null;
}

module.exports = {
  fetchTransactions,
};
