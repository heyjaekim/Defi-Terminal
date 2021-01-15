import React from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiTwotoneCopy } from 'react-icons/ai';
import PercentSlider from "./PercentSlider.js";

class TokenAddr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            usd: 0,
            copied: false,
        };
        this.token = props.token;
        this.updateTradeTotalSize = props.updateTradeTotalSize;
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
                            <CopyToClipboard className="clip_to_copy" style={{ cursor: "pointer" }} text={this.props.token.pair_addr}
                                onCopy={() => this.setState({ copied: true })} >
                                <AiTwotoneCopy size="20px" />
                            </CopyToClipboard>
                        </div>
                        <div className="eth-percentslider">
                            <span>{this.props.token.tokenSize} (ETH) </span>
                            <PercentSlider SetTokenAmount={this.SetTokenAmount} />
                        </div>
                        <div className="eth-lp_amount">
                            <span style={{ color: "#fafafa", fontSize: "22px" }}>{this.props.token.lpAmtEth} ETH</span>
                            <br></br>
                            <span style={{ color: "#fafafa", fontSize: "22px" }}>$ {this.props.token.lpAmtUsd}</span>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
        );
    }
}
export default TokenAddr;
