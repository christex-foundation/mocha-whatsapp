//@ts-check

const exchangeRates = {
  base: 'USD',
  rates: {
    SLL: 23.5,
  },
};

/**
 * @description This function is used to calculate transaction details
 */
exports.handler = async function (context, event, callback) {
  const localAmount = getLocalAmount(event.amount);
  const transferNetwork = getTransferNetwork(event.address);

  callback(null, {
    transferNetwork,
    recipient: event.address,
    localAmount,
    localCurrency: 'SLL',
    currency: transferNetwork == 'Tron' ? 'USDT' : event.currency,
  });
};

/**
 * @description This function is used to get the local amount
 */
function getLocalAmount(amount) {
  return amount * exchangeRates.rates['SLL'];
}

/**
 * @description This function is used to get the transfer network
 */
function getTransferNetwork(address) {
  const isSolanaAddress = /\.sol$/.test(address) || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  const isTronAddress = /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(address);

  if (isTronAddress) {
    return 'Tron';
  }

  if (isSolanaAddress) {
    return 'Solana';
  }

  return '';
}
