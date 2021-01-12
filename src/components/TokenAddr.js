import React from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PercentAnimationBox } from "./styles";

class TokenAddr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            usd: 0,
        };
        this.token = props.token;

    }

    componentDidMount=async()=> {
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

    allocToSubTokenSize = async() => {
        this.token.lpAmtEth = this.token.tokenSize * (this.state.percent / 100);
        this.setState((state, props) => {
            return { token: props.token.tokenSize * (state.percent / 100) }
        });
    }

    percentAnimation=async(num, ele)=> {
        this.state.percentBoxs.forEach((tab) => {
            tab.style.color = "#8BAEC2";
        });
        if (num === 0) {
            await this.setState({ percent: 0 });
            document.getElementById(this.token.percentAniBox).style.left = "0px";
        } else if (num === 25) {
            await this.setState({ percent: 25 });
            document.getElementById(this.token.percentAniBox).style.left = "80px";
        } else if (num === 50) {
            await this.setState({ percent: 50 });
            document.getElementById(this.token.percentAniBox).style.left = "163px";
        } else if (num === 75) {
            await this.setState({ percent: 75 });
            document.getElementById(this.token.percentAniBox).style.left = "245px";
        } else if (num === 100) {
            await this.setState({ percent: 100 });
            document.getElementById(this.token.percentAniBox).style.left = "328px";
        }
        this.allocToSubTokenSize();
        ele.style.color = "#fff";
    }

    render() {

        return (
            <React.Fragment>
                <Row>
                    <div className="eth-usdt-row">
                        <div className="display_default_pair" id="default_pair">
                            <div className="eth-dollar">
                                {/* <button className="eth-icon"><img src={this.state.pair1_token0_img} alt=""></img></button>
                                <button className="dollar-icon"><img src={this.state.pair1_token1_img} alt=""></img></button> */}
                                <button className="eth-icon"><img src="./images/eth_icon.png" alt=""></img></button>
                                <button className="dollar-icon"><img src="./images/dollar_icon.png" alt=""></img></button>
                                <div className="eth_usdt_pair">
                                    <h5> {this.token.pairLeft} - {this.token.pairRight} </h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </Row>
                <input className="address" type="text" value={this.token.address} readOnly />
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
                <div className="lp_amount">
                    <h5 className="available-eth">{this.state.token} ETH</h5>
                    <h5 className="available-dollar">$ {this.state.usd}</h5>
                </div>
            </React.Fragment>
        );
    }
}
export default TokenAddr;
