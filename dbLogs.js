var mongoose = require('mongoose');
var config = require('config');
mongoose.Promise = require('bluebird');
mongoose.connect(config.get('db.url'), { promiseLibrary: require('bluebird') })
        .then(() => console.log('connection succesful'))
        .catch((err) => console.error(err));

var loanSchema = new mongoose.Schema({
  date: Date,
  token: String,
  amount: Number,
  interestRate: Number,
  loanTerm: Number,
  underwriter: String,
  underwriterFee: Number,
  relayer: String,
  relayerFee: Number,
  loanProtocol: String
});
var Loan = mongoose.model('Loan', loanSchema);
var loans = [];
for(var i = 0; i<=50; i++){
    var loan = new Loan({
        date: Math.round(Date.now() / 1000) + i,
        token: 'EOS',
        amount: Math.round(Math.random() * 1000),
        interestRate: Math.random(),
        loanTerm: Math.round(Math.random() * 100),
        underwriter: '0x628476231e3a1b1277d7e07c84a6e997ba23a3a7',
        underwriterFee: Math.round(Math.random() * 10),
        relayer: '0xe3818504c1b32bf1557b16c238b2e01fd3149c17',
        relayerFee: Math.round(Math.random() * 10),
        loanProtocol: 'Dharma'
    });
    loans.push(loan);
}

async function runDBCreation(){
    await Loan.create(loans);
}

runDBCreation();