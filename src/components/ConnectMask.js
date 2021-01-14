import React from "react";
import { Row, Col } from "reactstrap";

class ConnectMask extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            topPoolData: this.props.topPoolData
        }
        this.ConnectMetaMask = props.ConnectMetaMask;
        this.handleConnectYourWallet = props.handleConnectYourWallet;
    }
    render() {
        return (
            <section className="portfolioHomeAttr" >
                <p style={{ textAlign: "center", paddingTop: "150px" }}><img src="images/pool_hopper-preview.png" alt="Logo" height="110px" /></p>
                <p style={{ textAlign: "center", color: "#fafafa", fontSize: "22px", fontWeight: "bold" }}>Make your Ether work for you. Generate profits by staking it in liquidity pools.</p>
                <p className="connectbox">
                    <input className="" type="button" value="Connect Your Wallet" onClick={() => { this.ConnectMetaMask(); }} />
                </p>
                <Row>

                    <Col lg="5" style={{ display: "inline-block", paddingLeft: "120px" }}>
                        <section style={{ color: "#fafafa", fontSize: "24px", paddingLeft: "100px" }}>The level of profitability only possible with liquidity mining</section>
                        <section style={{ paddingLeft: "100px", paddingBottom: "24px", paddingTop: "44px" }}>
                            <span >
                                <img src="images/eth_dollar.png" alt="eth_dollar" height="40px" />
                            </span>
                            <span className="eth_usdt_pair_initial">
                                <h5>  {this.state.topPoolData[0].pair_token0_name} - {this.state.topPoolData[0].pair_token1_name}</h5>

                            </span>
                            <span className="eth_usdt_profit_arrow">
                                <img src="images/green-up-profit.png" alt="green_up_profit" height="35px" />
                            </span>
                        </section>
                        <section style={{ paddingLeft: "100px", paddingBottom: "24px" }}>
                            <span >
                                <img src="images/eth_dollar.png" alt="eth_dollar" height="40px" />
                            </span>
                            <span className="eth_usdt_pair_initial">
                                <h5>  {this.state.topPoolData[1].pair_token0_name} - {this.state.topPoolData[1].pair_token1_name}</h5>

                            </span>
                            <span className="eth_usdt_profit_arrow">
                                <img src="images/green-up-profit.png" alt="green_up_profit" height="35px" />
                            </span>
                        </section>
                        <section style={{ paddingLeft: "100px", paddingBottom: "24px" }}>
                            <span >
                                <img src="images/eth_dollar.png" alt="eth_dollar" height="40px" />
                            </span>
                            <span className="eth_usdt_pair_initial">
                                <h5>  {this.state.topPoolData[2].pair_token0_name} - {this.state.topPoolData[2].pair_token1_name}</h5>

                            </span>
                            <span className="eth_usdt_profit_arrow">
                                <img src="images/green-up-profit.png" alt="green_up_profit" height="35px" />
                            </span>
                        </section>
                    </Col>
                    <Col lg="6" style={{ display: "inline-block", paddingTop: "2px", paddingLeft: "340px" }}>
                        <p style={{ color: "#fafafa", fontSize: "24px" }}> Ease of use and best-in-class, seamless user experience.</p>
                        <div className="stake_page_img">
                            <img src="images/portfolio_page.png" alt="stake_page" height="220px"></img>
                        </div>
                        <div className="portfolio_page_img">
                            <img src="images/stake_page.png" alt="stake_page" height="220px"></img>
                        </div>
                    </Col>
                </Row>
            </section>
        )
    }
}
export default ConnectMask;