import React, { Component } from 'react';
import Web3 from "web3";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiTwotoneCopy } from 'react-icons/ai';

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { NotificationManager } from "react-notifications";

class TopPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            pair_token0_name: null,
            pair_token1_name: null,
            value: '',
            copied: false,
        };
        this.token = props.token;
        this.totalTradeSize = props.totalTradeSize;
        this.updateTradeTotalSize = props.updateTradeTotalSize;
    }

    handlePairChange = async (event) => {
        //this.web3.eth.Contract
        try {
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            this.web3 = new Web3(window.ethereum);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.props.token.uniswap_pair_abi, pair_addr);
            let token0_addr = await PairContract.methods.token0().call();
            let token1_addr = await PairContract.methods.token1().call();
            console.log("handlePairChange", token0_addr, token1_addr);

            let token0 = new this.web3.eth.Contract(this.props.token.erc20_abi, token0_addr);
            let token1 = new this.web3.eth.Contract(this.props.token.erc20_abi, token1_addr);
            let token0_name = await token0.methods.symbol().call();
            // if(token0_name.includes("Wrapped ")){token0_name = token0_name.replace("Wrapped ", "W");}
            let token1_name = await token1.methods.symbol().call();
            console.log("handlePairChange", token0_name, token1_name);

            let token0_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token0_addr + "/logo.png"
            let token1_img = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/" + token1_addr + "/logo.png"
            this.props.token.pair_addr = pair_addr;
            this.props.token.pair_cont = PairContract;
            this.props.token.pair_token0 = token0;
            this.props.token.pair_token1 = token1;
            this.props.token.pair_token0_name = token0_name;
            this.props.token.pair_token1_name = token1_name;
            this.props.token.pair_token0_img = token0_img;
            this.props.token.pair_token1_img = token1_img;
            this.setState({
                pair_token0_name: token0_name,
                pair_token1_name: token1_name
            })
            this.handleDisplayPairImg();
        } catch (event) {
            this.handleDisplayDefaultImag();
            console.log("Display Default Pair Image")
            this.props.token.pair_addr = null;
            this.props.token.pair_cont = null;
            this.props.token.pair_token0 = null;
            this.props.token.pair_token1 = null;
            this.props.token.pair_token0_name = null;
            this.props.token.pair_token1_name = null;
            this.props.token.pair_token0_img = null;
            this.props.token.pair_token1_img = null;
        }
    };

    // createNotification = async(type) => {        
    //     switch (type) {
    //         case 'success':
    //             NotificationManager.success('paste from clipboard', 'Copied Success', 1000);
    //             console.log("Copied Success");
    //     }
    // };

    render() {
        // console.log("t_id: " + this.props.token.t_id);
        // console.log("pair names: " + this.props.token.pair_token0_name + this.props.token.pair_token1_name);
        return (
            <React.Fragment>
                <NotificationContainer/>
                <div className="top_performing_pair" >
                    <button className="eth_icon"><img src={this.props.pool[0].pair_token0_img} alt=""></img></button>
                    <button className="dollar_icon"><img src={this.props.pool[0].pair_token1_img} alt=""></img></button>
                    <div className="eth_usdt_pair">
                        <h5>  {this.props.pool[0].pair_token0_name} - {this.props.pool[0].pair_token1_name} </h5>
                    </div>
                    <div className="top_address">
                        <input className="address-input" type="text" name="" value={this.props.pool[0].pair_addr} />
                        <CopyToClipboard className="clip_to_copy" style={{ cursor: "pointer" }} text={this.props.pool[0].pair_addr}
                            onCopy={() => this.setState({ copied: true })} >
                            <AiTwotoneCopy size="20px" />
                        </CopyToClipboard>
                    </div>
                    <button className="eth_icon"><img src={this.props.pool[1].pair_token0_img} alt=""></img></button>
                    <button className="dollar_icon"><img src={this.props.pool[1].pair_token1_img} alt=""></img></button>
                    <div className="eth_usdt_pair">
                        <h5>  {this.props.pool[1].pair_token0_name} - {this.props.pool[1].pair_token1_name} </h5>
                    </div>
                    <div className="top_address">
                        <input className="address-input" type="text" name="" value={this.props.pool[1].pair_addr} />
                        <CopyToClipboard className="clip_to_copy2" style={{ cursor: "pointer" }} text={this.props.pool[1].pair_addr}
                            onCopy={() => this.setState({ copied: true })} >
                            <AiTwotoneCopy size="20px" />
                        </CopyToClipboard>
                    </div>
                    <button className="eth_icon"><img src={this.props.pool[2].pair_token0_img} alt=""></img></button>
                    <button className="dollar_icon"><img src={this.props.pool[2].pair_token1_img} alt=""></img></button>
                    <div className="eth_usdt_pair">
                        <h5>  {this.props.pool[2].pair_token0_name} - {this.props.pool[2].pair_token1_name} </h5>
                    </div>
                    <div className="top_address">
                        <input className="address-input" type="text" name="" value={this.props.pool[2].pair_addr} />
                        <CopyToClipboard className="clip_to_copy3" style={{ cursor: "pointer" }} text={this.props.pool[2].pair_addr}
                            onCopy={() => this.setState({ copied: true })} >
                            <AiTwotoneCopy size="20px" />
                        </CopyToClipboard>
                    </div>
                    {/* <button onClick={this.showNotification()}> Click Me! </button> */}
                </div>
            </React.Fragment>
        );
    }
}

export default TopPool;