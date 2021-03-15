const { default: Wallet } = require('ethereumjs-wallet')

const userWallet = Wallet.generate()

console.log(userWallet)
console.log('Public address:', userWallet.getAddressString())
console.log('Private key:', userWallet.getPrivateKeyString())
