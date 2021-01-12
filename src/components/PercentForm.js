import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PercentAnimationBox } from "./styles";
import Web3 from "web3";

class PercentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            pair_token0_name: null,
            pair_token1_name: null
        };
        this.token = props.token;
        this.totalTradeSize = props.totalTradeSize;
        this.updateTradeTotalSize = props.updateTradeTotalSize;
    }

    componentDidMount = async () => {
        this.setState({
            percentBoxs: [
                document.getElementById(this.token.percent0),
                document.getElementById(this.token.percent25),
                document.getElementById(this.token.percent50),
                document.getElementById(this.token.percent75),
                document.getElementById(this.token.percent100)
            ]
        });
    }

    allocToSubTokenSize = async () => {
        this.token.lpAmtEth = this.token.tokenSize * (this.state.percent / 100);
        this.setState((state, props) => {
            return { token: props.token.tokenSize * (state.percent / 100) }
        });
    }

    percentAnimation = async (num, ele) => {
        this.state.percentBoxs.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            this.setState({ percent: 0 });
            document.getElementById(this.token.percentAniBox).style.left = "0px";
        } else if (num === 25) {
            this.setState({ percent: 25 });
            document.getElementById(this.token.percentAniBox).style.left = "80px";
        } else if (num === 50) {
            this.setState({ percent: 50 });
            document.getElementById(this.token.percentAniBox).style.left = "163px";
        } else if (num === 75) {
            this.setState({ percent: 75 });
            document.getElementById(this.token.percentAniBox).style.left = "245px";
        } else if (num === 100) {
            this.setState({ percent: 100 });
            document.getElementById(this.token.percentAniBox).style.left = "328px";
        }
        this.allocToSubTokenSize();
        ele.style.color = "#fff";
    }

    handleDisplayPairImg() {
        document.getElementById(this.props.token.default_t_id).style.display = "none";
        document.getElementById(this.props.token.address_t_id).style.display = "block";
    }

    handleDisplayDefaultImag() {
        document.getElementById(this.props.token.default_t_id).style.display = "block";
        document.getElementById(this.props.token.address_t_id).style.display = "none";
    }

    handlePairChange = async (event) => {
        //this.web3.eth.Contract
        try {
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            this.web3 = new Web3(window.ethereum);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.props.token.uniswap_pair_abi, pair_addr);
            let token0_addr = await PairContract.methods.token0().call();
            let token1_addr = await PairContract.methods.token1().call();
            console.log("handlePairChange", token0_addr, token1_addr);

            let token0 = new this.web3.eth.Contract(this.props.token.erc20_abi, token0_addr);
            let token1 = new this.web3.eth.Contract(this.props.token.erc20_abi, token1_addr);
            let token0_name = await token0.methods.symbol().call();
            // if(token0_name.includes("Wrapped ")){token0_name = token0_name.replace("Wrapped ", "W");}
            let token1_name = await token1.methods.symbol().call();
            console.log("handlePairChange", token0_name, token1_name);

            let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png"
            let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png"
            this.props.token.pair_addr = pair_addr;
            this.props.token.pair_cont = PairContract;
            this.props.token.pair_token0 = token0;
            this.props.token.pair_token1 = token1;
            this.props.token.pair_token0_name = token0_name;
            this.props.token.pair_token1_name = token1_name;
            this.props.token.pair_token0_img = token0_img;
            this.props.token.pair_token1_img = token1_img;
            this.setState({
                pair_token0_name:token0_name,
                pair_token1_name:token1_name
            })
            this.handleDisplayPairImg();
        } catch (event) {
            this.handleDisplayDefaultImag();
            console.log("Display Default Pair Image")
            this.props.token.pair_addr = null;
            this.props.token.pair_cont = null;
            this.props.token.pair_token0 = null;
            this.props.token.pair_token1 = null;
            this.props.token.pair_token0_name = null;
            this.props.token.pair_token1_name = null;
            this.props.token.pair_token0_img = null;
            this.props.token.pair_token1_img = null;
        }
    };
    //0x6eF026fC19F36E0747AAFDA652731Ce05441C4C1

    handleTokenChange = async (evt) => {
        evt.preventDefault();

        let token = Number(evt.target.value);
        this.props.token.tokenSize = token;
        console.log("handleTokenChange tokenSize: ", this.props.token.tokenSize, "tokenId: ", this.props.token.tokenName);
        this.setState({
            token: token,
        });

        this.updateTradeTotalSize()

    };

    render() {
        console.log("t_id: " + this.props.token.t_id);
        console.log("pair names: " + this.props.token.pair_token0_name + this.props.token.pair_token1_name);
        return (
            <React.Fragment>
                <Row>
                    <div className="eth-usdt-row">
                        <div className="display_default_pair" id={this.props.token.default_t_id}>
                            <div className="eth-dollar">
                                <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button>
                                <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button>
                                <div className="eth_usdt_pair">
                                    <h5> {this.props.token.pairLeft} - {this.props.token.pairRight} </h5>
                                </div>
                            </div>
                        </div>
                        <div className="display_address_pair" id={this.props.token.address_t_id}>
                            <button className="eth-icon"><img src={this.props.token.pair_token0_img} alt=""></img></button>
                            <button className="dollar-icon"><img src={this.props.token.pair_token1_img} alt=""></img></button>
                            <div className="eth_usdt_pair">
                                <h5>  {this.props.token.pair_token0_name} - {this.state.pair_token1_name} </h5>
                            </div>
                        </div>
                        <div className="eth_token_size">
                            <div className="token_size">
                                <input className="inputTokenSize" type="number" name={this.token.tokenName} min="0"
                                    value={this.state.token} placeholder='0' onChange={this.handleTokenChange} />
                            </div>
                            <div className="percent_area">
                                <PercentAnimationBox id={this.token.percentAniBox}></PercentAnimationBox>
                                <button type="button" id={this.token.percent0}
                                    onClick={(e) => { this.percentAnimation(0, e.target); }}>0%</button>
                                <button type="button" id={this.token.percent25}
                                    onClick={(e) => { this.percentAnimation(25, e.target); }}>25%</button>
                                <button type="button" id={this.token.percent50}
                                    onClick={(e) => { this.percentAnimation(50, e.target); }}>50%</button>
                                <button type="button" id={this.token.percent75}
                                    onClick={(e) => { this.percentAnimation(75, e.target); }}>75%</button>
                                <button type="button" id={this.token.percent100}
                                    onClick={(e) => { this.percentAnimation(100, e.target); }}>100%</button>
                            </div>
                            <div className="address">
                                <input className="address-input" type="text" name=""
                                    onChange={(e) => { this.handlePairChange(e); }} />
                            </div>
                        </div>

                    </div>
                </Row>
                <div className="eth-usdt-row">
                </div>
            </React.Fragment>
        );
    }
}

export default PercentForm;