import React from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiTwotoneCopy } from 'react-icons/ai';
import PercentSlider from "./PercentSlider.js";
import BigNumber from "bignumber.js";

class TokenAddr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            usd: 0,
            copied: false,
            balance: 0,
        };
        this.token = props.token;
        this.updateTradeTotalSize = props.updateTradeTotalSize;
    }
    
    componentDidMount = async() => {
        var balance = BigNumber(await this.props.SmartContract.methods.GetLPBalance(this.props.token.pair_addr).call({ from: this.props.WalletAddress })).dividedBy(Math.pow(10, 18));;
        console.log("EEEEEEEEEEEEEE", balance.toString(), this.props.token.tokenSize)
        //balance = balance.multipliedBy(this.props.token.tokenSize).integerValue();
        this.setState({balance: balance});
    }

    /* 각 Address에서 Unstake하기 위해 LP Token Amount를 보여주기 위한 함수*/ 
    SetTokenAmount = async (percentage, value) => {
        var balance = BigNumber(await this.props.SmartContract.methods.GetLPBalance(this.props.token.pair_addr).call({ from: this.props.WalletAddress })).dividedBy(Math.pow(10, 18));
        console.log("TTT", percentage, value,balance.toString())
        if (value !== 0) {
            this.setState({
                //token: (parseFloat(value) / 100) * parseFloat(this.props.token.tokenSize)
                token: balance.multipliedBy(parseFloat(value) / 100),
                //balance:balance
            });
            //balance = balance.multipliedBy(this.state.token).integerValue();
            this.props.token.percentToken = value;
            this.props.token.lpAmtEth = (this.state.token).toFixed(15);
            this.props.token.lpAmtUsd = (this.state.token.multipliedBy(this.props.USD)).toFixed(15);
        } else {
            this.setState({
                token: balance.multipliedBy(parseFloat(percentage) / 100),
                //balance:balance
            });
            //balance = balance.multipliedBy(this.state.token).integerValue();
            this.props.token.percentToken = percentage;
            this.props.token.lpAmtEth = (this.state.token).toFixed(15);
            this.props.token.lpAmtUsd = (this.state.token.multipliedBy(this.props.USD)).toFixed(15);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <div className="eth_usdt_row">
                        <div className="display_default_pair" id="default_pair">
                            <button className="eth-icon"><img src={this.props.token.pair_token0_img} alt=""></img></button>
                            <button className="dollar-icon"><img src={this.props.token.pair_token1_img} alt=""></img></button>
                            <h5 style={{ paddingLeft: "93px" }}> {this.props.token.pair_token0_name} - {this.props.token.pair_token1_name} </h5>
                        </div>
                        <div className="eth-unstake_address">
                            <input className="address" type="text" value={this.props.token.pair_addr} readOnly />
                            <CopyToClipboard className="clip_to_copy" style={{ cursor: "pointer" }} text={this.props.token.pair_addr}
                                onCopy={() => this.setState({ copied: true })} >
                                <AiTwotoneCopy size="20px" />
                            </CopyToClipboard>
                        </div>
                        <div className="eth-percentslider">
                            <span>{this.state.balance.toFixed(15)} (LP) </span>
                            <PercentSlider SetTokenAmount={this.SetTokenAmount} />
                        </div>
                        <div className="eth-lp_amount">
                            <span style={{ color: "#fafafa", fontSize: "22px" }}>{this.props.token.lpAmtEth} LP </span>
                            <br></br>
                            <span style={{ color: "#fafafa", fontSize: "22px" }}>{this.props.token.lpAmtUsd}</span>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
        );
    }
}
export default TokenAddr;
