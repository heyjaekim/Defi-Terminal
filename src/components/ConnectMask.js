import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from 'react-router-dom';

class ConnectMask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topPoolData: [
                {
                  p_id: 0,
                  pair_addr: '0xB10cf58E08b94480fCb81d341A63295eBb2062C2',
                  pair_token0_name: 'ETH',
                  pair_token1_name: 'USDT',
                  pair_token0_img: 'images/eth_icon.png',
                  pair_token1_img: 'images/dollar_icon.png',
                },
                {
                  p_id: 1,
                  pair_addr: '0xd4d9A707C2943f59525a9de00D2967A99f8B5f0a',
                  pair_token0_name: 'ETH',
                  pair_token1_name: 'USDT',
                  pair_token0_img: 'images/dollar_icon.png',
                  pair_token1_img: './images/eth_icon.png',
                },
                {
                  p_id: 1,
                  pair_addr: '0xd4d9A707C2943f59525a9de00D2967A99f8B5f0a',
                  pair_token0_name: 'ETH',
                  pair_token1_name: 'USDT',
                  pair_token0_img: 'images/dollar_icon.png',
                  pair_token1_img: 'images/eth_icon.png',
                }
              ],
            
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
                    {/* <Link to="/stake"> */}
                        <input className="" type="button" value="Connect Your Wallet" onClick={() => { this.ConnectMetaMask(); }} />
                    {/* </Link> */}
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
                            <img src="images/portfolio_page.png" alt="stake_page" height="220px" />
                        </div>
                        <div className="portfolio_page_img">
                            <img src="images/stake_page.png" alt="stake_page" height="220px" />
                        </div>
                    </Col>
                </Row>
            </section>
        )
    }
}
export default ConnectMask;