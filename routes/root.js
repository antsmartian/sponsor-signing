'use strict'
const { Transaction, secp256k1 } = require('thor-devkit')

//0x7e439178013d36b2eac264eba014ec1be58625a49a0a4555df41c35c912b8d56
const PRIVATE_KEY = Buffer.from(process.env.PRIVATE_KEY.slice(2), 'hex')

module.exports = async function (fastify) {
  fastify.post('/', signTransaction)
}

async function signTransaction (request, reply) {
  const { raw, origin } = request.body
  console.log("the request body.....")
  if (!raw || !origin) {
    return reply.code(400).send(new Error('required parameters missing: raw, origin'))
  }

  // Re-construct the transaction from the request.
  const transaction = Transaction.decode(raw, true)

  // Compute the sponsor hash.
  const sponsorHash = transaction.signingHash(origin)

  // Compute the sponsor signature with hash+private key.
  const signature = secp256k1.sign(sponsorHash, PRIVATE_KEY)
  const hexSignature = `0x${signature.toString('hex')}`

  console.log("returning ", hexSignature)
  return { signature: hexSignature }
}
