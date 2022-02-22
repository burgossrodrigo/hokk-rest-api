const express = require('express')
const bodyParse = require('body-parser')
const uniswap = require('@uniswap/sdk')
const pancake = require('@hokk/bsc-sdk')
const mdex = require('@mdex/heco-sdk')

const json = bodyParse.json
const app = express();
const router = express.Router()

app.use(json());
app.use(router);

app.listen(3000, () => {
    console.log(`server is listening on port: 3000`)
})

const CHAINID_HUOBI = mdex.ChainId.MAINNET
const CHAINID_ETH = 1
const CHAINID_BSC = pancake.ChainId.MAINNET

const HOKK_ADDRESS = "0xe87e15b9c7d989474cb6d8c56b3db4efad5b21e8"
const HOKK_ADDRESS_HECO = "0x4ebf49cc2d2dd029e5cfdf868316385dffd94c6a"

const HOKK = new uniswap.Token(CHAINID_ETH, HOKK_ADDRESS, 18, "HOKK", "Hokkaido Inu")
const HOKK_BSC = new pancake.Token(CHAINID_BSC, HOKK_ADDRESS, 18, "HOKK", "Hokkaido Inu")
const HECO_HOKK = new mdex.Token(CHAINID_HUOBI, HOKK_ADDRESS_HECO, 18, "Hokk", "Hokkaido Inu")

router.get('/eth/hokk', [], async (req, res) => {
    const pair = await uniswap.Fetcher.fetchPairData(HOKK, uniswap.WETH[CHAINID_ETH]);
    const route = new uniswap.Route([pair], uniswap.WETH[CHAINID_ETH]);
    const price = route.midPrice.toFixed(9);
    return res.json(price);
})

router.get('/bsc/hokk', [], async (req, res) => {
    const pair = await pancake.Fetcher.fetchPairData(HOKK_BSC, pancake.WETH[CHAINID_ETH]);
    const route = new pancake.Route([pair], pancake.WETH[CHAINID_ETH]);
    const price = route.midPrice.toFixed(9);
    return res.json(price);
})

router.get('/heco/hokk', [], async (req, res) => {
    const pair = await mdex.Fetcher.fetchPairData(HECO_HOKK, mdex.WETH[CHAINID_ETH]);
    const route = new mdex.Route([pair], mdex.WETH[CHAINID_ETH]);
    const price = route.midPrice.toFixed(9);
    return res.json(price);
})