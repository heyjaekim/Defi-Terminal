import React from "react";
import Navbar from './components/Navbar.js';
import ConnectedPage from "./MainApp/ConnectedPage_new.js";
import StakePage from './MainApp/StakePage.js';
import PortfolioPage from "./MainApp/PortfolioPage.js";
import Web3 from "web3";
// import axios from "axios";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './components/css/Navbar.css';
import './components/css/InitialPage.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    // var handler = this.handler.bind(this)
    this.state = {
      loggedIn: false,
      SmartContract: null,
      SmartContractAddr: "0x65C025412411DB5E6ff1F8F51D767078FB07f451", //[MainNet] // "0xe1A712878786A2993C3Ba5a3CABC62423D601F35" EasyDefi[KOVAN]
      SmartContractABI: [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amt_lp_usd", "type": "uint256" }], "name": "Log", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "CheckTokensFromPair", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "DAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetLPTokenBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetLPUSDBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }], "name": "GetLPWorth", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }], "name": "GetResidualBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_ethamount", "type": "uint256" }, { "internalType": "address", "name": "_token", "type": "address" }], "name": "GetTokenFromEth", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "LPTokenBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "LPUSDBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_fee", "type": "uint256" }], "name": "SetFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "address", "name": "_target", "type": "address" }, { "internalType": "uint256", "name": "_amt", "type": "uint256" }], "name": "StakeLP", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair_list", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt_list", "type": "uint256[]" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "StakeLPList", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt", "type": "uint256[]" }], "name": "TransferLPList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "USD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDC", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDT", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_pair", "type": "address" }, { "internalType": "addresspayable", "name": "target", "type": "address" }, { "internalType": "uint256", "name": "amtLP", "type": "uint256" }], "name": "WithdrawLP", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_pair", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amt", "type": "uint256[]" }, { "internalType": "uint256", "name": "_max_slippage", "type": "uint256" }, { "internalType": "uint256", "name": "_deadline", "type": "uint256" }], "name": "WithdrawLPList", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "deadline", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "emergencyETHWithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "emergencyTokenWithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "isOwner", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "maxSlippage", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "percentage_unit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswap_fee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }],
      EtherBalance: 1,
      TotalInvestment: 0,
      TotalInvestmentUSD: 0,
      USDBalance: 0,
      WalletAddress: "Default Example Address",
      IsConnectedMetaMask: false,
      Stake: true,
      sidebar: false,
      tokenData: [],
      // 테스트용 데이터
      topPoolData: [
        {
          pair_addr: '0xB10cf58E08b94480fCb81d341A63295eBb2062C2',
          pair_token0_name: 'ETH',
          pair_token1_name: 'USDT',
          pair_token0_img: './images/eth_icon.png',
          pair_token1_img: './images/dollar_icon.png',
        },
        {
          pair_addr: '0xd4d9A707C2943f59525a9de00D2967A99f8B5f0a',
          pair_token0_name: 'USDT',
          pair_token1_name: 'ETH',
          pair_token0_img: './images/dollar_icon.png',
          pair_token1_img: './images/eth_icon.png',

        }
      ],
    };
  };

  /* 첫 페이지 시작 시 자동으로 기본 정보 업데이트 실행 */
  async componentDidMount() {
    await this.UpdateInfo();
    await this.handleConnectYourWallet();
  }

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
      console.log("ETH USD: ", usd);
      this.setState({
        SmartContract: smartcontract,
        EtherBalance: parseFloat(etherBalance).toFixed(8),
        USDBalance: parseFloat(etherBalance * Number(usd)).toFixed(2),
        IsConnectedMetaMask: true,
        WalletAddress: accounts[0],
      })

    } catch (err) {
      console.log(err);
    }

  }

  /* 첫 페이지 시작 시 MetaMask에 연결 */
  ConnectMetaMask = async () => {
    if (window.ethereum) {
      console.log(" MetaMask 연결 최신 방법 ");
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        this.setState({ loggedIn: true });
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
  }

  /* ConnectedPage.js에서 "Connect Your Wallet" 버튼 누를시 실행 */
  ConnectWallet = async () => {
    this.UpdateInfo();
    console.log("Connect Your Wallet (/src/Defipage.js) ")
  }

  SetStake = async (status) => {
    // Stake 모드가 선택되면 Stake:true / Unstake 모드는 Stake:false
    if (status) {
      console.log("Stake Mode is Selected");
      this.setState({ Stake: true });
    }
    else {
      console.log("Unstake Mode is Selected");
      this.setState({ Stake: false });
    }
  }

  /* Top 3 performin liquidity address를 받아서 StakePage와 Portfolio Page에 반환하기 위한 함수 */
  getTopPoolData = async (data) => {
    /* top 3 liquidity address를 받아 와야함   */

    this.setState({
      topPerfLqdty: data
    });
  }

  /* ConnectedPage_new에서 받아오는 token data를 App.js this.state.tokenData에 업데이트 */
  SetTokenData = async (data) => {
    this.setState({
      tokenData: data
    }, function () {
      // console.log('Token Data: ' + this.state.tokenData[0]['tokenSize'])
      // console.log('Token Data: ' + this.state.tokenData[1]['pair_addr'])
    });
  }

  /* Connect Your Wallet 누르면 initial page를 가리고 stake page가 나오도록 */
  handleConnectYourWallet = async () => {
    if (this.state.loggedIn) {
      this.setState({ loggedIn: true });
      document.getElementById("initial_bef").style.display = "none";
      document.getElementById("initial_aft").style.display = "block";
    } else {
      document.getElementById("initial_bef").style.display = "block";
      document.getElementById("initial_aft").style.display = "none";
    }
  }

  render() {
    console.log("from StakePage.js update tokenData: ", this.state.tokenData);
    return (
      <React.Fragment>
        <div className="initial" id="initial_bef">
          <section className="portfolioHomeAttr" >
            <div className="connectbox">
              <input type="button" value="Connect Your Wallet" onClick={() => { this.ConnectMetaMask(); this.handleConnectYourWallet(); }} />
            </div>
          </section>
        </div>
        <div className="initial-aft" id="initial_aft">

          <BrowserRouter basename={'/'} >
            <Navbar WalletAddress={this.state.WalletAddress} />
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`}
                render={props => (
                  <StakePage
                    EtherBalance={this.state.EtherBalance}
                    TotalInvestment={this.state.TotalInvestment}
                    TotalInvestmentUSD={this.state.TotalInvestmentUSD}
                    SetTokenData={this.SetTokenData}
                    ConnectWallet={this.ConnectWallet}
                    WalletAddress={this.state.WalletAddress}
                    UsdBalance={this.state.USDBalance}
                    IsConnectedMetaMask={this.state.IsConnectedMetaMask}
                    SubmitSetTrades={this.SubmitSetTrades}
                    IsStake={this.state.Stake}
                    topPoolData={this.state.topPoolData}
                  />
                )}
              />
              <Route exact path={`${process.env.PUBLIC_URL}/portfolio`}
                render={props => (
                  <PortfolioPage
                    EtherBalance={this.state.EtherBalance}
                    TotalInvestment={this.state.TotalInvestment}
                    TotalInvestmentUSD={this.state.TotalInvestmentUSD}
                    tokenData={this.state.tokenData}
                    SetTokenData={this.SetTokenData}
                    ConnectWallet={this.ConnectWallet}
                    WalletAddress={this.state.WalletAddress}
                    UsdBalance={this.state.USDBalance}
                    IsConnectedMetaMask={this.state.IsConnectedMetaMask}
                    SubmitSetTrades={this.SubmitSetTrades}
                    IsStake={this.state.Stake}
                    topPoolData={this.state.topPoolData}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        </div>

      </React.Fragment>
    );
  }
}

export default App;