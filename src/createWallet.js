//testnet

/*
// Importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definir a rede (Testnet)
const network = bitcoin.networks.testnet

// Derivação de carteiras HD para P2WPKH-P2SH na Testnet
const path = `m/49'/1'/0'/0` 

// Criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// Criando uma conta - par de chaves privada e pública
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Gerando o endereço BTC compatível (P2WPKH-P2SH)
let btcAddress = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
        pubkey: node.publicKey,
        network: network
    }),
    network: network
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)



//mainnet

// Importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// Definir a rede (Mainnet)
const network = bitcoin.networks.bitcoin

// Derivação de carteiras HD para P2WPKH-P2SH na Mainnet
const path = `m/49'/0'/0'/0` 

// Criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// Criando uma conta - par de chaves privada e pública
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// Gerando o endereço BTC compatível (P2WPKH-P2SH)
let btcAddress = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
        pubkey: node.publicKey,
        network: network
    }),
    network: network
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed:", mnemonic)
*/

// Importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
const readline = require('readline')


// Configuração para ler a entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Função para gerar a carteira
function generateWallet(network, path) {
    // Criando o mnemonic para a seed (palavras de senha)
    let mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic)

    // Criando a raiz da carteira HD
    let root = bip32.fromSeed(seed, network)

    // Criando uma conta - par de chaves privada e pública
    let account = root.derivePath(path)
    let node = account.derive(0).derive(0)

    // Gerando o endereço BTC compatível (P2WPKH-P2SH)
    let btcAddress = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
            pubkey: node.publicKey,
            network: network
        }),
        network: network
    }).address

    
    console.log("Endereço: ", btcAddress)
    console.log("Chave privada:", node.toWIF())
    console.log("Seed:", mnemonic)
}

// Pergunta ao usuário se quer usar testnet ou mainnet
rl.question("Você quer gerar uma carteira para a testnet ou mainnet? (Digite 'testnet' ou 'mainnet'): ", function(answer) {
    let network, path

    if (answer.toLowerCase() === 'testnet') {
        console.log()
        console.log("Carteira teste gerada")
        network = bitcoin.networks.testnet
        path = `m/49'/1'/0'/0` // Caminho de derivação para testnet
    } else if (answer.toLowerCase() === 'mainnet') {
        console.log()
        console.log("Carteira gerada")
        network = bitcoin.networks.bitcoin
        path = `m/49'/0'/0'/0` // Caminho de derivação para mainnet
    } else {
        console.log("Entrada inválida. Por favor, digite 'testnet' ou 'mainnet'.")
        rl.close()
        return
    }

    // Gerar a carteira com base na rede escolhida
    generateWallet(network, path)
    rl.close()
})
