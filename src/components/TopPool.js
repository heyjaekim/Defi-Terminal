import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiTwotoneCopy } from 'react-icons/ai';

function TopPool(props) {
    const [copied, setCopied] = useState(false);

    const toggleCopied = () => {
        setCopied(true);
    }

    return (
        <React.Fragment>
            <div className="top_performing_pair" >
                <button className="eth_icon"><img src={props.pool[0].pair_token0_img} alt=""></img></button>
                <button className="dollar_icon"><img src={props.pool[0].pair_token1_img} alt=""></img></button>
                <div className="eth_usdt_pair">
                    <h5>  {props.pool[0].pair_token0_name} - {props.pool[0].pair_token1_name} </h5>
                </div>
                <div className="top_address">
                    <input className="address-input" type="text" name="" value={props.pool[0].pair_addr} readOnly/>
                    <CopyToClipboard className="clip_to_copy" style={{ cursor: "pointer" }} text={props.pool[0].pair_addr}
                        onCopy={toggleCopied} >
                        <AiTwotoneCopy size="20px" />
                    </CopyToClipboard>
                </div>
                <button className="eth_icon"><img src={props.pool[1].pair_token0_img} alt=""></img></button>
                <button className="dollar_icon"><img src={props.pool[1].pair_token1_img} alt=""></img></button>
                <div className="eth_usdt_pair">
                    <h5>  {props.pool[1].pair_token0_name} - {props.pool[1].pair_token1_name} </h5>
                </div>
                <div className="top_address">
                    <input className="address-input" type="text" name="" value={props.pool[1].pair_addr} readOnly/>
                    <CopyToClipboard className="clip_to_copy2" style={{ cursor: "pointer" }} text={props.pool[1].pair_addr}
                        onCopy={toggleCopied} >
                        <AiTwotoneCopy size="20px" />
                    </CopyToClipboard>
                </div>
                <button className="eth_icon"><img src={props.pool[2].pair_token0_img} alt=""></img></button>
                <button className="dollar_icon"><img src={props.pool[2].pair_token1_img} alt=""></img></button>
                <div className="eth_usdt_pair">
                    <h5>  {props.pool[2].pair_token0_name} - {props.pool[2].pair_token1_name} </h5>
                </div>
                <div className="top_address">
                    <input className="address-input" type="text" name="" value={props.pool[2].pair_addr} readOnly/>
                    <CopyToClipboard className="clip_to_copy3" style={{ cursor: "pointer" }} text={props.pool[2].pair_addr}
                        onCopy={toggleCopied} >
                        <AiTwotoneCopy size="20px" />
                    </CopyToClipboard>
                </div>
            </div>
        </React.Fragment>
    );
}


export default TopPool;