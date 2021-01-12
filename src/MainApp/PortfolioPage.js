import React from 'react';
import Web3 from "web3";
import BigNumber from "bignumber.js";
import TokenInfo from '../components/TokenInfo.js'
import TokenAddr from '../components/TokenAddr.js'
import { GasSpeedAnimationBox } from '../components/styles.js'
import { Row, Col } from 'reactstrap';
import { PieChart } from 'react-minimal-pie-chart';
import '../components/css/PortfolioPage.css';

class StakePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SmartContract: null,
            SmartContractAddr: "0xe42477108055aA6F904EC8524dCaf85f80D3a3e8", //[MainNet] // "0xe1A712878786A2993C3Ba5a3CABC62423D601F35" EasyDefi[KOVAN]
            SmartContractABI: [{ "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "CheckTokensFromPair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "emergencyETHWithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "emergencyTokenWithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ethamount", "type": "uint256" }, { "internalType": "address", "name": "_token", "type": "address" }], "name": "GetTokenFromEth", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt_lp_usd", "type": "uint256" }], "name": "Log", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_fee", "type": "uint256" }], "name": "SetFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "address", "name": "_target", "type": "address" }, { "internalType": "uint256", "name": "_amt", "type": "uint256" }], "name": "StakeLP", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair_list", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt_list", "type": "uint256[]" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "StakeLPList", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt", "type": "uint256[]" }], "name": "TransferLPList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "addresspayable", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "amtLP", "type": "uint256" }], "name": "WithdrawLP", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt", "type": "uint256[]" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "WithdrawLPList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [], "name": "DAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deadline", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetLPTokenBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetLPUSDBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }], "name": "GetLPWorth", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetResidualBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "LPTokenBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "LPUSDBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSlippage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "percentage_unit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "uniswap_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDC", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDT", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }],
            uniswap_pair_abi: [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            erc20_abi: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }],
            manualTradeSize: 1, /* Stake 상태에서 Manual Trade Size 값을 지정하고 
                                    Allocation Percent 사용하여 (Trade Size * Allocation Percent) => Sub-Size Token을 계산 */
            autoTradeSize: 0, /* 각 Sub Size Token 값들의 합을 Trade Size에 자동 업데이트하는 state variable*/
            speed: "slow",
            stake: true,
            gasSpeed: 0,
            unstakeView: false,
        };
        this.token1 = props.token1; /*                                                                                                       */
        this.token2 = props.token2; /* Allocation Percent 사용시 Sub Token들의 합이 Trade Size 보다 클 경우 자동 재분배 하기 위한 props variable */
        this.token3 = props.token3; /* (미완성 부분)                                                                                          */
        this.token4 = props.token4; /*                                                                                                       */
        this.SetStake = props.SetStake;
        this.ConnectWallet = props.ConnectWallet;
        this.EtherBalance = props.EtherBalance;
        this.TotalInvestment = props.TotalInvestment;
        this.TotalInvestmentUSD = props.TotalInvestmentUSD;
        this.WalletAddress = props.WalletAddress;
        this.UsdBalance = props.USDBalance;
        this.GasSpeed = props.GasSpeed;

        this.SubmitSetTrades = props.SubmitSetTrades; /* Onclick Submit button to proceed Tokens towards designated Addresses */
        this.IsConnectedMetaMask = props.IsConnectedMetaMask;
        this.IsStake = props.Stake;
        this.gasSpeed = props.gasSpeed;

        this.tokenData = props.tokenData;
    };
    // App.js에서 받은 tokenData Props
    /*
    default_t_id: 'default_'+this.state.t_id.toString(),
    address_t_id: 'address_'+this.state.t_id.toString(),
    uniswap_pair_abi: this.state.uniswap_pair_abi,
    erc20_abi: this.state.erc20_abi,
    pairLeft: 'ETH',
    pairRight: 'USD',
    dateStaked: '',
    amountStaked: 0,
    isProfit: false,

    profitSince: '', // Need to check if the address's pair token is currently profit taking since the date staked
    
    pair_cont: null,
    pair_addr: '',
    pair_cont: null,
    pair_token0: null,
    pair_token1: null,
    pair_token0_name: '',
    pair_token1_name: '',
    pair_token0_img: null,
    pair_token1_img: null,

    //token price 및 profit 측정하는데 필요한 요소들
    tokenName: 'token_' + this.state.t_id.toString(),
    tokenSize: 0,
    tokenSizeInUSD: 0,

    // 실시간 currentTokenValue가 업데이트 되어야함
    currentTokenValue: 0, 
    currentUsdValue: 0,

    // to change lp amount (variable placed in TokenAddr.js)
    lpAmtEth: 0,    
    lpAmtUsd: 0,

    //percent box 만들때 필요한 요소들
    percentAniBox: 'percent_animation_box_' + this.state.t_id.toString(),
    selectedPercent: 0,
    percent0: 'percent0_' + this.state.t_id.toString(),
    percent25: 'percent25_' + this.state.t_id.toString(),
    percent50: 'percent50_' + this.state.t_id.toString(),
    percent75: 'percent75_' + this.state.t_id.toString(),
    percent100: 'percent100_' + this.state.t_id.toString()
    */

    static defaultProps = {
        EtherBalance: 3000,
        WalletAddress: "Default Example Address",
        GasSpeed: "slow"
    };

    componentDidMount() {
        // window.ethereum.autoRefreshOnNetworkChange = false
        this.web3 = new Web3(window.ethereum);
        this.BN = this.web3.utils.BN;
        let smartcontract = new this.web3.eth.Contract(this.state.SmartContractABI, this.state.SmartContractAddr);

        this.setState({
            SmartContract: smartcontract,
            /* Tab Animation(stake, gas, percent allocation)을 위한 setState */
            gasSpeedCosts: [
                document.getElementById("slow"),
                document.getElementById("medium"),
                document.getElementById("fast")
            ]
        });
    }

    /* 기존 withdraw 함수에서 this.props.tokenData를 불러와 부분수정 하였습니다. */
    withdraw = async () => {
        console.log("works");

        const tokenData = this.props.tokenData;

        let response = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
        let jsonData = await response.json();
        let avgGasPrice = Number(jsonData['average']) / 10;
        let fastGasPrice = Number(jsonData['fastest']) / 10;

        for (const i in tokenData) {
            console.log(tokenData[i].lpAmtEth);
            let pair_list = [];
            let wei_list = [];
            if (tokenData[i].lpAmtEth != 0) {
                let balance1 = BigNumber(await this.state.SmartContract.methods.GetLPTokenBalance(tokenData.pair_addr).call({ from: this.props.WalletAddress }));
                // balance1 = balance1.multipliedBy(Number(this.state.percent)).dividedBy(100).integerValue();
                balance1 = Number(tokenData[i].lpAmtEth)
                pair_list.push(this.state.pair_addr);
                wei_list.push(balance1.toString());
            }

            // Gas Price
            let gasPrice = 0;
            if (this.props.gasSpeed == "slow") { gasPrice = Math.floor(avgGasPrice / 2); }
            else if (this.props.gasSpeed == "medium") { gasPrice = Math.floor(avgGasPrice); }
            else { gasPrice = Math.floor(fastGasPrice * 1.5); }
            gasPrice = BigNumber(gasPrice * Math.pow(10, 9));

            const nonce = await this.web3.eth.getTransactionCount(this.state.SmartContractAddr);

            let gasSpeed = 0;
            if (this.props.gasSpeed === "slow") { gasSpeed = 1.0; } else if (this.props.gasSpeed === "medium") { gasSpeed = 1.2; } else { gasSpeed = 1.5; }

            let gasEstimate = 0;
            await this.state.SmartContract.methods.WithdrawLPList(pair_list, wei_list, 300, Date.now() + 2000)
                .estimateGas({
                    from: this.props.WalletAddress
                })
                .then(function (gasAmount) {
                    console.log(gasAmount)
                    gasEstimate = gasAmount;
                })
                .catch(function (error) {
                    console.log(error)
                });

            console.log("Withdraw ", pair_list, wei_list, nonce, gasEstimate, gasPrice);

            let results = await this.state.SmartContract.methods.WithdrawLPList(pair_list, wei_list, 300, Date.now() + 2000)
                .send({
                    from: this.props.WalletAddress,
                    value: 0,
                    gas: Math.floor(gasEstimate * gasSpeed), //gas 량
                    gasPrice: gasPrice.toString(),
                    nonce: nonce
                });

            if (results['status']) {
                alert("Success Withdraw Transaction");
            }
            else {
                alert("Fail Withdraw Transaction");
            }
        }
    }

    /* Manually input Trade Size */
    handleManualTradeSize = evt => {
        const manualTradeSize = Number(evt.target.value);
        this.setState(prevState => ({
            manualTradeSize,
        }))
    }

    /* Cumulative Account Profit 받아오는 함수 */
    getCumulativeProfit = () => {

    }

    /* Unstake 버튼 누르면 Address View 로 변환 */
    setUnstakeView = () => {
        if (!this.state.unstakeView){
            document.getElementById("trading_row_bef").style.display = "none";
            document.getElementById("trading_row_aft").style.display = "block";
            document.getElementById("trading_row_aft_btns").style.display = "block";
            this.setState({ unstakeView: !this.state.unstakeView });
        } else{
            document.getElementById("trading_row_bef").style.display = "block";
            document.getElementById("trading_row_aft").style.display = "none";
            document.getElementById("trading_row_aft_btns").style.display = "none";
            this.setState({ unstakeView: !this.state.unstakeView });
        }
    }

    /* Handle Token Size Start
    Sub ETH Token Size를 나머지 Sub ETH Token Size들과 합하여 Trade Size(ETH)에 보이도록 하는 함수 */
    handleToken1Change = async (evt) => {
        evt.preventDefault();
        let token1 = Number(evt.target.value);
        console.log("handleToken1Change", token1);
        let trade_size = token1 + this.state.token2 + this.state.token3 + this.state.token4 + this.state.token5
        this.setState({
            token1: token1,
            autoTradeSize: trade_size
        });
        console.log("handleToken1Change", trade_size, token1, this.state.token1, this.state.autoTradeSize);
    };
    handleToken2Change = evt => {
        const token2 = Number(evt.target.value);
        this.setState(prevState => ({
            token2,
            autoTradeSize: prevState.token1 + token2 + prevState.token3 + prevState.token4 + prevState.token5
        }));
    };
    handleToken3Change = evt => {
        const token3 = Number(evt.target.value);
        this.setState(prevState => ({
            token3,
            autoTradeSize: prevState.token1 + prevState.token2 + token3 + prevState.token4 + prevState.token5
        }));
    };
    handleToken4Change = evt => {
        const token4 = Number(evt.target.value);
        this.setState(prevState => ({
            token4,
            autoTradeSize: prevState.token1 + prevState.token2 + prevState.token3 + token4 + prevState.token5
        }));
    };
    handleToken5Change = evt => {
        const token5 = Number(evt.target.value);
        this.setState(prevState => ({
            token5,
            autoTradeSize: prevState.token1 + prevState.token2 + prevState.token3 + prevState.token4 + token5
        }));
    };

    /* Handle Gas Speed 
       gas speed slow: 0, medium: 1, fast: 2 */
    handleGasSpeedSlow = evt => {
        this.setState({
            gasSpeed: 0
        }, function () {
            console.log(this.state.gasSpeed)
        });
    };
    handleGasSpeedMedium = evt => {
        this.setState({
            gasSpeed: 1
        }, function () { console.log(this.state.gasSpeed) });
    };
    handleGasSpeedFast = evt => {
        this.setState({
            gasSpeed: 2
        }, function () { console.log(this.state.gasSpeed) });
    };

    /* Gas Speed Tab Animagtion */
    gasSpeedAnimation(speed, ele) {
        this.state.gasSpeedCosts.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (speed === "slow") {
            this.setState({ speed: "slow" });
            document.getElementById("gas_speed_box").style.left = "0px";
        } else if (speed === "medium") {
            this.setState({ speed: "medium" });
            document.getElementById("gas_speed_box").style.left = "161px";
        } else if (speed === "fast") {
            this.setState({ speed: "fast" });
            document.getElementById("gas_speed_box").style.left = "323px";
        }
        ele.style.color = "#fff";
    };

    render() {

        // setData(sorted);
        // console.log(this.state.tokenData);
        // console.log(this.state.allocOverflowDet);
        const mapToTestTokenInfo = (data) => {
            return data.map((token, i) => {
                return (<TokenInfo token={token} key={i} />);
            });
        };
        const mapToTestTokenUnstake = (data) => {
            return data.map((token, i) => {
                return (<TokenAddr token={token} key={i} />);
            });
        };
        return (
            <React.Fragment>
                <div className="portfolio">
                    <br />
                    <br />
                    <section className="portfolioHomeAttr" id="home">
                        <div className="box">
                            <Row>
                                <div className="pieChart">
                                    {/* Pie Chart */}
                                    <PieChart
                                        center={[80, 75]}
                                        viewBoxSize={[170, 170]}
                                        rounded
                                        lineWidth={35}
                                        labelPosition={50}
                                        paddingAngle={5}
                                        data={[
                                            {
                                                color: "#277da4",
                                                title: "One",
                                                value: 20,
                                            },
                                            {
                                                color: "#073D67",
                                                title: "Two",
                                                value: 40,
                                            },
                                            {
                                                color: "#63afca",
                                                title: "Three",
                                                value: 40,
                                            },
                                        ]}
                                    />
                                </div>
                                <div className="percentSector">
                                    <input className="possessPercent" type="percent" value="40%" /><br />
                                    <input className="possessPercent2" type="percent" value="40%" /><br />
                                    <input className="possessPercent3" type="percent" value="20%" /><br />
                                </div>
                                <div className="unipair">
                                    <h5 className="pair1"> ETH - USDT </h5>
                                    <h5 className="pair2"> ETH - USDT </h5>
                                    <h5 className="pair3"> ETH - USDT </h5>
                                </div>
                                <div className="account-totalprofit">
                                    <h5 className="cumulative"> Cumulative Account Profit </h5>
                                    <img width="60px" height="100px" src="./images/green-up-profit.png" alt="cumulative account profit"></img>
                                    <div className="percentage">
                                        {/* 여기에 accumulated profit percentage가 들어가야 함 */}
                                        <h5 className="font-weight-bold">15 %</h5>
                                        <h5>30 ETH | $ 29,250</h5>

                                    </div>
                                </div>
                                <div className="account-balance">
                                    <h4> Available Balance </h4>
                                    <div className="balance">
                                        <h5 className="font-weight-bold">{this.EtherBalance}</h5>
                                        <h5 className="font-weight-lighter"> ETH {this.USDBalance}</h5>
                                    </div>
                                    <h4> Total Investment </h4>
                                    <div>
                                        {/* Total Investment 대신에 this.tokenData의 tokenSize들의 합을 고려해봐야 함 */}
                                        <h5 className="investment font-weight-bold">{this.TotalInvestment} </h5>
                                        <h5 className="investment font-weight-lighter "> ETH ${this.TotalInvestmentUSD}</h5>

                                    </div>
                                </div>

                            </Row>
                            {/* <input type="number"> ETH - USDT </input>
                            <input type="number"> ETH - USDT </input> */}
                        </div>
                        <Row>
                            <div className="wallet-connected">
                                <div className="trading-rows" id="trading_row_bef">
                                    <Row>
                                        <h5 className="context1">
                                            Liquidity Pools
                                        </h5>
                                        <h5 className="context2">
                                            Date Staked
                                        </h5>
                                        <h5 className="context3">
                                            Amount Staked
                                        </h5>
                                        <h5 className="context4">
                                            Current Value
                                        </h5>
                                        <h5 className="context5">
                                            Profit
                                        </h5>
                                        <button className="context6" onClick={this.setUnstakeView}>
                                            Unstake
                                        </button>
                                    </Row>
                                </div>
                                <div className="trading-rows2" id="trading_row_aft">
                                    <Row>
                                        <h5 className="context1">
                                            Liquidity Pools
                                        </h5>
                                        <h5 className="context2">
                                            Address
                                        </h5>
                                        <h5 className="context3">
                                            Amount to Unstake
                                        </h5>
                                        <h5 className="context4">
                                            LP Token Amount
                                        </h5>
                                    </Row>
                                </div>
                            </div>
                        </Row>
                        {this.state.unstakeView ?
                            <div id="unstake_aft">
                                {mapToTestTokenUnstake(this.tokenData)}
                            </div>
                            :
                            <div id="unstake_bef">
                                {mapToTestTokenInfo(this.tokenData)}
                            </div>
                        }
                        {/* <Row> */}
                        <div className="list-inline-item" id="trading_row_aft_btns">
                            <div className="gas_speed_area">
                                <GasSpeedAnimationBox id="gas_speed_box"></GasSpeedAnimationBox>
                                <button type="button" id="slow" onClick={(e) => {
                                    this.GasSpeed("slow");
                                    this.gasSpeedAnimation("slow", e.target);
                                }}>Slow</button>
                                <button type="button" id="medium" onClick={(e) => {
                                    this.GasSpeed("medium");
                                    this.gasSpeedAnimation("medium", e.target);
                                }}>Medium</button>
                                <button type="button" id="fast" onClick={(e) => {
                                    this.GasSpeed("fast");
                                    this.gasSpeedAnimation("fast", e.target);
                                }}>Fast</button>
                            </div>
                            <div className="cancelSubmit">
                                <input type="button" className="cancel" value="Cancel" onClick={this.setUnstakeView} />
                                <input type="button" className="withdraw" value="Withdraw" onClick={this.withdraw} />
                            </div>
                        </div>
                        {/* </Row> */}


                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default StakePage;