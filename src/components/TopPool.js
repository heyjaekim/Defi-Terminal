import React, { useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiTwotoneCopy } from 'react-icons/ai';
// import Web3 from 'web3';

function TopPool(props) {
    const [copied, setCopied] = useState(false);
    const [token0_img, set_token0_img] = useState();
    const [token1_img, set_token1_img] = useState();

    const toggleCopied = () => {
        setCopied(true);
        console.log("copeid: ", copied);
    }
    
    useEffect(async() => {
        console.log("TOP POOL DATA to LOAD IMAGES")

        let web3 = props.web3;
        let pair_addr = String(props.pool.pair_addr);
        let PairContract = new web3.eth.Contract(props.uniswap_pair_abi, pair_addr);
        let token0_addr = await PairContract.methods.token0().call();
        let token1_addr = await PairContract.methods.token1().call();
        console.log("handlePairChange", token0_addr, token1_addr);

        let token0 = new web3.eth.Contract(props.erc20_abi, token0_addr);
        let token1 = new web3.eth.Contract(props.erc20_abi, token1_addr);
        let token0_name = await token0.methods.symbol().call();
        let token1_name = await token1.methods.symbol().call();
        console.log("handlePairChange", token0_name, token1_name);

        let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png";
        let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png";
        
        set_token0_img(token0_img);
        set_token1_img(token1_img);

    });
    return (
        <React.Fragment>
            <Row>
                <div className="top_performing_pair" >
                    <button className="eth_icon"><img src={token0_img} alt=""></img></button>
                    <button className="dollar_icon"><img src={token1_img} alt=""></img></button>
                    <div className="eth_usdt_pair">
                        <h5>  {props.pool.pair_token0_name} - {props.pool.pair_token1_name} </h5>
                    </div>
                    <div className="top_address">
                        <input className="address-input" type="text" name="" value={props.pool.pair_addr} readOnly />
                        <CopyToClipboard className="clip_to_copy" style={{ cursor: "pointer" }} text={props.pool.pair_addr}
                            onCopy={toggleCopied} >
                            <AiTwotoneCopy size="20px" />
                        </CopyToClipboard>
                    </div>
                </div>
            </Row>
        </React.Fragment>
    );
}


export default TopPool;