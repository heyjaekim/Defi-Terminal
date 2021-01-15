import React from 'react';
import { Row } from 'reactstrap';
import Web3 from "web3";
import BigNumber from "bignumber.js";
import Spinner from 'react-bootstrap/Spinner'
import '../components/css/ConnectedPage.css';
import '../components/css/StakePage.css'
import { AiFillPlusCircle, AiFillMinusCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import GasSlider from "../components/GasSlider.js";
import AddPool from '../components/AddPool.js';
import TopPool from '../components/TopPool.js';




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
            gasCost: 0,
            gasPrice: 0,
            maxGasPrice: 0,
            t_id: 0,
            tokenData: [],
            totalTradeSize: 0, /* 각 Unipair의 Token Size 들의 값의 합 */
            limit: 0,
            isConfirmed: false,
            isProcessing: false,
            date: '',
        };
        this.topPoolData = props.topPoolData;
        this.WalletAddress = props.WalletAddress;
        this.UsdBalance = props.USDBalance;
        this.SetTokenData = props.SetTokenData;
        this.SetStake = props.SetStake;
        this.ConnectWallet = props.ConnectWallet;
        this.IsConnectedMetaMask = props.IsConnectedMetaMask;
        this.IsStake = props.Stake;
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
        // window.ethereum.autoRefreshOnNetworkChange = false
        this.web3 = new Web3(window.ethereum);
        this.BN = this.web3.utils.BN;
        let smartcontract = new this.web3.eth.Contract(this.state.SmartContractABI, this.state.SmartContractAddr);

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
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date();
        let date = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
        const state = {
            default_t_id: 'default_' + this.state.t_id.toString(),
            address_t_id: 'address_' + this.state.t_id.toString(),
            uniswap_pair_abi: this.state.uniswap_pair_abi,
            erc20_abi: this.state.erc20_abi,
            pairLeft: 'ETH',
            pairRight: 'USD',
            dateStaked: date,
            profitSince: [true, .20], // [false || true , profit Percent] 값이 stake한 시점부터 지속적으로 모니터링 되어서 업데이트 되어야 함.
            pair_cont: null,
            pair_addr: '',
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
                tokenData: [],
                gasCost: 0
            }
        })
    };

    submitTrades = async (isStake) => {
        if (this.props.IsConnectedMetaMask) {
            if (this.props.IsStake) {
                this.SetTokenData(this.state.tokenData);
                this.Invest();

            } else {
                console.log('withdraw')
                this.Withdraw();
            }
        } else {
            alert("Connected 'MetaMask' first.");
        }
    };

    Invest = async () => {
        let pair_list = [];
        let wei_list = [];
        let wei_amount = BigNumber(0);

        let response = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
        let jsonData = await response.json();
        let avgGasPrice = Number(jsonData['average']) / 10;
        let fastGasPrice = Number(jsonData['fastest']) / 10;

        console.log("jsonData: ", jsonData);
        console.log("avgGasPrice: ", avgGasPrice);
        console.log("fastGasPrice: ", fastGasPrice);

        const tokenData = this.state.tokenData;
        let wei;
        for (let i = 0; i < tokenData.length; i++) {
            console.log(`Token Data Index${i} Investing !`, tokenData[i].tokenSize);
            let wei = BigNumber(tokenData[i].tokenSize * Math.pow(10, 18));
            wei = wei.integerValue();//Math.floor( wei );
            if (wei !== 0) {
                pair_list.push(tokenData[i].pair_addr);
                wei_list.push(wei.toString());
                wei_amount = wei.plus(wei_amount);
            }
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
        await this.state.SmartContract.methods.StakeLPList([this.state.pair1_addr], [wei], 25, Date.now()+2000).estimateGas({from:this.props.WalletAddress,
                                                                                                                                        value:wei
                                                                                                                                    }).then(function(gasAmount){
                                                                                                                                        console.log(gasAmount)
                                                                                                                                        gasEstimate = gasAmount;
                                                                                                                                    })
                                                                                                                                    .catch(function(error){
                                                                                                                                        console.log(error)
                                                                                                                                    });;
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
    gas 가격 기준을 불러와서 이 함수에 적용 */
    SetGasSpeed = async (value) => {
        this.setState({
            gasCost: (value / 100 * this.props.fastestGasPrice).toFixed(4)
        });
    }

    removeTokenData = async () => {
        this.state.tokenData.pop();
        this.forceUpdate();
        let total = 0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        this.setState({ totalTradeSize: total.toFixed(6) });
        this.setState({ totalTradeSize: total.toFixed(6) });
        if (this.state.tokenData.length === 0) {
            document.getElementById("add_pool_display").style.display = "none";
        }
    }

    updateTradeTotalSize = async () => {
        let total = 0;
        for (let i = 0; i < this.state.tokenData.length; i++) {
            total += this.state.tokenData[i]['tokenSize']
        }
        if (total > this.props.EtherBalance){
            this.setState({ totalTradeSize: this.props.EtherBalance });
        } else {
            this.setState({ totalTradeSize: total.toFixed(6) });
        }
    }

    handleConfirmMessageBox() {
        this.setState({ isConfirmed: !this.state.isConfirmed });
        this.isConfirmRef.current.focus();
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

    clickGasQmark = () => {

    }

    render() {
        const mapToTokenStaking = (data) => {
            return data.map((token, i) => {
                return (<AddPool token={token} totalTradeSize={this.state.totalTradeSize} EtherBalance={this.props.EtherBalance} updateTradeTotalSize={this.updateTradeTotalSize} key={i} />);
            })
        }


        return (
            <React.Fragment>
                <div className="stakehome">
                    <section className="home-attr" id="home">
                        <Row>
                            {/* <Col lg="6"> */}

                            <div className="stake_instruct">
                                <p>Stake up to 5 pairs at a time</p>
                            </div>
                            <div className="stake_box">
                                <div className="content">
                                    <div className="balance"> Available Balance </div>
                                    <div className="ethereum_usd">
                                        <span style={{ fontSize: '32px' }}>{this.props.EtherBalance}</span>
                                        <span className="eth"> ETH</span>
                                        <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', top: 67, left: 365 }}>$ {this.props.UsdBalance}</span>
                                    </div>
                                    <div className="size" id="add_pool_display" style={{ display: 'none' }}>
                                        <span>Size</span>
                                        <span style={{ fontWeight: 'lighter' }}> (ETH)</span>
                                        <span style={{ marginLeft: 170 }}>Percent</span>
                                    </div>
                                </div>

                            </div>
                        </Row>
                        <Row>
                            <div className="trading_rows">
                                <div className="context1">Liquidity Pools</div>
                                <div className="context2">Address</div>
                            </div>
                        </Row>
                        <Row>
                            <div className="eth_usdt_row">



                                {mapToTokenStaking(this.state.tokenData)}


                                <div className="adding_box">
                                    <button className="plusMinus_plus" onClick={this.addNewTokenData}> &nbsp;<AiFillPlusCircle color='#fafafa' size="30px" />&nbsp; &nbsp;Add Pool </button>
                                    <button className="plusMinus_minus" onClick={this.removeTokenData}><AiFillMinusCircle color='#fafafa' size="30px" /> &nbsp;Remove Pool</button>
                                </div>
                                <div className="investment">
                                    <div style={{ color: '#51A0BF' }}>
                                        Investment Amount
                                    </div>
                                    <div className="invest_usd">
                                        <span style={{ color: '#fafafa', fontSize: '28px' }}>{this.state.totalTradeSize}</span>
                                        <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 620 }}>$ 97,500</span>
                                    </div>
                                    <div style={{ color: '#51A0BF', paddingTop: '8px' }}>
                                        Estimated gas cost
                                    </div>
                                    <div className="gascost_usd">
                                        <span style={{ color: '#fafafa', fontSize: '28px' }}>{this.state.gasCost}</span>
                                        <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 620 }}>$ {this.state.gasCost}</span>
                                    </div>
                                    <div style={{ color: '#51A0BF', paddingTop: '8px' }}>
                                        Total Estimated Transaction Amount
                                    </div>
                                    <div className="transc_usd">
                                        <span style={{ color: '#fafafa', fontSize: '28px' }}>100.001</span>
                                        <span style={{ color: '#fafafa', fontSize: '28px', fontWeight: 'lighter', display: 'inline', position: 'absolute', left: 620 }}>$ 292,501</span>
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
                                    <AiOutlineQuestionCircle size="25px" color="#073d67" onClick={this.clickGasQmark()} />
                                </span>
                                <GasSlider SetGasSpeed={this.SetGasSpeed} />
                                <div>
                                    $ {this.state.gasCost} / $ {this.props.fastestGasPrice}
                                </div>
                            </section>
                        </Row>

                        <Row>
                            <section className={`stake_confirm_message ${this.state.isConfirmed ? "active" : "inactive"}`} ref={this.isConfirmRef}>
                                <div className="inner_message">
                                    You are staking <p>{this.state.totalTradeSize} ETH</p> in <img src="images/eth_dollar.png" width="55px"></img>
                                    <p> ETH - USDT</p>
                                    <br /><br />
                                    from: <p>{this.WalletAddress}</p>
                                    <br /><br />
                                    The estimated transaction amount including
                                    <br /><br />
                                    gas cost is: <p>{this.state.gasCost}</p> or <p>$ {this.props.fastestGasPrice} </p>
                                </div>
                                <div className="stake_confirm_buttons">
                                    <button className="flex-item" onClick={this.handleConfirmMessageBox}>Cancel</button>
                                    <button className="flex-item" onClick={() => {
                                        this.handleProcessingMessageBox(); this.submitTrades();
                                        setTimeout(function() {
                                            this.setState({isProcessing: !this.state.isProcessing})
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
                    </section>
                </div>
                <div className="recommend_page">
                    <section className="recommend_below">
                        <div style={{ fontSize: '24px', color: '#fafafa', paddingBottom: '32px' }}>
                            Top Performing Liquidity pools as of {this.state.date}
                        </div>
                        <Row>
                            <TopPool pool={this.topPoolData}></TopPool>
                        </Row>
                    </section>
                </div>

            </React.Fragment>
        );
    }
}

export default StakePage;