import React from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PercentAnimationBox } from "./styles";
import PercentSlider from "./PercentSlider.js";

class TokenAddr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            usd: 0,
        };
        this.token = props.token;
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

    SetTokenAmount = async (percentage) => {
        // console.log("ether balance: ", this.props.token.etherBalance);
        this.setState({
            token: (parseFloat(percentage) / 100) * parseFloat(this.props.token.tokenSize)
        });
        this.props.token.lpAmtEth = this.state.token.toFixed(8);
        this.props.token.lpAmtUsd = (1000 * this.state.token).toFixed(2);
        // console.log( this.props.token.tokenSize);
        // this.updateTradeTotalSize();
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    <div className="eth_usdt_row">
                        <div className="display_default_pair" id="default_pair">
                            <button className="eth-icon"><img src={this.props.token.pair_token0_img} alt=""></img></button>
                            <button className="dollar-icon"><img src={this.props.token.pair_token1_img} alt=""></img></button>
                            <h5 style={{ paddingLeft: "93px" }}> {this.props.token.pairLeft} - {this.props.token.pairRight} </h5>
                        </div>
                        <div className="eth-unstake_address">
                            <input className="address" type="text" value={this.props.token.pair_addr} readOnly />
                        </div>
                        <div className="eth-percentslider">
                            <span>{this.props.token.tokenSize} (ETH) </span>
                            <PercentSlider SetTokenAmount={this.SetTokenAmount} />
                        </div>
                        <div className="eth-lp_amount">
                            <span style={{color:"#fafafa", fontSize:"22px"}}>{this.props.token.lpAmtEth} ETH</span>
                            <br></br>
                            <span style={{color:"#fafafa", fontSize:"22px"}}>$ {this.props.token.lpAmtUsd}</span>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
        );
    }
}
export default TokenAddr;
