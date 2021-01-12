import React from 'react';
import { Row } from 'reactstrap';

class TokenInfo extends React.Component {

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
                                    <h5> {this.props.token.pairLeft} - {this.props.token.pairRight} </h5>
                                </div>
                            </div>
                        </div>
                        <div className="eth-dateStaked">
                            <h5> {this.props.token.dateStaked} </h5>
                        </div>
                        <div className="eth-amountStaked">
                            <h5 className="font-weight-lighter"> {this.props.token.tokenSize} ETH ( ${this.props.token.tokenSizeInUSD}) </h5>
                        </div>
                        <div className="eth-currentValue">
                            <h5 className="font-weight-lighter"> {this.props.token.currentTokenValue} ETH ( ${this.props.token.currentUsdValue}) </h5>
                        </div>
                        <div className="eth-profitSince">
                            <h5> <img src={this.props.token.profitSince[0] ? "./images/arrow_point_to_top.png" : "./images/arrow_point_to_bot.png"}
                                    alt="" width="15" height="20" /> {this.props.token.profitSince[1]} </h5>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
        );
    }
}
export default TokenInfo;