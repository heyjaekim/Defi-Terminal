import React from 'react';
import Web3 from "web3";
import BigNumber from "bignumber.js";
import TokenPercent from '../components/TokenPercent.js'
import TokenPair from '../components/TokenPair.js'
import TokenInfo from '../components/TokenInfo.js'
import TokenAddr from '../components/TokenAddr.js'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Row } from 'reactstrap';
import { PieChart } from 'react-minimal-pie-chart';
import '../components/css/PortfolioPage.css';
import GasSlider from "../components/GasSlider.js";
import TopPool from "../components/TopPool.js";


class StakePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SmartContract: null,
            SmartContractAddr: "0xa00dFEDC803C13cfcA8c68d68194a3841165B198",//[MainNet]
            SmartContractABI: [{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "user","type": "address"},{"indexed": false,"internalType": "address","name": "pair","type": "address"},{"indexed": false,"internalType": "uint256","name": "amt_lp_balance","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amt_eth","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "lp_usd_unit","type": "uint256"}],"name": "WithdrawEvent","type": "event"},{"inputs": [{"internalType": "address","name": "_pair","type": "address"}],"name": "CheckTokensFromPair","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "DAI","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_pair","type": "address"}],"name": "GetCurLP2USD","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_token","type": "address"}],"name": "GetLPBalance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_pair","type": "address"},{"internalType": "uint256","name": "_amount","type": "uint256"},{"internalType": "uint256","name": "_max_slippage","type": "uint256"}],"name": "GetLPWorth","outputs": [{"internalType": "uint256","name": "","type": "uint256"},{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_fee","type": "uint256"}],"name": "SetFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_unit","type": "uint256"}],"name": "SetPercentageUnit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_target","type": "address"}],"name": "SetStorageContract","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_fee","type": "uint256"}],"name": "SetUniswapFee","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "USD","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "USDC","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "USDT","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address[]","name": "_pair","type": "address[]"},{"internalType": "uint256[]","name": "_amt","type": "uint256[]"},{"internalType": "uint256","name": "_max_slippage","type": "uint256"},{"internalType": "uint256","name": "_deadline","type": "uint256"}],"name": "WithdrawLPList","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "deadline","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "fee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "isOwner","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "maxSlippage","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "pair","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "percentage_unit","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "storage_","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token0","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "token1","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "uniswap_fee","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"stateMutability": "payable","type": "receive"}],
            uniswap_pair_abi: [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "burn", "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getReserves", "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "_reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "initialize", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "kLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "price0CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "price1CumulativeLast", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "skim", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "swap", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "sync", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }],
            erc20_abi: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }],

            speed: "slow",
            stake: true,
            gasSpeed: 0,
            gasCost: (this.props.averageGasPrice  * 621024 * this.props.USD/ Math.pow(10, 9)),
            unstakeView: false,
            pieChartData: [],
            web3: new Web3(window.ethereum),
        };
        this.SetStake = props.SetStake;
        this.EtherBalance = props.EtherBalance;
        this.TotalInvestment = props.TotalInvestment;
        this.TotalInvestmentUSD = props.TotalInvestmentUSD;
        this.WalletAddress = props.WalletAddress;
        this.GasSpeed = props.GasSpeed;

        this.IsConnectedMetaMask = props.IsConnectedMetaMask;
        this.IsStake = props.Stake;
        this.gasSpeed = props.gasSpeed;
        this.topPoolData = props.topPoolData;
        this.tokenData = props.tokenData;
    };

    static defaultProps = {
        EtherBalance: 3000,
        WalletAddress: "Default Example Address",
        GasSpeed: "slow"
    };

    componentDidMount() {
        // window.ethereum.autoRefreshOnNetworkChange = false
        this.web3 = this.state.web3;
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
        this.getPercentageData();
    }

    getPercentageData = async () => {
        const data = [{
            color: "#63afca",
            title: "possessPercent",
            value: 0,
            pair: [],
        },
        {
            color: "#073D67",
            title: "possessPercent2",
            value: 0,
            pair: [],
        },
        {
            color: "#277da4",
            title: "possessPercent3",
            value: 0,
            pair: [],
        }];
        let tempData = [];
        let tokenData = this.props.tokenData;
        tokenData.sort((a, b) => (a.tokenSize < b.tokenSize) ? 1 : -1);
        for (let i = 0; i < tokenData.length; i++) {
            data[i].value = tokenData[i].tokenSize;
            data[i].pair = [tokenData[i].pair_token0_name, tokenData[i].pair_token1_name];
            tempData.push(data[i]);
        }
        console.log(tempData);
        this.setState({
            pieChartData: tempData
        }, function () {
            console.log(this.state.pieChartData);
        });
    }

    /* 기존 withdraw 함수에서 this.props.tokenData를 불러와 부분수정 하였습니다. */
    withdraw = async () => {
        console.log("works", this.state.gwei, this.WalletAddress, this.props.tokenData);

        //const tokenData = this.props.tokenData;
        let pair_list = [];
        let wei_list = [];
        for (let i = 0; i < this.props.tokenData.length; i++) {

            var balance = BigNumber(await this.state.SmartContract.methods.GetLPBalance(this.props.tokenData[i].pair_addr).call({ from: this.props.WalletAddress }));
            balance = balance.multipliedBy(this.props.tokenData[i].percentToken / 100).integerValue();
            //var balance = BigNumber(this.props.tokenData[i].precentToken* Math.pow(10, 18) ).integerValue();
            if (balance !== 0) {
                pair_list.push(this.props.tokenData[i].pair_addr);
                wei_list.push(balance.toString());
            }
            console.log("Withdraw : ", i, this.props.tokenData[i].pair_addr, this.props.tokenData[i].percentToken, balance)
        }
        let gasPrice = BigNumber(Number(this.state.gwei) * Math.pow(10, 9) / 621024).integerValue();
        const nonce = await this.web3.eth.getTransactionCount(this.props.WalletAddress);
        console.log("Withdraw222 ", pair_list, wei_list, nonce, Number(this.state.gwei), Number(this.state.gwei) * Math.pow(10, 9), Number(this.state.gwei) * Math.pow(10, 9) / 621024);

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
                gas: Math.floor(gasEstimate*1.2), //gas 량
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
        if (!this.state.unstakeView) {
            document.getElementById("trading_row_bef").style.display = "none";
            document.getElementById("trading_row_aft").style.display = "block";
            document.getElementById("trading_row_aft_btns").style.display = "block";
            this.setState({ unstakeView: !this.state.unstakeView });
        } else {
            document.getElementById("trading_row_bef").style.display = "block";
            document.getElementById("trading_row_aft").style.display = "none";
            document.getElementById("trading_row_aft_btns").style.display = "none";
            this.setState({ unstakeView: !this.state.unstakeView });
        }
    }

    /* Handle Gas Speed
    gas 가격 기준을 불러와서 이 함수에 적용 */
    SetGasSpeed = async (value) => {
        //console.log("wwww", value, (value / 100 * (parseFloat(this.props.fastestGasPrice)-parseFloat(this.props.averageGasPrice)) + parseFloat(this.props.averageGasPrice)) * 621024)
        this.setState({
            gwei: ((value / 100 * (parseFloat(this.props.fastestGasPrice)-parseFloat(this.props.averageGasPrice)) + parseFloat(this.props.averageGasPrice)) * 621024),
            gasCost: (this.props.averageGasPrice  * 621024 * this.props.USD/ Math.pow(10, 9)) + 
                        (value / 100 * (parseFloat(this.props.fastestGasPrice)-parseFloat(this.props.averageGasPrice))  * 621024 * this.props.USD/ Math.pow(10, 9)),
        });
    }

    updateTradeTotalSize = async () => {
        let totalUnstake = 0;
        for (let i = 0; i < this.props.tokenData.length; i++) {
            totalUnstake += this.props.tokenData[i]['lpAmtEth']
        }
        this.props.EtherBalance -= totalUnstake.toFixed(6);
    }

    render() {    
        const mapToTokenPercent = (data) => {
            return data.map((token, i) => {
                return (<TokenPercent token={token} totalSize={this.TotalInvestment} key={i} />);
            });
        };
        const mapToTokenPair = (data) => {
            return data.map((token, i) => {
                return (<TokenPair token={token} key={i} />);
            });
        };
        const mapToTestTokenInfo = (data) => {
            return data.map((token, i) => {
                return (<TokenInfo token={token} USD={this.props.USD} key={i} />);
            });
        };
        const mapToTokenUnstaking = (data) => {
            return data.map((token, i) => {
                return (<TokenAddr token={token} SmartContract={this.state.SmartContract} WalletAddress={this.props.WalletAddress} USD={this.props.USD} key={i} />);
            });
        };
        const mapToTopPoolData = (data) => {
            return data.map((pool, i) => {
                return (<TopPool pool={pool} key={i} web3={this.state.web3} uniswap_pair_abi={this.state.uniswap_pair_abi} erc20_abi={this.state.erc20_abi} />)
            })
        };
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var today = new Date();
        var date = monthNames[today.getMonth()] + ' ' + today.getDate() + '-' + today.getFullYear();
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
                                        data={this.state.pieChartData}
                                    />
                                </div>
                                <div className="percentSector">
                                    {mapToTokenPercent(this.state.pieChartData)}
                                </div>
                                <div className="unipair">
                                    {mapToTokenPair(this.state.pieChartData)}
                                </div>
                                <div className="account-totalprofit">
                                    <h5 className="cumulative"> Cumulative Account Profit </h5>
                                    <img src="images/green-up-profit.png" alt="cumulative account profit" width="60px" height="100px" />
                                    <div className="percentage">
                                        {/* 여기에 accumulated profit percentage가 들어가야 함 */}
                                        <h5 className="font-weight-bold">0 %</h5>
                                        <h5>0 ETH | $ 0</h5>

                                    </div>
                                </div>
                                <div className="account-balance">
                                    <h4> Available Balance </h4>
                                    <div className="balance">
                                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>{this.EtherBalance}</span>
                                        <span style={{ fontWeight: "lighter", fontSize: "20px" }}> ETH </span>
                                        <span style={{ fontWeight: "lighter", fontSize: "28px" }}> &nbsp;&nbsp; $ {this.props.UsdBalance}</span>
                                    </div>
                                    <h4> Total Investment </h4>
                                    <div>
                                        {/* Total Investment 대신에 this.tokenData의 tokenSize들의 합을 고려해봐야 함 */}
                                        <h5 className="investment font-weight-bold">{this.TotalInvestment} </h5>
                                        <h5 className="investment font-weight-lighter ">&nbsp;&nbsp; ${this.TotalInvestment * this.props.USD}</h5>

                                    </div>
                                </div>

                            </Row>
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
                                {mapToTokenUnstaking(this.tokenData)}
                            </div>
                            :
                            <div id="unstake_bef">
                                {mapToTestTokenInfo(this.tokenData)}
                            </div>
                        }
                        {/* <Row> */}
                        <div className="list-inline-item" id="trading_row_aft_btns">
                            <div className="gas_speed">
                                <span className="gas_speed_content"> Speed vs. gas cost (ETH / USD) </span><span className="qmark"><AiOutlineQuestionCircle size="25px" color="#073d67" /></span>
                                <GasSlider SetGasSpeed={this.SetGasSpeed} averageGasPrice={this.props.averageGasPrice} />
                                <div>
                                    {this.state.gasCost.toFixed(3)} / $ {(this.props.fastestGasPrice  * 621024 * this.props.USD/ Math.pow(10, 9)).toFixed(3)}
                                </div>
                            </div>
                            <div className="cancelSubmit">
                                <input type="button" className="cancel" value="Cancel" onClick={this.setUnstakeView} />
                                <input type="button" className="withdraw" value="Withdraw" onClick={this.withdraw} />
                            </div>
                        </div>
                        {/* </Row> */}


                    </section>
                </div>
                <div className="recommend_page">
                    <section className="recommend_below">
                        <div style={{ fontSize: '24px', color: '#fafafa', paddingBottom: '32px' }}>
                            Top Performing Liquidity pools as of {date}
                        </div>
                        <Row>
                            <div className="top_performing_pair" >
                                {mapToTopPoolData(this.props.topPoolData)}
                            </div>
                        </Row>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default StakePage;