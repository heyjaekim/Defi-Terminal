import React from 'react';
import { Row } from 'reactstrap';
import Web3 from "web3";
import '../components/css/ConnectedPage.css';
import '../components/css/StakePage.css'

import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiArrowDown } from 'react-icons/fi'
import BigNumber from "bignumber.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner'
import GasSlider from "../components/GasSlider.js";
import AddPool from '../components/AddPool.js';
import TopPool from '../components/TopPool.js';


class StakePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SmartContract: null,
            SmartContractAddr: "0xd753d9ed60b7105C808A135dc487eE0ADD4Aaff1", //[MainNet] 
            SmartContractABI: [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt_lp_balance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amt_eth", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lp_usd_unit", "type": "uint256" }], "name": "StakeEvent", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "CheckTokensFromPair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "DAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_fee", "type": "uint256" }], "name": "SetFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_unit", "type": "uint256" }], "name": "SetPercentageUnit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_target", "type": "address" }], "name": "SetStorageContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_fee", "type": "uint256" }], "name": "SetUniswapFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair_list", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt_list", "type": "uint256[]" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "StakeLPList", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDC", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDT", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deadline", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSlippage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "percentage_unit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "storage_", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswap_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }],
            uniswap_pair_abi: [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            erc20_abi: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }],
            sushi_pair_abi: [{ "inputs": [{ "internalType": "contract SushiToken", "name": "_sushi", "type": "address" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "uint256", "name": "_sushiPerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_bonusEndBlock", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bonusEndBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_devaddr", "type": "address" }], "name": "dev", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devaddr", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" }], "name": "getMultiplier", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "migrate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "migrator", "outputs": [{ "internalType": "contract IMigratorChef", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingSushi", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accSushiPerShare", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IMigratorChef", "name": "_migrator", "type": "address" }], "name": "setMigrator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushi", "outputs": [{ "internalType": "contract SushiToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sushiPerBlock", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
            gasCost: (this.props.averageGasPrice * 1290694 * this.props.USD / Math.pow(10, 9)),
            gwei: parseFloat(this.props.averageGasPrice) * 1290694,

            t_id: 0,
            tokenData: [],
            totalTradeSize: 0,
            isConfirmed: false,
            isProcessing: false,
            date: '',
            web3: new Web3(window.ethereum),
            onStake: false,
            isStaking: false,
            isSwapping: false,
            isLending: false,
            topPoolData: [
                {
                    p_id: 0,
                    pair_addr: '0xB10cf58E08b94480fCb81d341A63295eBb2062C2',
                    pair_token0_name: 'ETH',
                    pair_token1_name: 'USDT',
                    pair_token0_img: 'images/eth_icon.png',
                    pair_token1_img: 'images/dollar_icon.png',
                },
                {
                    p_id: 1,
                    pair_addr: '0xd4d9A707C2943f59525a9de00D2967A99f8B5f0a',
                    pair_token0_name: 'ETH',
                    pair_token1_name: 'USDT',
                    pair_token0_img: 'images/dollar_icon.png',
                    pair_token1_img: './images/eth_icon.png',
                },
                {
                    p_id: 1,
                    pair_addr: '0xd4d9A707C2943f59525a9de00D2967A99f8B5f0a',
                    pair_token0_name: 'ETH',
                    pair_token1_name: 'USDT',
                    pair_token0_img: 'images/dollar_icon.png',
                    pair_token1_img: 'images/eth_icon.png',
                }
            ],
        };
        this.WalletAddress = props.WalletAddress;
        this.SetTokenData = props.SetTokenData;
        this.isConfirmRef = React.createRef();
        this.handleConfirmMessageBox = this.handleConfirmMessageBox.bind(this);
        this.isProcessingRef = React.createRef();
        this.handleProcessingMessageBox = this.handleProcessingMessageBox.bind(this);
    };

    static defaultProps = {
        EtherBalance: 3000,
        WalletAddress: "Default Example Address",
    };

    componentDidMount() {
        this.BN = this.state.web3.utils.BN;
        let smartcontract = new this.state.web3.eth.Contract(this.state.SmartContractABI, this.state.SmartContractAddr);

        /* today's date */
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        var today = new Date();


        this.setState({
            SmartContract: smartcontract,
            date: monthNames[today.getMonth()] + ' ' + today.getDate() + '-' + today.getFullYear(),
        });

    }


    /* PercentForm으로 전달되는 token data의 상태들 입니다. */
    /* Unipair address row 에서 업데이트 한 후 invest를 누를 시에 this.SetTokenData를 통해 App.js에 있는 this.state.tokenData로 데이터 값이 업데이트 됩니다. */
    addNewTokenData = async () => {

        const state = {
            default_t_id: 'default_' + this.state.t_id.toString(),
            address_t_id: 'address_' + this.state.t_id.toString(),
            uniswap_pair_abi: this.state.uniswap_pair_abi,
            erc20_abi: this.state.erc20_abi,
            pair_abi_list: { "uniswap": this.state.uniswap_pair_abi, "sushiswap": this.state.sushi_pair_abi },
            pair_abi: this.state.uniswap_pair_abi,
            pairLeft: 'ETH',
            pairRight: 'USD',
            dateStaked: this.state.date,
            profitSince: [true, .20], // [false || true , profit Percent] 값이 stake한 시점부터 지속적으로 모니터링 되어서 업데이트 되어야 함.
            pair_cont: '',
            pair_addr: '',
            pair_token0: '',
            pair_token1: '',
            pair_token0_name: '',
            pair_token1_name: '',
            pair_token0_img: '',
            pair_token1_img: '',
            // token price 및 profit 측정하는데 필요한 요소들
            tokenName: 'token_' + this.state.t_id.toString(),
            tokenSize: 0,
            currentTokenValue: 0, /* 실시간 currentTokenValue가 업데이트 되어야함 */
            currentUsdValue: 0,
            lpAmtEth: 0, /* to change lp amount (variable placed in TokenAddr.js) */
            lpAmtUsd: 0,
            // percent slider 만들때 필요한 요소들
            percentToken: 0,
            EtherBalance: this.props.EtherBalance
        }
        if (this.state.tokenData.length === 0) {
            document.getElementById("add_pool_display").style.display = "block";
        }
        const { tokenData } = this.state;
        this.setState({
            tokenData: tokenData.concat({ t_id: this.state.t_id++, ...state })
        })
    }

    /* OnClick Cancel to reset every states */
    cancelToResetStates = () => {
        this.setState((state) => {
            return {
                tokenData: [],
                gasCost: 0
            }
        })
    };

    submitTrades = async (isStake) => {
        if (this.props.IsConnectedMetaMask) {
            if (this.props.IsStake) {
                console.log('TTTTTTTTTTTTTT', this.state.tokenData)
                this.SetTokenData(this.state.tokenData,
                    this.state.totalTradeSize + (this.state.gwei / Math.pow(10, 9)),
                    (this.state.totalTradeSize * this.props.USD) + this.state.gasCost
                );
                this.Invest();

            } else {
                console.log('withdraw')
                //this.Withdraw();
            }
        } else {
            alert("Connected 'MetaMask' first.");
        }
    };

    Invest = async () => {
        let pair_list = [];
        let wei_list = [];
        let wei_amount = BigNumber(0);
        for (let i = 0; i < this.state.tokenData.length; i++) {
            console.log("Invest : ", i, this.state.tokenData[i].tokenSize, this.state.tokenData[i].pair_addr)
            if (this.state.tokenData[i].tokenSize !== 0) {
                let wei = BigNumber(this.state.tokenData[i].tokenSize * Math.pow(10, 18)).integerValue();
                pair_list.push(this.state.tokenData[i].pair_addr);
                wei_list.push(wei.toString());
                wei_amount = wei.plus(wei_amount);
            }

        }

        let gasPrice = BigNumber(Number(this.state.gwei) * Math.pow(10, 9) / 1290694).integerValue();
        console.log("TTEETE", gasPrice.dividedBy(Math.pow(10, 9)).toString())
        //const nonce = await this.web3.eth.getTransactionCount(this.state.SmartContractAddr);
        const nonce = await this.web3.eth.getTransactionCount(this.props.WalletAddress);
        console.log("Invest ", pair_list, wei_list, wei_amount);


        //Gas Estimate
        let gasEstimate = 0;
        await this.state.SmartContract.methods.StakeLPList(pair_list, wei_list, 250, Date.now() + 2000)
            .estimateGas({
                from: this.props.WalletAddress,
                value: wei_amount.integerValue()
            })
            .then(function (gasAmount) {
                console.log(gasAmount)
                gasEstimate = gasAmount;
            })
            .catch(function (error) {
                console.log(error)
            });;

        console.log("Invest ", pair_list, wei_list, wei_amount, gasEstimate, gasPrice, nonce);

        let results = await this.state.SmartContract.methods.StakeLPList(pair_list, wei_list, 250, Date.now() + 2000)
            .send({
                from: this.props.WalletAddress,
                value: wei_amount, //송금할 Ether [Wei]
                gas: Math.floor(gasEstimate * 1.2), //gas 량
                gasPrice: gasPrice.toString(),
                nonce: nonce//재접속한 횟수
            });

        if (results['status']) {
            alert("Success Invest Transaction");
        }
        else {
            alert("Fail Invest Transaction");
        }

        return;
    };


    /* Handle Gas Speed
    gas 가격 기준을 불러와서 이 함수에 적용 */
    SetGasSpeed = async (value) => {
        console.log("Ttt", value, value / 100 * (this.props.fastestGasPrice - this.props.averageGasPrice))
        this.setState({
            gwei: ((value / 100 * (parseFloat(this.props.fastestGasPrice) - parseFloat(this.props.averageGasPrice)) + parseFloat(this.props.averageGasPrice)) * 1290694),
            gasCost: (this.props.averageGasPrice * 1290694 * this.props.USD / Math.pow(10, 9)) +
                (value / 100 * (parseFloat(this.props.fastestGasPrice) - parseFloat(this.props.averageGasPrice)) * 1290694 * this.props.USD / Math.pow(10, 9)),
        });
    }

    removeTokenData = async () => {
        this.state.tokenData.pop();
        this.forceUpdate();
        let total = 0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        this.setState({ totalTradeSize: total });
        this.setState({ totalTradeSize: total });
        if (this.state.tokenData.length === 0) {
            document.getElementById("add_pool_display").style.display = "none";
        }
    }

    updateTradeTotalSize = async () => {
        let total = 0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        if (total + this.state.gwei > (this.props.EtherBalance)) {
            // 에러 처리 
            this.setState({ totalTradeSize: total });
        } else {
            this.setState({ totalTradeSize: total });
        }
    }

    handleConfirmMessageBox() {
        if (this.props.EtherBalance * this.props.USD < (this.state.totalTradeSize * this.props.USD) + this.state.gasCost) {
            alert("You can't exceed the amount of avaiable balance in USD to stake your total ETH size. Please make sure to set the less total estimated transaction amount than the current balance in USD.")
        } else {
            this.setState({ isConfirmed: !this.state.isConfirmed });
            this.isConfirmRef.current.focus();
        }
    }

    handleProcessingMessageBox() {
        if (this.state.isProcessing) {
            this.setState({
                isProcessing: !this.state.isProcessing,
                isConfirmed: false
            });
        } else {
            this.setState({
                isProcessing: !this.state.isProcessing,
                isConfirmed: false
            });
            this.isConfirmRef.current.focus();
            this.isProcessingRef.current.focus();
        }
    }

    handleDoneStaking() {
        this.setState({
            isProcessing: !this.state.isProcessing
        });
        this.isProcessingRef.current.focus();
        console.log(this.state.isProcessing);
    }

    onClickTradingOption = (e) => {
        switch (e.target.id) {
            case "staking_btn":
                this.setState({
                    onStake: true,
                    isStaking: true,
                    isSwapping: false,
                    isLending: false,
                });
                document.getElementById("staking_page").style.display = "block"
                document.getElementById("swapping_page").style.display = "none"
                document.getElementById("lending_page").style.display = "none"
                console.log("onClickTradingOption staking page display")
                break;
            case "swapping_btn":
                this.setState({
                    onStake: false,
                    isStaking: false,
                    isSwapping: true,
                    isLending: false, 
                });
                document.getElementById("staking_page").style.display = "none"
                document.getElementById("swapping_page").style.display = "block"
                document.getElementById("lending_page").style.display = "none"
                console.log("onClickTradingOption swapping page display")
                break;
            case "lending_btn":
                this.setState({
                    onStake: false,
                    isStaking: false,
                    isSwapping: false,
                    isLending: true, 
                });
                document.getElementById("staking_page").style.display = "none"
                document.getElementById("swapping_page").style.display = "none"
                document.getElementById("lending_page").style.display = "block"
                console.log("onClickTradingOption lending page display")
                break;
            default:
                console.log("onClickTradingOption default")
        }
    }

    renderGasCostTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            The gas cost depends on the speed of transaction.<br />
            Faster transaction speeds result in higher costs
        </Tooltip>
    );

    render() {
        const mapToTokenStaking = (data) => {
            return data.map((token, i) => {
                return (<AddPool token={token} onStake={this.state.onStake} totalTradeSize={this.state.totalTradeSize} EtherBalance={this.props.EtherBalance} updateTradeTotalSize={this.updateTradeTotalSize} key={i} />);
            })
        }

        const mapToTopPoolData = (data) => {
            try {
                return data.map((pool, i) => {
                    return (<TopPool pool={pool} key={i} web3={this.state.web3} uniswap_pair_abi={this.state.uniswap_pair_abi} erc20_abi={this.state.erc20_abi} />)
                })
            } catch (event) {
                console.log("CANT MAPPING THE TOP POOL DATA");
            }
        }

        return (
            <React.Fragment>
                <div className="stakehome">
                    <section className="home-attr" id="home">
                        <header className="welcome_message">
                            <p>What would you like to do?</p>
                        </header>
                        <nav className="trading_option">
                            <button className={`staking-btn ${this.state.isStaking ? "active" : "inactive"}`} id="staking_btn" onClick={(e) => { this.cancelToResetStates(); this.onClickTradingOption(e) }}>Staking</button>
                            <button className={`swapping-btn ${this.state.isSwapping ? "active" : "inactive"}`} id="swapping_btn" onClick={(e) => { this.cancelToResetStates(); this.onClickTradingOption(e) }}>Swapping</button>
                            <button className={`lending-btn ${this.state.isLending ? "active" : "inactive"}`} id="lending_btn" onClick={(e) => { this.cancelToResetStates(); this.onClickTradingOption(e) }}>Lending</button>
                        </nav>
                        <div id="staking_page">
                            <Row>
                                <header className="stake_instruct">
                                    <p>Stake up to 5 pairs at a time</p>
                                </header>
                                <section className="stake_box">
                                    <div className="content">
                                        <div className="balance"> Available Balance </div>
                                        <div className="ethereum_usd">
                                            <span style={{ fontSize: '32px' }}>{this.props.EtherBalance}</span>
                                            <span className="eth"> ETH</span>
                                            <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', top: 67, left: 365 }}>$ {(this.props.EtherBalance * this.props.USD).toFixed(3)}</span>
                                        </div>
                                        <div className="size" id="add_pool_display" style={{ display: 'none' }}>
                                            <span>Size</span>
                                            <span style={{ fontWeight: 'lighter' }}> (ETH)</span>
                                            <span style={{ marginLeft: 170 }}>Percent</span>
                                        </div>
                                    </div>

                                </section>
                            </Row>
                            <Row>
                                <div className="trading_rows">
                                    <div className="context1">Liquidity Pools</div>
                                    <div className="context2">Address</div>
                                </div>
                            </Row>
                            <Row>
                                <div className="eth_usdt_row">
                                    {this.state.onStake ? mapToTokenStaking(this.state.tokenData) : ""}

                                    <div className="adding_box">
                                        <button className="plusMinus_plus" onClick={this.addNewTokenData}> &nbsp;<AiFillPlusCircle color='#fafafa' size="30px" />&nbsp; &nbsp;Add Pool </button>
                                        <button className="plusMinus_minus" onClick={this.removeTokenData}><AiFillMinusCircle color='#fafafa' size="30px" /> &nbsp;Remove Pool</button>
                                    </div>
                                    <div className="investment">
                                        <div style={{ color: '#51A0BF' }}>
                                            Investment Amount
                                        </div>
                                        <div className="invest_usd">
                                            <span style={{ color: '#fafafa', fontSize: '28px' }}>{Number(this.state.totalTradeSize).toFixed(9)}</span>
                                            <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 751 }}>$ {(this.state.totalTradeSize * this.props.USD).toFixed(3)}</span>
                                        </div>
                                        <div style={{ color: '#51A0BF', paddingTop: '8px' }}>
                                            Estimated gas cost
                                        </div>
                                        <div className="gascost_usd">
                                            <span style={{ color: '#fafafa', fontSize: '28px' }}>
                                                {Number(this.state.gwei).toFixed(0)}
                                                <span style={{ fontSize: "18px" }}> gwei</span>
                                            </span>
                                            <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 751 }}>
                                                $ {this.state.gasCost.toFixed(3)}</span>
                                        </div>
                                        <div style={{ color: '#51A0BF', paddingTop: '8px' }}>
                                            Total Estimated Transaction Amount
                                        </div>
                                        <div className="transc_usd">
                                            <span style={{ color: '#fafafa', fontSize: '28px' }}>{Number(this.state.totalTradeSize + this.state.gwei / Math.pow(10, 9)).toFixed(6)}</span>
                                            <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 751 }}>$ {((this.state.totalTradeSize + this.state.gwei / Math.pow(10, 9)) * this.props.USD).toFixed(3)}</span>
                                        </div>

                                        <div id="detail_select_area2" style={{ display: 'flex' }}>
                                            <div className="cancel_submit">
                                                <button className="stake_button" onClick={this.cancelToResetStates}>
                                                    <h5 className="button-context">
                                                        Reset
                                                    </h5>
                                                </button>
                                                <button className="stake_button" onClick={this.handleConfirmMessageBox}>
                                                    <h5 className="button-context">
                                                        Submit
                                                    </h5>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <section className="gas_speed">
                                    <span className="gas_speed_content"> Speed vs. gas cost (ETH / USD) </span><span className="qmark">
                                        <AiOutlineQuestionCircle size="25px" color="#073d67" />
                                    </span>
                                    <GasSlider SetGasSpeed={this.SetGasSpeed} />
                                    <div>
                                        $ {this.state.gasCost.toFixed(3)} / $ {(this.props.fastestGasPrice * 1290694 * this.props.USD / Math.pow(10, 9)).toFixed(3)}
                                    </div>
                                </section>
                            </Row>

                            <Row>
                                <section className={`stake_confirm_message ${this.state.isConfirmed ? "active" : "inactive"}`} ref={this.isConfirmRef}>
                                    <div className="inner_message">
                                        You are staking <p>{this.state.totalTradeSize} ETH</p> in <img src="images/eth_dollar.png" alt="eth-dollar" width="55px"></img>
                                        <p> ETH - USDT</p>
                                        <br /><br />
                                        from: <p>{this.WalletAddress}</p>
                                        <br /><br />
                                        The estimated transaction amount including
                                        <br /><br />
                                        gas cost is: <p>{(this.state.gasCost * Math.pow(10, 9) / this.props.USD).toFixed(1)}
                                            <span style={{ fontSize: "18px" }}> gwei</span>
                                        </p> or
                                                <p> $ {this.state.gasCost} </p>
                                    </div>
                                    <div className="stake_confirm_buttons">
                                        <button className="flex-item" onClick={this.handleConfirmMessageBox}>Cancel</button>
                                        <button className="flex-item" onClick={() => {
                                            this.handleProcessingMessageBox(); this.submitTrades();
                                            setTimeout(function () {
                                                this.setState({ isProcessing: !this.state.isProcessing })
                                            }.bind(this), 3000);
                                        }}>Confirm</button>
                                    </div>
                                </section>
                            </Row>
                            <Row>
                                <section className={`stake_processing_message ${this.state.isProcessing ? "active" : "inactive"}`} ref={this.isProcessingRef}>
                                    <div className="inner_message">
                                        Thank you! Your transaction is currently being processed.<br></br>
                                        It can take about 15 seconds.<br></br><br></br><br></br>
                                        <Spinner animation="border" variant="light" />
                                    </div>
                                    <div className="stake_processing_button">
                                        <button className="flex-item" onClick={this.handleProcessingMessageBox}>Cancel</button>
                                    </div>
                                </section>
                            </Row>
                        </div>
                        <div id="swapping_page">
                            <Row>
                                <header className="stake_instruct">
                                    <p>Swap your coin as fast as you can</p>
                                </header>
                                <section className="stake_box">
                                    <div className="content">
                                        <div className="balance"> Available Balance </div>
                                        <div className="ethereum_usd">
                                            <span style={{ fontSize: '32px' }}>{this.props.EtherBalance}</span>
                                            <span className="eth"> ETH</span>
                                            <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', top: 67, left: 365 }}>$ {(this.props.EtherBalance * this.props.USD).toFixed(3)}</span>
                                        </div>
                                        <div className="size" id="add_pool_display" style={{ display: 'none' }}>
                                            <span>Size</span>
                                            <span style={{ fontWeight: 'lighter' }}> (ETH)</span>
                                            <span style={{ marginLeft: 170 }}>Percent</span>
                                        </div>
                                    </div>

                                </section>
                            </Row>
                            <Row>
                                <div className="eth_usdt_row">

                                    {mapToTokenStaking(this.state.tokenData)}

                                    <div className="from_block">
                                        <h3 className="from_context"> FROM </h3>
                                        <input className="from_input" />
                                        <button className="select_coin">Select The Coin</button>
                                    </div>
                                    <div className="arrow-down"><FiArrowDown size="30px" cursor="pointer"></FiArrowDown></div>
                                    <div className="to_block">
                                        <h3 className="to_context"> To </h3>
                                        <input className="to_input" />
                                        <button className="select_coin">Select The Coin</button>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <section className="gas_speed">
                                    <span className="gas_speed_content"> Speed vs. gas cost (ETH / USD) </span><span className="qmark">
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 100, hide: 100 }}
                                            overlay={this.renderGasCostTooltip}
                                        >
                                            <AiOutlineQuestionCircle size="25px" color="#073d67" />
                                        </OverlayTrigger>

                                    </span>
                                    <GasSlider SetGasSpeed={this.SetGasSpeed} />
                                    <div>
                                        $ {this.state.gasCost.toFixed(3)} / $ {(this.props.fastestGasPrice * 1290694 * this.props.USD / Math.pow(10, 9)).toFixed(3)}
                                    </div>
                                </section>
                            </Row>

                            <Row>
                                <section className={`stake_confirm_message ${this.state.isConfirmed ? "active" : "inactive"}`} ref={this.isConfirmRef}>
                                    <div className="inner_message">
                                        You are staking <p>{this.state.totalTradeSize} ETH</p> in <img src="images/eth_dollar.png" alt="eth-dollar" width="55px"></img>
                                        <p> ETH - USDT</p>
                                        <br /><br />
                                        from: <p>{this.WalletAddress}</p>
                                        <br /><br />
                                        The estimated transaction amount including
                                        <br /><br />
                                        gas cost is: <p>{(this.state.gasCost * Math.pow(10, 9) / this.props.USD).toFixed(1)}
                                            <span style={{ fontSize: "18px" }}> gwei</span>
                                        </p> or
                                                <p> $ {this.state.gasCost} </p>
                                    </div>
                                    <div className="stake_confirm_buttons">
                                        <button className="flex-item" onClick={this.handleConfirmMessageBox}>Cancel</button>
                                        <button className="flex-item" onClick={() => {
                                            this.handleProcessingMessageBox(); this.submitTrades();
                                            setTimeout(function () {
                                                this.setState({ isProcessing: !this.state.isProcessing })
                                            }.bind(this), 3000);
                                        }}>Confirm</button>
                                    </div>
                                </section>
                            </Row>
                            <Row>
                                <section className={`stake_processing_message ${this.state.isProcessing ? "active" : "inactive"}`} ref={this.isProcessingRef}>
                                    <div className="inner_message">
                                        Thank you! Your transaction is currently being processed.<br></br>
                                        It can take about 15 seconds.<br></br><br></br><br></br>
                                        <Spinner animation="border" variant="light" />
                                    </div>
                                    <div className="stake_processing_button">
                                        <button className="flex-item" onClick={this.handleProcessingMessageBox}>Cancel</button>
                                    </div>
                                </section>
                            </Row>
                        </div>
                        <div id="lending_page">

                        </div>
                    </section>
                    {/* select the coin part to implement */}
                    {/* <section className="select_coin_window">
                        <div className="inner_message">
                            You are staking <p>{this.state.totalTradeSize} ETH</p> in <img src="images/eth_dollar.png" alt="eth-dollar" width="55px"></img>
                            <p> ETH - USDT</p>
                            <br /><br />
                                        from: <p>{this.WalletAddress}</p>
                            <br /><br />
                                        The estimated transaction amount including
                                        <br /><br />
                                        gas cost is: <p>{(this.state.gasCost * Math.pow(10, 9) / this.props.USD).toFixed(1)}
                                <span style={{ fontSize: "18px" }}> gwei</span>
                            </p> or
                                                <p> $ {this.state.gasCost} </p>
                        </div>
                        <div className="stake_confirm_buttons">
                            <button className="flex-item" onClick={this.handleConfirmMessageBox}>Cancel</button>
                            <button className="flex-item" onClick={() => {
                                this.handleProcessingMessageBox(); this.submitTrades();
                                setTimeout(function () {
                                    this.setState({ isProcessing: !this.state.isProcessing })
                                }.bind(this), 3000);
                            }}>Confirm</button>
                        </div>
                    </section> */}
                </div>
                <div className="recommend_page">
                    <section className="recommend_below">
                        <div style={{ fontSize: '24px', color: '#fafafa', paddingBottom: '32px' }}>
                            Top Performing Liquidity pools as of {this.state.date}
                        </div>

                        {mapToTopPoolData(this.props.topPoolData)}

                    </section>
                </div>

            </React.Fragment>
        );
    }
}

export default StakePage;