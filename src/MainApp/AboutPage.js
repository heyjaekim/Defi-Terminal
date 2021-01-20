import React from 'react';
import '../components/css/AboutPage.css';

function AboutPage(props) {

    return(
        <React.Fragment>
            <div className="aboutpage_body">
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>PoolHopper</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> The PoolHopper platform allows users to move their between the best-performing liquidity pools with ease
                    and in a transparent manner. Users can stake and unstake in multiple liquidity pools with custom transaction speed with just few clicks. We currently support only Uniswap pairs, but we eventually aim to support all the major Defi platforms.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Liquidity Pools</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> Liquidity pool represents the cryptocurrency reserve in a decentralized exchange. 
                    In centralized crypto exchanges, users provide the liquidity and the operating party of the exchange takes the profit from transaction fee. In decentralized exchanges, such as Uniswap, individual users may provide liquidity in a pool(for example, ETH-USDT pool) to take profit from the transaction fee.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Ethereum</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> Ethereum is a cryptocurrency used to either buy/sell other cryptocurrency. 
                    Ethereum is also required to pay for communication and transaction with the Ethereum blockchain.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Gas</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> Gas is amount of Ethereum paid for a particular interaction with the Ethereum blockchain. 
                    An example could be buying/selling in a decentralized exchange.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Slippage</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> Slippage represents the loss a trader must take when buying/selling in an exchange. 
                    The greater the amount of transaction with respect to the pool size(reserve size), the greater the amount of slippage.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Speed</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> Since 1 Ethereum block takes about 15 seconds to be mined, the fastest transaction speed one can expect from interacting with decentralized exchange is about 15 seconds. 
                    However, since the number of transaction the Ethereum blockchain can support is limited, the transaction may take hours or even days when gas cost a user submitted is low compare to other people interacting with the Ethereum blockchain at the particular moment. The more gas a user pays, the higher the probability of transaction taking place in a given time.</h4>
                </section>
                <section >
                    <h4 style={{fontFamily:"Verdana", fontWeight:"bold"}}>Transaction Time</h4>
                    <h4 style={{fontFamily:"Verdana", paddingTop:"25px", paddingBottom:"35px"}}> It is very difficult to predict an exact transaction time per submitted requrest. However, the more gas user pays, the faster the transaction takes place.</h4>
                </section>
                
                
            </div>
        </React.Fragment>
    );
}
export default AboutPage;