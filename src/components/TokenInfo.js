import React from 'react';
import { Row } from 'reactstrap';

class TokenInfo extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Row>
                    <div className="eth_usdt_row">
                        <div className="display_default_pair" id="default_pair">
                            <button className="eth-icon"><img src={this.props.token.pair_token0_img} alt=""></img></button>
                            <button className="dollar-icon"><img src={this.props.token.pair_token1_img} alt=""></img></button>
                            <h5 style={{paddingLeft:"93px"}}> {this.props.token.pairLeft} - {this.props.token.pairRight} </h5>
                        </div>
                        <div className="eth-dateStaked">
                            <h5> {this.props.token.dateStaked} </h5>
                        </div>
                        <div className="eth-amountStaked">
                            <h5 className="font-weight-lighter"> {this.props.token.tokenSize} ETH (${this.props.token.tokenSizeInUSD}) </h5>
                        </div>
                        <div className="eth-currentValue">
                            <h5 className="font-weight-lighter"> {this.props.token.currentTokenValue} ETH ( ${this.props.token.currentUsdValue}) </h5>
                        </div>
                        <div className="eth-profitSince">
                            <h5> <img src={this.props.token.profitSince[0] ? "./images/green-up-profit.png" : "./images/red-down-profit.png"}
                                    alt="" width="15" height="20" /> {this.props.token.profitSince[1] * 100}% </h5>
                        </div>
                    </div>
                </Row>
            </React.Fragment>
        );
    }
}
export default TokenInfo;