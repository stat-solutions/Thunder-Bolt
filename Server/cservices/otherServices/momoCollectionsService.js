const collections=require('../../connectors/momoCollectionsConnector');
// Request to pay
collections .requestToPay({
    amount: "5000",
    currency: "EUR",
    externalId: "123456",
    payer: {
      partyIdType: "MSISDN",
      partyId: "256776867911"
    },
    payerMessage: "testing",
    payeeNote: "hello"
  })
  .then(transactionId => {
    console.log({ transactionId });
 
    // Get transaction status
    return collections.getTransaction(transactionId);
  })
  .then(transaction => {
    console.log({ transaction });
 
    // Get account balance
    return collections.getBalance();
  })
  .then(accountBalance => console.log({ accountBalance }))
  .catch(error => {
    console.log(error);
  });