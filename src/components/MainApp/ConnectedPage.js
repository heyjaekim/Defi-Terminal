import React from 'react';
import { Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { StakeTogglerAnimationBox, GasSpeedAnimationBox, PercentAnimationBox } from "../styles";
import Web3 from "web3";
import { ThemeProvider } from 'styled-components';
import BigNumber from "bignumber.js";

class ConnectedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SmartContract:null,
            SmartContractAddr: "0xe42477108055aA6F904EC8524dCaf85f80D3a3e8", //[MainNet] // "0xe1A712878786A2993C3Ba5a3CABC62423D601F35" EasyDefi[KOVAN]
            SmartContractABI: [{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"CheckTokensFromPair","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyETHWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyTokenWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_ethamount","type":"uint256"},{"internalType":"address","name":"_token","type":"address"}],"name":"GetTokenFromEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt_lp_usd","type":"uint256"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"SetFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"address","name":"_target","type":"address"},{"internalType":"uint256","name":"_amt","type":"uint256"}],"name":"StakeLP","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair_list","type":"address[]"},{"internalType":"uint256[]","name":"_amt_list","type":"uint256[]"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"StakeLPList","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair","type":"address[]"},{"internalType":"uint256[]","name":"_amt","type":"uint256[]"}],"name":"TransferLPList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"addresspayable","name":"target","type":"address"},{"internalType":"uint256","name":"amtLP","type":"uint256"}],"name":"WithdrawLP","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair","type":"address[]"},{"internalType":"uint256[]","name":"_amt","type":"uint256[]"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"WithdrawLPList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadline","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"GetLPTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"GetLPUSDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"}],"name":"GetLPWorth","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"GetResidualBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"LPTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"LPUSDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSlippage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentage_unit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswap_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDC","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
            uniswap_pair_abi:[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
            erc20_abi:[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
            manualTradeSize: 1, /* Stake 상태에서 Manual Trade Size 값을 지정하고 
                                    Allocation Percent 사용하여 (Trade Size * Allocation Percent) => Sub-Size Token을 계산 */
            allocOverflowDet: [],
            autoTradeSize: 0, /* 각 Sub Size Token 값들의 합을 Trade Size에 자동 업데이트하는 state variable*/
            speed: "slow",
            token1: 0,   /*                             */
            token2: 0,   /*                             */
            token3: 0,   /*  Sub Token Size Variables   */
            token4: 0,   /*                             */
            token5: 0,   /*                             */
            percent: 0,  /*                                          */
            percent2: 0, /*                                          */
            percent3: 0, /*  Sub Token Percent Allocation Variables  */
            percent4: 0, /*                                          */
            percent5: 0, /*                                          */
            stake: true, 
            gasSpeed: 0,
            pair1:null,
            pair1_addr:"",
            pair1_token0:null,
            pair1_token1:null,
            pair1_token0_name:"",
            pair1_token1_name:"",
            pair1_token0_img:"",
            pair1_token1_img:"",
            pair2:null,
            pair2_addr:"",
            pair2_token0:null,
            pair2_token1:null,
            pair2_token0_name:"",
            pair2_token1_name:"",
            pair2_token0_img:"",
            pair2_token1_img:"",
            pair3:null,
            pair3_addr:"",
            pair3_token0:null,
            pair3_token1:null,
            pair3_token0_name:"",
            pair3_token1_name:"",
            pair3_token0_img:"",
            pair3_token1_img:""
        };
        this.token1 = props.token1; /*                                                                                                       */
        this.token2 = props.token2; /* Allocation Percent 사용시 Sub Token들의 합이 Trade Size 보다 클 경우 자동 재분배 하기 위한 props variable */
        this.token3 = props.token3; /* (미완성 부분)                                                                                          */
        this.token4 = props.token4; /*                                                                                                       */
        this.SetStake = props.SetStake;
        this.ConnectWallet = props.ConnectWallet;
        this.EtherBalance = props.EtherBalance;
        this.WalletAddress = props.WalletAddress;
        this.UsdBalance = props.USDBalance;
        this.GasSpeed = props.GasSpeed;
        this.SetPercent = props.SetPercent;
        this.SetPercent2 = props.SetPercent2;
        this.SetPercent3 = props.SetPercent3;
        this.SetPercent4 = props.SetPercent4;
        this.SetPercent5 = props.SetPercent5;
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
            SmartContract:smartcontract,
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
            percentBoxs: [
                document.getElementById("percent0"),
                document.getElementById("percent25"),
                document.getElementById("percent50"),
                document.getElementById("percent75"),
                document.getElementById("percent100")
            ],
            percentBoxs2: [
                document.getElementById("percent0_2"),
                document.getElementById("percent25_2"),
                document.getElementById("percent50_2"),
                document.getElementById("percent75_2"),
                document.getElementById("percent100_2")
            ],
            percentBoxs3: [
                document.getElementById("percent0_3"),
                document.getElementById("percent25_3"),
                document.getElementById("percent50_3"),
                document.getElementById("percent75_3"),
                document.getElementById("percent100_3")
            ],
            percentBoxs4: [
                document.getElementById("percent0_4"),
                document.getElementById("percent25_4"),
                document.getElementById("percent50_4"),
                document.getElementById("percent75_4"),
                document.getElementById("percent100_4")
            ],
            percentBoxs5: [
                document.getElementById("percent0_5"),
                document.getElementById("percent25_5"),
                document.getElementById("percent50_5"),
                document.getElementById("percent75_5"),
                document.getElementById("percent100_5")
            ],
        });
    }

    handleDisplayPairImg() {
        document.getElementById("default_pair").style.display = "none";
        document.getElementById("address_pair").style.display = "block";
    }
    handleDisplayDefaultImag() {
        document.getElementById("default_pair").style.display = "block";
        document.getElementById("address_pair").style.display = "none";
    }
    handleDisplayPairImg2() {
        document.getElementById("default_pair2").style.display = "none";
        document.getElementById("address_pair2").style.display = "block";
    }
    handleDisplayDefaultImag2() {
        document.getElementById("default_pair2").style.display = "block";
        document.getElementById("address_pair2").style.display = "none";
    }
    handleDisplayPairImg3() {
        document.getElementById("default_pair3").style.display = "none";
        document.getElementById("address_pair3").style.display = "block";
    }
    handleDisplayDefaultImag3() {
        document.getElementById("default_pair3").style.display = "block";
        document.getElementById("address_pair3").style.display = "none";
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
            return{
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
                this.Invest();
                
            } else {
                console.log('withdraw')
                this.Withdraw();
            }
        } else {
            alert("Connected 'MetaMask' first.");
        }
    };

    Invest = async() => {
        console.log("1 Investing !", this.state.token1, this.state.percent, this.props.gasSpeed);
        console.log("2 Investing !", this.state.token2, this.state.percent2, this.props.gasSpeed);
        console.log("3 Investing !", this.state.token3, this.state.percent3, this.props.gasSpeed);

        let response = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
        let jsonData = await response.json();
        let avgGasPrice = Number(jsonData['average']) / 10;
        let fastGasPrice = Number(jsonData['fastest']) / 10;
        
        // Invest Token
        let wei1 = BigNumber(this.state.token1 * Math.pow(10,18)); //eth to wei
        wei1 = wei1.integerValue();//Math.floor( wei1 );
        
        let wei2 = BigNumber(this.state.token2 * Math.pow(10,18)); //eth to wei
        wei2 = wei2.integerValue(); //Math.floor( wei2 );

        let wei3 = BigNumber(this.state.token3 * Math.pow(10,18)); //eth to wei
        wei3 = wei3.integerValue(); //Math.floor( wei3 );
        
        let pair_list = [];
        let wei_list = [];
        let wei_amount = BigNumber(0);
        if(wei1 != 0){
            pair_list.push(this.state.pair1_addr);
            wei_list.push(wei1.toString());
            wei_amount = wei1.plus(wei_amount);
        }
        if(wei2 != 0){
            pair_list.push(this.state.pair2_addr);
            wei_list.push(wei2.toString());
            wei_amount = wei2.plus(wei_amount);
        }
        if(wei3 != 0){
            pair_list.push(this.state.pair3_addr);
            wei_list.push(wei3.toString());
            wei_amount = wei3.plus(wei_amount);
        }
        
        // Gas Price
        let gasPrice = 0;
        if(this.props.gasSpeed == "slow"){ gasPrice = Math.floor(avgGasPrice/2);}
        else if(this.props.gasSpeed == "medium"){gasPrice = Math.floor(avgGasPrice);} 
        else{gasPrice = Math.floor(fastGasPrice * 1.5);}
        console.log("Gas:",avgGasPrice, fastGasPrice, gasPrice, Math.floor(avgGasPrice/2));
        gasPrice = BigNumber(gasPrice* Math.pow(10,9));

        // Nonce
        const nonce = await this.web3.eth.getTransactionCount(this.state.SmartContractAddr);
        
        //Gas Speed
        let gasSpeed = 0;
        if(this.props.gasSpeed == "slow"){ gasSpeed = 1.0;}else if(this.props.gasSpeed == "medium"){gasSpeed = 1.2;} else{gasSpeed = 1.5;}
        
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
        await this.state.SmartContract.methods.StakeLPList(pair_list, wei_list, 250, Date.now()+2000)
        .estimateGas({
            from:this.props.WalletAddress,
            value:wei_amount
        })
        .then(function(gasAmount){
            console.log(gasAmount)
            gasEstimate = gasAmount;
        })
        .catch(function(error){
            console.log(error)
        });;

        console.log("Invest ", pair_list, wei_list, wei_amount,gasEstimate, gasPrice, nonce);

        let results = await this.state.SmartContract.methods.StakeLPList(pair_list, wei_list, 250, Date.now()+2000)
        .send({
            from:this.props.WalletAddress, 
            value:wei_amount, //송금할 Ether [Wei]
            gas:Math.floor(gasEstimate * gasSpeed), //gas 량
            gasPrice:gasPrice.toString(),
            nonce:nonce//재접속한 횟수
        });

        if(results['status']){
            alert("Success Invest Transaction");
        }
        else{
            alert("Fail Invest Transaction");
        }
    };

    Withdraw = async() => {
        
        console.log("1 Withdrawing !", this.state.token1, this.state.percent, this.props.gasSpeed);
        console.log("2 Withdrawing !", this.state.token2, this.state.percent2, this.props.gasSpeed);
        console.log("3 Withdrawing !", this.state.token3, this.state.percent3, this.props.gasSpeed);
        
        let response = await fetch("https://ethgasstation.info/api/ethgasAPI.json");
        let jsonData = await response.json();
        let avgGasPrice = Number(jsonData['average']) / 10;
        let fastGasPrice = Number(jsonData['fastest']) / 10;

        let pair_list = [];
        let wei_list = [];
        if(this.state.percent != 0){
            let balance1 = BigNumber(await this.state.SmartContract.methods.GetLPTokenBalance(this.state.pair1_addr).call({from:this.props.WalletAddress}));
            balance1 = balance1.multipliedBy(Number(this.state.percent)).dividedBy(100).integerValue();
            pair_list.push(this.state.pair1_addr);
            wei_list.push(balance1.toString());
        }
        if(this.state.percent2 != 0){
            let balance2 = BigNumber(await this.state.SmartContract.methods.GetLPTokenBalance(this.state.pair2_addr).call({from:this.props.WalletAddress}));
            balance2 = balance2.multipliedBy(Number(this.state.percent2)).dividedBy(100).integerValue();
            pair_list.push(this.state.pair2_addr);
            wei_list.push(balance2.toString());
        }
        if(this.state.percent3 != 0){
            let balance3 = BigNumber(await this.state.SmartContract.methods.GetLPTokenBalance(this.state.pair3_addr).call({from:this.props.WalletAddress}));
            balance3 = balance3.multipliedBy(Number(this.state.percent3)).dividedBy(100).integerValue();
            pair_list.push(this.state.pair3_addr);
            wei_list.push(balance3.toString());
        }

        // Gas Price
        let gasPrice = 0;
        if(this.props.gasSpeed == "slow"){ gasPrice = Math.floor(avgGasPrice/2);}
        else if(this.props.gasSpeed == "medium"){gasPrice = Math.floor(avgGasPrice);} 
        else{gasPrice = Math.floor(fastGasPrice * 1.5);}
        gasPrice = BigNumber(gasPrice* Math.pow(10,9));

        const nonce = await this.web3.eth.getTransactionCount(this.state.SmartContractAddr);

        let gasSpeed = 0;
        if(this.props.gasSpeed === "slow"){ gasSpeed = 1.0;}else if(this.props.gasSpeed === "medium"){gasSpeed = 1.2;} else{gasSpeed = 1.5;}

        let gasEstimate = 0;
        await this.state.SmartContract.methods.WithdrawLPList(pair_list, wei_list, 300, Date.now()+2000)
        .estimateGas({
            from:this.props.WalletAddress
        })
        .then(function(gasAmount){
            console.log(gasAmount)
            gasEstimate=gasAmount;
        })
        .catch(function(error){
            console.log(error)
        });

        console.log("Withdraw ", pair_list, wei_list, nonce, gasEstimate, gasPrice);
        
        let results = await this.state.SmartContract.methods.WithdrawLPList(pair_list, wei_list, 300,Date.now()+2000)
        .send({
            from:this.props.WalletAddress, 
            value:0,
            gas:Math.floor(gasEstimate * gasSpeed), //gas 량
            gasPrice:gasPrice.toString(),
            nonce:nonce
        });

        if(results['status']){
            alert("Success Withdraw Transaction");
        }
        else{
            alert("Fail Withdraw Transaction");
        }

    };

    handlePairChange =  async(event) => {
        //this.web3.eth.Contract
        try{
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.state.uniswap_pair_abi, pair_addr);
            let token0_addr = await PairContract.methods.token0().call();
            let token1_addr = await PairContract.methods.token1().call();
            console.log("handlePairChange", token0_addr, token1_addr);

            let token0 = new this.web3.eth.Contract(this.state.erc20_abi, token0_addr);
            let token1 = new this.web3.eth.Contract(this.state.erc20_abi, token1_addr);
            let token0_name = await token0.methods.symbol().call();
            // if(token0_name.includes("Wrapped ")){token0_name = token0_name.replace("Wrapped ", "W");}
            let token1_name = await token1.methods.symbol().call();
            console.log("handlePairChange", token0_name, token1_name);
            
            let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png"
            let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png"
            this.setState({
                pair1_addr: pair_addr,
                pair1:PairContract,
                pair1_token0:token0,
                pair1_token1:token1,
                pair1_token0_name:token0_name,
                pair1_token1_name:token1_name,
                pair1_token0_img:token0_img,
                pair1_token1_img:token1_img
            });
        }catch(event){
            this.handleDisplayDefaultImag();
            console.log("Display Default Pair Image")
            this.setState({
                pair1_addr: null,
                pair1:null,
                pair1_token0:null,
                pair1_token1:null,
                pair1_token0_name:null,
                pair1_token1_name:null,
                pair1_token0_img:null,
                pair1_token1_img:null
            })
        }
    };
    handlePairChange2 =  async(event) => {
        //this.web3.eth.Contract
        try{
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.state.uniswap_pair_abi, pair_addr);
            let token0_addr = await PairContract.methods.token0().call();
            let token1_addr = await PairContract.methods.token1().call();
            console.log("handlePairChange", token0_addr, token1_addr);

            let token0 = new this.web3.eth.Contract(this.state.erc20_abi, token0_addr);
            let token1 = new this.web3.eth.Contract(this.state.erc20_abi, token1_addr);
            let token0_name = await token0.methods.symbol().call();
            // if(token0_name.includes("Wrapped ")){token0_name = token0_name.replace("Wrapped ", "W");}
            let token1_name = await token1.methods.symbol().call();
            console.log("handlePairChange", token0_name, token1_name);
            
            let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png"
            let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png"
            this.setState({
                pair2_addr: pair_addr,
                pair2:PairContract,
                pair2_token0:token0,
                pair2_token1:token1,
                pair2_token0_name:token0_name,
                pair2_token1_name:token1_name,
                pair2_token0_img:token0_img,
                pair2_token1_img:token1_img
            });
        }catch(event){
            this.handleDisplayDefaultImag2();
            console.log("Display Default Pair Image")
            this.setState({
                pair2_addr: null,
                pair2:null,
                pair2_token0:null,
                pair2_token1:null,
                pair2_token0_name:null,
                pair2_token1_name:null,
                pair2_token0_img:null,
                pair2_token1_img:null
            })
        }
    };
    handlePairChange3 =  async(event) => {
        //this.web3.eth.Contract
        try{
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.state.uniswap_pair_abi, pair_addr);
            let token0_addr = await PairContract.methods.token0().call();
            let token1_addr = await PairContract.methods.token1().call();
            console.log("handlePairChange", token0_addr, token1_addr);

            let token0 = new this.web3.eth.Contract(this.state.erc20_abi, token0_addr);
            let token1 = new this.web3.eth.Contract(this.state.erc20_abi, token1_addr);
            let token0_name = await token0.methods.symbol().call();
            // if(token0_name.includes("Wrapped ")){token0_name = token0_name.replace("Wrapped ", "W");}
            let token1_name = await token1.methods.symbol().call();
            console.log("handlePairChange", token0_name, token1_name);
            
            let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png"
            let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png"
            this.setState({
                pair3_addr: pair_addr,
                pair3:PairContract,
                pair3_token0:token0,
                pair3_token1:token1,
                pair3_token0_name:token0_name,
                pair3_token1_name:token1_name,
                pair3_token0_img:token0_img,
                pair3_token1_img:token1_img
            });
        }catch(event){
            this.handleDisplayDefaultImag3();
            console.log("Display Default Pair Image")
            this.setState({
                pair3_addr: null,
                pair3:null,
                pair3_token0:null,
                pair3_token1:null,
                pair3_token0_name:null,
                pair3_token1_name:null,
                pair3_token0_img:null,
                pair3_token1_img:null
            })
        }
    };

    /* Handle Token Size Start
    Sub ETH Token Size를 나머지 Sub ETH Token Size들과 합하여 Trade Size(ETH)에 보이도록 하는 함수 */
    handleToken1Change = async(evt) => {
        evt.preventDefault();
        let token1 = Number(evt.target.value);
        console.log("handleToken1Change", token1);
        let trade_size = token1+this.state.token2+this.state.token3+this.state.token4+this.state.token5
        this.setState({
            token1:token1,
            autoTradeSize:trade_size
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
            gasSpeed: 0}, function () {
                console.log(this.state.gasSpeed)});
    };
    handleGasSpeedMedium = evt => {
        this.setState({
            gasSpeed: 1
            }, function () {console.log(this.state.gasSpeed)});
    };
    handleGasSpeedFast = evt => {
        this.setState({
            gasSpeed: 2
            }, function () {console.log(this.state.gasSpeed)});
    };

    /* percentAnimation 함수 안에서 실행되어 Sub Token Size로 Allocate하는 함수 */
    /* Total Allocated Size가 Total Trade Size를 넘는 경우 Focusing하고있는 Sub Token Size을 뺀 나머지 값을 3등분하여 배분 */
    allocToSubTokenSize = () => {
        this.state.allocOverflowDet.push(this.state.token1);
        this.setState((state) => { return {token1: state.manualTradeSize * (state.percent/100)}
        });
    };
    allocToSubTokenSize2 = () => {
        this.state.allocOverflowDet.push(this.state.token2)
        this.setState((state) => { return {token2: state.manualTradeSize * (state.percent2/100)}
        });
    };
    allocToSubTokenSize3 = () => {
        this.state.allocOverflowDet.push(this.state.token3)
        this.setState((state) => { return {token3: state.manualTradeSize * (state.percent3/100)}
        });
    };
    allocToSubTokenSize4 = () => {
        this.state.allocOverflowDet.push(this.state.token4)
        this.setState((state) => { return {token4: state.manualTradeSize * (state.percent4/100)}
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

    /* Sub Token Percentage Allocation Tab Animagtion */
    percentAnimation(num, ele) {
        this.state.percentBoxs.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent: 0 });
            document.getElementById("percent_animation_box").style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent: 25 });
            document.getElementById("percent_animation_box").style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent: 50 });
            document.getElementById("percent_animation_box").style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent: 75 });
            document.getElementById("percent_animation_box").style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent: 100 });
            document.getElementById("percent_animation_box").style.left = "328px";
        }
        this.allocToSubTokenSize();
        ele.style.color = "#fff";
    };
    percentAnimation2(num, ele) {
        this.state.percentBoxs2.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent2: 0 });
            document.getElementById("percent_animation_box2").style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent2: 25 });
            document.getElementById("percent_animation_box2").style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent2: 50 });
            document.getElementById("percent_animation_box2").style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent2: 75 });
            document.getElementById("percent_animation_box2").style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent2: 100 });
            document.getElementById("percent_animation_box2").style.left = "328px";
        }
        this.allocToSubTokenSize2();
        ele.style.color = "#fff";
    };
    percentAnimation3(num, ele) {
        this.state.percentBoxs3.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent3: 0 });
            document.getElementById("percent_animation_box3").style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent3: 25 });
            document.getElementById("percent_animation_box3").style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent3: 50 });
            document.getElementById("percent_animation_box3").style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent3: 75 });
            document.getElementById("percent_animation_box3").style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent3: 100 });
            document.getElementById("percent_animation_box3").style.left = "328px";
        }
        this.allocToSubTokenSize3();
        ele.style.color = "#fff";
    };
    percentAnimation4(num, ele) {
        this.state.percentBoxs4.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent4: 0 });
            document.getElementById("percent_animation_box4").style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent4: 25 });
            document.getElementById("percent_animation_box4").style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent4: 50 });
            document.getElementById("percent_animation_box4").style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent4: 75 });
            document.getElementById("percent_animation_box4").style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent4: 100 });
            document.getElementById("percent_animation_box4").style.left = "328px";
        }
        this.allocToSubTokenSize4();
        ele.style.color = "#fff";
    };
    /*
    percentAnimation5(num, ele) {
        this.state.percentBoxs5.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent5: 0 });
            document.getElementById("percent_animation_box5").style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent5: 25 });
            document.getElementById("percent_animation_box5").style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent5: 50 });
            document.getElementById("percent_animation_box5").style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent5: 75 });
            document.getElementById("percent_animation_box5").style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent5: 100 });
            document.getElementById("percent_animation_box5").style.left = "328px";
        }
        // this.allocToSubTokenSize5();
        ele.style.color = "#fff";
    };*/

    render() {
        // console.log(this.state.allocOverflowDet);
        return (
            <React.Fragment>
                <div className="home">
                    <section className="home-attr" id="home">
                        <Row>
                            <div className="logo-place">
                                <Link className="navbar-brand" to="/">
                                    <img src="images/Logo_White.png" alt="" height="57px" width="281.8px" />
                                </Link>
                            </div>
                            <div className="basic-info-tab">
                                <StakeTogglerAnimationBox id="stakebox"></StakeTogglerAnimationBox>
                                <button href="#" className="active" value={true}
                                    onClick={(e) => { 
                                        this.SetStake(true); 
                                        this.setDetailAreaStake(); 
                                        this.StakeTogglerAnimation(true, e.target); }}>Stake</button>
                                <button href="#" className="disable" value={false}
                                    onClick={(e) => { 
                                        this.SetStake(false); 
                                        this.setDetailAreaUnstake(); 
                                        this.StakeTogglerAnimation(false, e.target); }}>Unstake</button>
                            </div>
                        </Row>

                        <Row>
                            <div id="connect_your_wallet">
                                <div className="balance-eth">
                                    <div className="mt--16">
                                        <button type="button" className="connect-account" onClick={() => {
                                            this.setDetailArea();
                                            this.ConnectWallet();}}>
                                                <h5>Connect Your Wallet</h5>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div id="detail_select_area" style={{ display: 'none' }}>
                                <div className="balance-eth">
                                    <div className="mt--16 ml--33">
                                        <h5 className="available">Available Balance</h5>
                                        <h3 className="available-eth">{this.props.EtherBalance} ETH</h3>
                                        <h5 className="available-dollar">$ {this.props.UsdBalance}</h5>
                                    </div>
                                </div>
                            </div>
                            <div id="detail_select_area2" style={{ display: 'none' }}>
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
                                    <h5 className="context1-unstake" id="context1_unstake">
                                        Total (ETH)
                                    </h5>
                                    <h5 className="context2" id="context2_stake">
                                        Wallet Address
                                    </h5>
                                    <h5 className="context2-unstake" id="context2_unstake">
                                        Wallet Address
                                    </h5>
                                    <h5 className="context3" id="context3_stake">
                                        Faster speed costs more gas
                                    </h5>
                                    <h5 className="context3-unstake" id="context3_unstake">
                                        Faster speed costs more gas
                                    </h5>
                                </Row>
                            </div>
                            <div className="text-information-area">
                                <Row>
                                    <div className="trade-size" id="stake_trade">
                                        {/* <input className="stake_tradesize_manual" type="number" value={this.state.manualTradeSize} 
                                            onChange={this.handleManualTradeSize}/> */}
                                        <input className="stake_tradesize_manual" type="number" value={this.state.autoTradeSize} />
                                        {/* <input className="stake_tradesize_auto" type="number" value={this.state.result} /> */}
                                    </div>
                                    <div className="trade-size-unstake" id="unstake_trade">
                                        <input className="unstake_tradesize_auto" type="number" value={this.state.autoTradeSize} />
                                    </div>
                                    <div className="wallet-address" id="stake_wallet">
                                        <input className="input-wallet-address" type="text" value={this.props.WalletAddress} readOnly />
                                    </div>
                                    <div className="wallet-address-unstake" id="unstake_wallet">
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
                        <Row>
                            <div className="wallet-connected">
                                <div className="trading-rows" id="trading_rows_stake">
                                    <Row>
                                        <h5 className="context1">
                                            Liquidity Pools
                                            </h5>
                                        <h5 className="context2">
                                            Investment Amount
                                            </h5>
                                        <h5 className="context3">
                                            Allocation
                                            </h5>
                                        <h5 className="context3">
                                            Address
                                            </h5>
                                    </Row>
                                </div>
                                <div className="trading-rows-unstake" id="trading_rows_unstake">
                                    <Row>
                                        <h5 className="context1">
                                            Liquidity Pools
                                            </h5>
                                        <h5 className="context2">
                                            LP Token Amount
                                            </h5>
                                        <h5 className="context3">
                                            Withdrawal Percentage
                                            </h5>
                                        <h5 className="context3">
                                            Address
                                            </h5>
                                    </Row>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="eth-usdt-row">
                                <div className="display_address_pair" id="address_pair">
                                    <button className="eth-icon"><img src={this.state.pair1_token0_img} alt=""></img></button>
                                    <button className="dollar-icon"><img src={this.state.pair1_token1_img}alt=""></img></button>
                                    <div className="eth_usdt_pair">
                                        <h5>  {this.state.pair1_token0_name} - {this.state.pair1_token1_name} </h5>
                                    </div>
                                </div>
                                <div className="display_default_pair" id="default_pair">
                                    {/* <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button> */}
                                    {/* <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button> */}
                                    <div className="eth_usdt_pair">
                                        <h5> </h5>
                                    </div>
                                </div>
                                <div className="eth_token_size">
                                    <div className="token_size">
                                        <input className="input-each-token-size1" type="number" name="token1" 
                                                value={this.state.token1} placeholder='0' onChange={this.handleToken1Change} />
                                    </div>
                                    <div className="percent_area">
                                        <PercentAnimationBox id="percent_animation_box"></PercentAnimationBox>
                                        <button
                                            type="button"
                                            id="percent0"
                                            onClick={(e) => {
                                                this.SetPercent(0);
                                                this.percentAnimation(0, e.target);
                                            }}
                                        >
                                            0%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent25"
                                            onClick={(e) => {
                                                this.SetPercent(25);
                                                this.percentAnimation(25, e.target);
                                            }}
                                        >
                                            25%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent50"
                                            onClick={(e) => {
                                                this.SetPercent(50);
                                                this.percentAnimation(50, e.target);
                                            }}
                                        >
                                            50%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent75"
                                            onClick={(e) => {
                                                this.SetPercent(75);
                                                this.percentAnimation(75, e.target);
                                            }}
                                        >
                                            75%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent100"
                                            onClick={(e) => {
                                                this.SetPercent(100);
                                                this.percentAnimation(100, e.target);
                                            }}
                                        >
                                            100%
                                            </button>
                                    </div>
                                    <div className="address">
                                        <input className="address-input" type="text" name="" onChange={(e)=>{this.handleDisplayPairImg(); this.handlePairChange(e);}}/>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="eth-usdt-row">
                                <div className="display_address_pair" id="address_pair2">
                                    <button className="eth-icon"><img src={this.state.pair2_token0_img} alt=""></img></button>
                                    <button className="dollar-icon"><img src={this.state.pair2_token1_img}alt=""></img></button>
                                    <div className="eth_usdt_pair">
                                        <h5>  {this.state.pair2_token0_name} - {this.state.pair2_token1_name} </h5>
                                    </div>
                                </div>
                                <div className="display_default_pair" id="default_pair2">
                                    {/* <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button> */}
                                    {/* <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button> */}
                                    <div className="eth_usdt_pair">
                                        <h5> </h5>
                                    </div>
                                </div>
                                <div className="eth_token_size">
                                    <div className="token_size">
                                        <input className="input-each-token-size1" type="number" name="token2" 
                                            value={this.state.token2} placeholder="0" onChange={this.handleToken2Change} />
                                    </div>
                                    <div className="percent_area">
                                        <PercentAnimationBox id="percent_animation_box2"></PercentAnimationBox>
                                        <button
                                            type="button"
                                            id="percent0_2"
                                            onClick={(e) => {
                                                this.SetPercent2(0);
                                                this.percentAnimation2(0, e.target);
                                            }}
                                        >
                                            0%
                                                </button>
                                        <button
                                            type="button"
                                            id="percent25_2"
                                            onClick={(e) => {
                                                this.SetPercent2(25);
                                                this.percentAnimation2(25, e.target);
                                            }}
                                        >
                                            25%
                                                </button>
                                        <button
                                            type="button"
                                            id="percent50_2"
                                            onClick={(e) => {
                                                this.SetPercent2(50);
                                                this.percentAnimation2(50, e.target);
                                            }}
                                        >
                                            50%
                                                </button>
                                        <button
                                            type="button"
                                            id="percent75_2"
                                            onClick={(e) => {
                                                this.SetPercent2(75);
                                                this.percentAnimation2(75, e.target);
                                            }}
                                        >
                                            75%
                                                </button>
                                        <button
                                            type="button"
                                            id="percent100_2"
                                            onClick={(e) => {
                                                this.SetPercent2(100);
                                                this.percentAnimation2(100, e.target);
                                            }}
                                        >
                                            100%
                                                </button>
                                    </div>
                                    <div className="address">
                                        <input className="address-input" type="text" name="" onChange={(e)=>{this.handleDisplayPairImg2(); this.handlePairChange2(e);}}/>
                                    </div>
                                </div>
                            </div>
                        </Row>               
                        <Row>
                            <div className="eth-usdt-row">
                                <div className="display_address_pair" id="address_pair3">
                                    <button className="eth-icon"><img src={this.state.pair3_token0_img} alt=""></img></button>
                                    <button className="dollar-icon"><img src={this.state.pair3_token1_img}alt=""></img></button>
                                    <div className="eth_usdt_pair">
                                        <h5>  {this.state.pair3_token0_name} - {this.state.pair3_token1_name} </h5>
                                    </div>
                                </div>
                                <div className="display_default_pair" id="default_pair3">
                                    {/* <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button> */}
                                    {/* <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button> */}
                                    <div className="eth_usdt_pair">
                                        <h5> </h5>
                                    </div>
                                </div>
                                <div className="eth_token_size">
                                    <div className="token_size">
                                        <input className="input-each-token-size1" type="number" name="token3" 
                                            value={this.state.token3} placeholder="0" onChange={this.handleToken3Change} />
                                    </div>
                                    <div className="percent_area">
                                        <PercentAnimationBox id="percent_animation_box3"></PercentAnimationBox>
                                        <button
                                            type="button"
                                            id="percent0_3"
                                            onClick={(e) => {
                                                this.SetPercent3(0);
                                                this.percentAnimation3(0, e.target);
                                            }}
                                        >
                                            0%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent25_3"
                                            onClick={(e) => {
                                                this.SetPercent3(25);
                                                this.percentAnimation3(25, e.target);
                                            }}
                                        >
                                            25%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent50_3"
                                            onClick={(e) => {
                                                this.SetPercent3(50);
                                                this.percentAnimation3(50, e.target);
                                            }}
                                        >
                                            50%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent75_3"
                                            onClick={(e) => {
                                                this.SetPercent3(75);
                                                this.percentAnimation3(75, e.target);
                                            }}
                                        >
                                            75%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent100_3"
                                            onClick={(e) => {
                                                this.SetPercent3(100);
                                                this.percentAnimation3(100, e.target);
                                            }}
                                        >
                                            100%
                                            </button>
                                    </div>
                                    <div className="address">
                                        <input className="address-input" type="text" name="" onChange={(e)=>{this.handleDisplayPairImg3(); this.handlePairChange3(e);}}/>
                                    </div>
                                </div>
                            </div>
                        </Row>
                        {/*
                        <Row>
                            <div className="eth-usdt-row">
                                <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button>
                                <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button>
                                <div className="eth_usdt_pair">
                                    <h5> ETH - USDT </h5>
                                </div>
                                <div className="eth-token-size">
                                    <div className="token-size">
                                        <input className="input-each-token-size1" type="number" name="token4" value={this.state.token4} 
                                                placeholder="0" onChange={this.handleToken4Change} />
                                    </div>
                                    <div className="percent_area">
                                        <PercentAnimationBox id="percent_animation_box4"></PercentAnimationBox>
                                        <button
                                            type="button"
                                            id="percent0_4"
                                            onClick={(e) => {
                                                this.SetPercent4(0);
                                                this.percentAnimation4(0, e.target);
                                            }}
                                        >
                                            0%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent25_4"
                                            onClick={(e) => {
                                                this.SetPercent4(25);
                                                this.percentAnimation4(25, e.target);
                                            }}
                                        >
                                            25%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent50_4"
                                            onClick={(e) => {
                                                this.SetPercent4(50);
                                                this.percentAnimation4(50, e.target);
                                            }}
                                        >
                                            50%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent75_4"
                                            onClick={(e) => {
                                                this.SetPercent4(75);
                                                this.percentAnimation4(75, e.target);
                                            }}
                                        >
                                            75%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent100_4"
                                            onClick={(e) => {
                                                this.SetPercent4(100);
                                                this.percentAnimation4(100, e.target);
                                            }}
                                        >
                                            100%
                                            </button>
                                    </div>
                                    <div className="address">
                                        <input className="address-input" type="text" name="" />
                                    </div>
                                </div>
                            </div>

                        </Row> */}
                        {/* <Row>
                            <div className="eth-usdt-row">
                                <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button>
                                <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button>
                                <div className="eth-usdt-image-after">
                                    <h5> ETH - USDT </h5>
                                    <div className="token-size">
                                        <input className="input-each-token-size1" type="number" name="token5" value={this.state.token5} placeholder="0" onChange={this.handleToken5Change} />
                                    </div>
                                    <div className="percent_area">
                                        <PercentAnimationBox id="percent_animation_box5"></PercentAnimationBox>
                                        <button
                                            type="button"
                                            id="percent0_5"
                                            onClick={(e) => {
                                                this.SetPercent5(0);
                                                this.percentAnimation5(0, e.target);
                                            }}
                                        >
                                            0%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent25_5"
                                            onClick={(e) => {
                                                this.SetPercent5(25);
                                                this.percentAnimation5(25, e.target);
                                            }}
                                        >
                                            25%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent50_5"
                                            onClick={(e) => {
                                                this.SetPercent5(50);
                                                this.percentAnimation5(50, e.target);
                                            }}
                                        >
                                            50%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent75_5"
                                            onClick={(e) => {
                                                this.SetPercent5(75);
                                                this.percentAnimation5(75, e.target);
                                            }}
                                        >
                                            75%
                                            </button>
                                        <button
                                            type="button"
                                            id="percent100_5"
                                            onClick={(e) => {
                                                this.SetPercent5(100);
                                                this.percentAnimation5(100, e.target);
                                            }}
                                        >
                                            100%
                                            </button>
                                    </div>
                                    <div className="address">
                                        <input className="address-input" type="text" name="" />
                                    </div>
                                </div>
                            </div>

                        </Row> */}

                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default ConnectedPage;