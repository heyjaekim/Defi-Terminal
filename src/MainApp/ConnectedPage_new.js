import React from 'react';
import { Row } from 'reactstrap';
import { GasSpeedAnimationBox } from "../components/styles";
import Web3 from "web3";
import BigNumber from "bignumber.js";
import '../components/css/ConnectedPage.css';
import '../components/css/StakePage.css'
// import { Motion, spring } from 'react-motion';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

// import PhoneForm from '../components/PhoneForm.js';
// import PhoneInfoList from '../components/PhoneInfoList.js';
// import CustomizedSlider from '../components/Slider.js';
import PercentForm from '../components/PercentForm.js';

class ConnectedPage extends React.Component {
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
            allocOverflowDet: [],
            totalTradeSize: 0, /* 각 Unipair의 Token Size 들의 값의 합 */
            gasSpeed: 0,
            t_id: 0,
            tokenData: [],
        };
        this.EtherBalance = props.EtherBalance;
        this.WalletAddress = props.WalletAddress;
        this.UsdBalance = props.USDBalance;
        this.SetTokenData = props.SetTokenData;
        this.SetStake = props.SetStake;
        this.GasSpeed = props.GasSpeed;
        this.ConnectWallet = props.ConnectWallet;
        this.SubmitSetTrades = props.SubmitSetTrades; /* Onclick Submit button to proceed Tokens towards designated Addresses */
        this.IsConnectedMetaMask = props.IsConnectedMetaMask;
        this.IsStake = props.Stake;
        this.gasSpeed = props.gasSpeed;
        
    };

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
            stakeStatus: [
                document.getElementById("stake"),
                document.getElementById("unstake")
            ],
            gasSpeedCosts: [
                document.getElementById("slow"),
                document.getElementById("medium"),
                document.getElementById("fast")
            ],
        });
    }

    /* PercentForm으로 전달되는 token data의 상태들 입니다. */
    /* Unipair address row 에서 업데이트 한 후 invest를 누를 시에 this.SetTokenData를 통해 App.js에 있는 this.state.tokenData로 데이터 값이 업데이트 됩니다. */
    addNewTokenData = async () => {
        const state = {
            default_t_id: 'default_'+this.state.t_id.toString(),
            address_t_id: 'address_'+this.state.t_id.toString(),
            uniswap_pair_abi: this.state.uniswap_pair_abi,
            erc20_abi: this.state.erc20_abi,
            pairLeft: 'ETH',
            pairRight: 'USD',
            dateStaked: '',
            amountStaked: 0,
            isProfit: false,
            profitSince: '',
            pair_cont: null,
            pair_addr: '',
            pair_cont: null,
            pair_token0: null,
            pair_token1: null,
            pair_token0_name: '',
            pair_token1_name: '',
            pair_token0_img: null,
            pair_token1_img: null,
            // token price 및 profit 측정하는데 필요한 요소들
            tokenName: 'token_' + this.state.t_id.toString(),
            tokenSize: 0,
            tokenSizeInUSD: 0,
            currentTokenValue: 0, /* 실시간 currentTokenValue가 업데이트 되어야함 */
            currentUsdValue: 0,
            lpAmtEth: 0, /* to change lp amount (variable placed in TokenAddr.js) */
            lpAmtUsd: 0,
            // percent box 만들때 필요한 요소들
            percentAniBox: 'percent_animation_box_' + this.state.t_id.toString(),
            selectedPercent: 0,
            percent0: 'percent0_' + this.state.t_id.toString(),
            percent25: 'percent25_' + this.state.t_id.toString(),
            percent50: 'percent50_' + this.state.t_id.toString(),
            percent75: 'percent75_' + this.state.t_id.toString(),
            percent100: 'percent100_' + this.state.t_id.toString()
        }
        const { tokenData } = this.state;
        this.setState({
            tokenData: tokenData.concat({ t_id: this.state.t_id++, ...state })
        })
    }


    /* Meta Mask를 연결하지 않은 상태에서 Connect Your Wallet를 누른 경우 로그인된 페이지로 변환 */
    setDetailArea() {
        document.getElementById("connect_your_wallet").style.display = "none";
        document.getElementById("detail_select_area").style.display = "block";
        document.getElementById("detail_select_area2").style.display = "block";
    }

    setDetailAreaStake() {
        document.getElementById("stake_trade").style.display = "block";
        document.getElementById("unstake_trade").style.display = "none";
        document.getElementById("stake_wallet").style.display = "block";
        document.getElementById("unstake_wallet").style.display = "none";
        document.getElementById("trading_rows_stake").style.display = "block";
        document.getElementById("trading_rows_unstake").style.display = "none";
        document.getElementById("context1_stake").style.display = "block";
        document.getElementById("context1_unstake").style.display = "none";
        document.getElementById("context2_stake").style.display = "block";
        document.getElementById("context2_unstake").style.display = "none";
        document.getElementById("context3_stake").style.display = "block";
        document.getElementById("context3_unstake").style.display = "none";
        this.cancelToResetStates();
    }
    setDetailAreaUnstake() {
        document.getElementById("stake_trade").style.display = "none";
        document.getElementById("unstake_trade").style.display = "none";
        document.getElementById("stake_wallet").style.display = "none";
        document.getElementById("unstake_wallet").style.display = "block";
        document.getElementById("trading_rows_stake").style.display = "none";
        document.getElementById("trading_rows_unstake").style.display = "block";
        document.getElementById("context1_stake").style.display = "none";
        document.getElementById("context1_unstake").style.display = "none";
        document.getElementById("context2_stake").style.display = "none";
        document.getElementById("context2_unstake").style.display = "block";
        document.getElementById("context3_stake").style.display = "none";
        document.getElementById("context3_unstake").style.display = "block";
        this.cancelToResetStates();
    }

    /* Manually input Trade Size */
    handleManualTradeSize = evt => {
        const manualTradeSize = Number(evt.target.value);
        this.setState(prevState => ({
            manualTradeSize,
        }))
    }

    /* OnClick Cancel to reset every states */
    cancelToResetStates = () => {
        this.setState((state) => {
            return {
                manualTradeSize: 1,
                allocOverflowDet: [],
                autoTradeSize: 0,
                speed: "slow",
                token1: 0,
                token2: 0,
                token3: 0,
                token4: 0,
                token5: 0,
                percent: 0,
                percent2: 0,
                percent3: 0,
                percent4: 0,
                percent5: 0,
                stake: true,
                gasSpeed: 0
            }
        })
    };

    submitTrades = async (isStake) => {
        if (this.props.IsConnectedMetaMask) {
            if (this.props.IsStake) {
                console.log('invest')
                this.SetTokenData(this.state.tokenData);
                // this.Invest();

            } else {
                console.log('withdraw')
                this.Withdraw();
            }
        } else {
            alert("Connected 'MetaMask' first.");
        }
    };

    Invest = async () => {
        console.log("1 Investing !", this.state.token1, this.state.percent, this.props.gasSpeed);
        console.log("2 Investing !", this.state.token2, this.state.percent2, this.props.gasSpeed);
        console.log("3 Investing !", this.state.token3, this.state.percent3, this.props.gasSpeed);

        let response = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
        let jsonData = await response.json();
        let avgGasPrice = Number(jsonData['average']) / 10;
        let fastGasPrice = Number(jsonData['fastest']) / 10;

        // Invest Token
        let wei1 = BigNumber(this.state.token1 * Math.pow(10, 18)); //eth to wei
        wei1 = wei1.integerValue();//Math.floor( wei1 );

        let wei2 = BigNumber(this.state.token2 * Math.pow(10, 18)); //eth to wei
        wei2 = wei2.integerValue(); //Math.floor( wei2 );

        let wei3 = BigNumber(this.state.token3 * Math.pow(10, 18)); //eth to wei
        wei3 = wei3.integerValue(); //Math.floor( wei3 );

        let pair_list = [];
        let wei_list = [];
        let wei_amount = BigNumber(0);
        if (wei1 !== 0) {
            pair_list.push(this.state.pair1_addr);
            wei_list.push(wei1.toString());
            wei_amount = wei1.plus(wei_amount);
        }
        if (wei2 !== 0) {
            pair_list.push(this.state.pair2_addr);
            wei_list.push(wei2.toString());
            wei_amount = wei2.plus(wei_amount);
        }
        if (wei3 !== 0) {
            pair_list.push(this.state.pair3_addr);
            wei_list.push(wei3.toString());
            wei_amount = wei3.plus(wei_amount);
        }

        // Gas Price
        let gasPrice = 0;
        if (this.props.gasSpeed === "slow") { gasPrice = Math.floor(avgGasPrice / 2); }
        else if (this.props.gasSpeed === "medium") { gasPrice = Math.floor(avgGasPrice); }
        else { gasPrice = Math.floor(fastGasPrice * 1.5); }
        console.log("Gas:", avgGasPrice, fastGasPrice, gasPrice, Math.floor(avgGasPrice / 2));
        gasPrice = BigNumber(gasPrice * Math.pow(10, 9));

        // Nonce
        const nonce = await this.web3.eth.getTransactionCount(this.state.SmartContractAddr);

        //Gas Speed
        let gasSpeed = 0;
        if (this.props.gasSpeed === "slow") { gasSpeed = 1.0; } else if (this.props.gasSpeed === "medium") { gasSpeed = 1.2; } else { gasSpeed = 1.5; }

        //Gas Estimate
        let gasEstimate = 0;
        // await this.state.SmartContract.methods.StakeLPList([this.state.pair1_addr], [wei], 25, Date.now()+2000).estimateGas({from:this.props.WalletAddress,
        //                                                                                                                                 value:wei
        //                                                                                                                             }).then(function(gasAmount){
        //                                                                                                                                 console.log(gasAmount)
        //                                                                                                                                 gasEstimate = gasAmount;
        //                                                                                                                             })
        //                                                                                                                             .catch(function(error){
        //                                                                                                                                 console.log(error)
        //                                                                                                                             });;
        await this.state.SmartContract.methods.StakeLPList(pair_list, wei_list, 250, Date.now() + 2000)
            .estimateGas({
                from: this.props.WalletAddress,
                value: wei_amount
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
                gas: Math.floor(gasEstimate * gasSpeed), //gas 량
                gasPrice: gasPrice.toString(),
                nonce: nonce//재접속한 횟수
            });

        if (results['status']) {
            alert("Success Invest Transaction");
        }
        else {
            alert("Fail Invest Transaction");
        }
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

    /* percentAnimation 함수 안에서 실행되어 Sub Token Size로 Allocate하는 함수 */
    /* Total Allocated Size가 Total Trade Size를 넘는 경우 Focusing하고있는 Sub Token Size을 뺀 나머지 값을 3등분하여 배분 */
    allocToSubTokenSize = () => {
        this.state.allocOverflowDet.push(this.state.token1);
        this.setState((state) => {
            return { token1: state.manualTradeSize * (state.percent / 100) }
        });
    };
    allocToSubTokenSize2 = () => {
        this.state.allocOverflowDet.push(this.state.token2)
        this.setState((state) => {
            return { token2: state.manualTradeSize * (state.percent2 / 100) }
        });
    };
    allocToSubTokenSize3 = () => {
        this.state.allocOverflowDet.push(this.state.token3)
        this.setState((state) => {
            return { token3: state.manualTradeSize * (state.percent3 / 100) }
        });
    };
    allocToSubTokenSize4 = () => {
        this.state.allocOverflowDet.push(this.state.token4)
        this.setState((state) => {
            return { token4: state.manualTradeSize * (state.percent4 / 100) }
        });
    };

    /* Stake/Unstake Tab Animagtion */
    StakeTogglerAnimation(stake, ele) {
        this.state.gasSpeedCosts.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (stake === true) {
            this.setState({ stake: true })
            document.getElementById("stakebox").style.left = "0px";
        } else if (stake === false) {
            this.setState({ stake: false })
            document.getElementById("stakebox").style.left = "291px";
        }
        ele.style.color = "#fff";
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

    removeTokenData = async () => {
        this.state.tokenData.pop();
        this.forceUpdate();
        let total=0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        this.setState({ totalTradeSize: total});
    }

    updateTradeTotalSize = async () => {
        let total = 0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        this.setState({ totalTradeSize: total});
    }

    render() {
        // console.log(this.state.t_id.toString());
        // console.log(this.state.tokenData);
        // console.log(this.state.totalTradeSize);
        console.log("this.state.tokenData: " + this.state.tokenData);
        // console.log("this.props.tokenData: " + this.props.tokenData);
        const mapToTestTokenStake = (data) => {
            return data.map((token, i) => {
                return (<PercentForm token={token} updateTradeTotalSize={this.updateTradeTotalSize} key={i} />);
            })
        }
        return (
            <React.Fragment>
                <div className="home">
                    <section className="home_attr" id="home">
                        <Row>
                            <div id="detail_select_area" style={{ display: 'flex' }}>
                                <div className="balance-eth">
                                    <div className="mt--16 ml--33">
                                        <h5 className="available">Available Balance</h5>
                                        <h3 className="available-eth">{this.props.EtherBalance} ETH</h3>
                                        <h5 className="available-dollar">$ {this.props.UsdBalance}</h5>
                                    </div>
                                </div>
                            </div>
                            <div id="detail_select_area2" style={{ display: 'flex' }}>
                                <div className="cancel-submit">
                                    <button className="button1" onClick={this.cancelToResetStates}><h5 className="button-context">Reset</h5></button>
                                    <button className="button1" onClick={this.submitTrades}><h5 className="button-context">Submit</h5></button>
                                </div>
                            </div>
                            <div className="trade-information">
                                <Row>
                                    <h5 className="context1" id="context1_stake">
                                        Total (ETH)
                                    </h5>
                                    <h5 className="context2" id="context2_stake">
                                        Wallet Address
                                    </h5>
                                    <h5 className="context3" id="context3_stake">
                                        Faster speed costs more gas
                                    </h5>
                                </Row>
                            </div>
                            <div className="text-information-area">
                                <Row>
                                    <div className="trade-size" id="stake_trade">
                                        {/* <input className="stake_tradesize_manual" type="number" value={this.state.manualTradeSize} 
                                            onChange={this.handleManualTradeSize}/> */}
                                        <input className="stake_tradesize_manual" type="number" value={this.state.totalTradeSize} readOnly/>
                                        {/* <input className="stake_tradesize_auto" type="number" value={this.state.result} /> */}
                                    </div>
                                    <div className="wallet-address" id="stake_wallet">
                                        <input className="input-wallet-address" type="text" value={this.props.WalletAddress} readOnly />
                                    </div>
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
                                </Row>
                            </div>
                        </Row>
                        <button className="plusMinus plus" onClick={this.addNewTokenData}><AiFillPlusCircle color='#F5B71E' size="30px" /> </button>
                        <button className="plusMinus-minus minus" onClick={this.removeTokenData}><AiFillMinusCircle color='#F5B71E' size="30px" /> </button>

                        <Row>
                            <div className="wallet-connected">
                                <div className="trading-rows" id="trading_rows_stake">
                                    <Row>
                                        <h5 className="context1">Liquidity Pools</h5>
                                        <h5 className="context2">Investment Amount</h5>
                                        <h5 className="context3">Allocation</h5>
                                        <h5 className="context3">Address</h5>
                                    </Row>
                                </div>
                            </div>
                        </Row>


                        {mapToTestTokenStake(this.state.tokenData)}


                    </section>
                </div>
            </React.Fragment>
        );
    }

}

export default ConnectedPage;