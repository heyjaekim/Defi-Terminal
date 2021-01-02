import React from "react";
import ConnectedPage from "./components/MainApp/ConnectedPage.js";
import Web3 from "web3";

class Defipage extends React.Component {
    constructor(props) {
        super(props)
        // var handler = this.handler.bind(this)
        this.state = {
            SmartContract:null,
            SmartContractAddr: "0x9e3d84D022430117343b613ba516F9432e778eD7", //[MainNet] // "0xe1A712878786A2993C3Ba5a3CABC62423D601F35" EasyDefi[KOVAN]
            SmartContractABI: [{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"CheckTokensFromPair","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyETHWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"emergencyTokenWithdrawal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"mode","type":"string"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"address","name":"pair","type":"address"},{"indexed":false,"internalType":"uint256","name":"amt_lp_usd","type":"uint256"}],"name":"Log","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogResidual","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"SetFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"address","name":"_target","type":"address"}],"name":"StakeLP","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair_list","type":"address[]"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"StakeLPList","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair","type":"address[]"},{"internalType":"uint256[]","name":"_amt","type":"uint256[]"}],"name":"TransferLPList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"addresspayable","name":"target","type":"address"},{"internalType":"uint256","name":"amtLP","type":"uint256"}],"name":"WithdrawLP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_pair","type":"address[]"},{"internalType":"uint256[]","name":"_amt","type":"uint256[]"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"},{"internalType":"uint256","name":"_deadline","type":"uint256"}],"name":"WithdrawLPList","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"DAI","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deadline","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fee_unit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"GetLPTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"}],"name":"GetLPUSDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_max_slippage","type":"uint256"}],"name":"GetLPWorth","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"GetPairFromTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"LPTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"LPUSDBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSlippage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"percentage_unit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniswap_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}],
            EtherBalance: 1,
            USDBalance:0,
            WalletAddress: "Default Example Address",
            IsConnectedMetaMask: false,
            gasSpeed: "slow",
            token1: 0,
            token2: 0,
            token3: 0,
            token4: 0,
            Stake:true
        };
    };

    /* 첫 페이지 시작 시 자동으로 기본 정보 업데이트 실행 */
    async componentDidMount() {
        await this.UpdateInfo();
    };
    
    /* ConnectedPage.js에서 User가 update state할 때마다 UpdateInfo 비동기 함수 실행 */ 
    UpdateInfo = async () => {

        // 비동기 MetaMask(Web3) 연결
        await this.ConnectMetaMask();
        // Get MetaMask Ether Balance
        let accounts;
        try {
            accounts = await this.web3.eth.getAccounts();
            let etherBalance = await this.web3.eth.getBalance(accounts[0]);
            etherBalance = etherBalance / 1e18;
            console.log("ETH Balance: " + etherBalance);
            let smartcontract = new this.web3.eth.Contract(this.state.SmartContractABI, this.state.SmartContractAddr);
            let usd = await smartcontract.methods.USD().call();
            console.log("ETH USD: " , usd);
            this.setState({
                SmartContract:smartcontract,
                EtherBalance: etherBalance,
                USDBalance : etherBalance*Number(usd),
                IsConnectedMetaMask: true,
                WalletAddress: accounts[0],
            })

        } catch (err) {
            console.log(err);
        }
        
       

       
    };

    /* 첫 페이지 시작 시 MetaMask에 연결 */
    ConnectMetaMask = async () => {
        if (window.ethereum) {
            console.log(" MetaMask 연결 최신 방법 ");
            this.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.log(`User denied account access error : ${error}`);
            }
        } else if (window.web3) {
            console.log(" MetaMask 연결 이전 방법 ");
            try {
                this.web3 = new Web3(Web3.currentProvider);
            } catch (error) {
                console.log(`Cannot connect Metamask : ${error}`);
            }
        } else {
            console.log("ERORR! MetaMask not installed");
        }
    };

    /* ConnectedPage.js에서 "Connect Your Wallet" 버튼 누를시 실행 */
    ConnectWallet = async () => {
        this.UpdateInfo();
        console.log("Connect Your Wallet (/src/Defipage.js) ")
    };

    SetStake = async (status) => {
        // Stake 모드가 선택되면 Stake:true / Unstake 모드는 Stake:false
        if(status){
            console.log("Stake Mode is Selected");
            this.setState({ Stake : true });
        }
        else{
            console.log("Unstake Mode is Selected");
            this.setState({ Stake : false });
        }
    };

    /* SetPercent async Start */
    /* Allocation 파트에서 보이는 Percentage들이 선택될때마다 Trade Size * Percentage = Sub Size 형태로 만들 예정 */
    SetPercent = async (allocatedPercent) => {
        const percent = allocatedPercent
        console.log("SetPercent Percentage: " + percent + "%");
    };
    SetPercent2 = async (allocatedPercent) => {
        const percent = allocatedPercent
        console.log("SetPercent Percentage2: " + percent + "%");
    };
    SetPercent3 = async (allocatedPercent) => {
        const percent = allocatedPercent
        console.log("SetPercent Percentage3: " + percent + "%");
    };
    SetPercent4 = async (allocatedPercent) => {
        const percent = allocatedPercent
        console.log("SetPercent Percentage4: " + percent + "%");
    };
    SetPercent5 = async (allocatedPercent) => {
        const percent = allocatedPercent
        console.log("SetPercent Percentage5: " + percent + "%");
    };
    /* SetPercent async End */
    
    
    /* User가 Gas Speed를 선택한 후 gasSpeed State를 업데이트 */
    GasSpeed = async (speed) => {
        this.setState({ 
            gasSpeed: speed}, function () {
                console.log("Gas Speed gasSpeed: " + this.state.gasSpeed)});
    };

    /* User가 Submit 버튼을 누른 후 실행 함수 */
    SubmitSetTrades = async (isStake) => {
        if (this.state.IsConnectedMetaMask) {
            if (isStake) {
                console.log('isStake is proceeding')
                this.Invest();
            } else {
                this.Withdraw();
            }
        } else {
            alert("Connected 'MetaMask' first.");
        }
    };

    Invest = async() => {
        console.log("Start Investing !", this.state.token1, this.props.token1);
    };

    Withdraw = async() => {
        console.log("Start Withdrawing !")
    };


    render() {
        return (
            <React.Fragment>

                {/* ConnectedSection */}
                <ConnectedPage
                    EtherBalance={this.state.EtherBalance}
                    UsdBalance={this.state.USDBalance}
                    WalletAddress={this.state.WalletAddress}
                    token1={this.state.token1}
                    token2={this.state.token2}
                    token3={this.state.token3}
                    token4={this.state.token4}
                    SetStake={this.SetStake}
                    SetPercent={this.SetPercent}
                    SetPercent2={this.SetPercent2}
                    SetPercent3={this.SetPercent3}
                    SetPercent4={this.SetPercent4}
                    SetPercent5={this.SetPercent5}
                    GasSpeed={this.GasSpeed}
                    ConnectWallet={this.ConnectWallet}
                    SubmitSetTrades={this.SubmitSetTrades}
                    IsConnectedMetaMask={this.state.IsConnectedMetaMask}
                    IsStake = {this.state.Stake}
                    gasSpeed = {this.state.gasSpeed}
                />

            </React.Fragment>
        );
    }
}

export default Defipage;
