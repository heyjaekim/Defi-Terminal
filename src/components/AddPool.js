import React, { Component } from 'react';
import { Row } from 'reactstrap';
import PercentSlider from "./PercentSlider.js";
import Web3 from "web3";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

class AddPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 0,
            percent: 0,
            pair_token0_name: null,
            pair_token1_name: null,
            // 새로운 Swap Type을 추가할 때 마다 StakePage.js에 있는 addNewTokenData 함수 내 pair_abi_list 업데이트 필요.
            swap_types: ['uniswap', 'sushiswap'],
            swap_display: 'uniswap',
        };
        this.token = props.token;
        this.EtherBalance = props.EtherBalance;
        this.updateTradeTotalSize = props.updateTradeTotalSize;
    }

    handleDisplayPairImg() {
        document.getElementById(this.props.token.default_t_id).style.display = "none";
        document.getElementById(this.props.token.address_t_id).style.display = "block";
    }

    handleDisplayDefaultImag() {
        document.getElementById(this.props.token.default_t_id).style.display = "block";
        document.getElementById(this.props.token.address_t_id).style.display = "none";
    }

    handlePairChange = async (event) => {
        //this.web3.eth.Contract
        try {
            event.preventDefault();
            console.log("handlePairChange", event.target.value);
            this.web3 = new Web3(window.ethereum);
            let pair_addr = String(event.target.value);
            let PairContract = new this.web3.eth.Contract(this.props.token.pair_abi, pair_addr);
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

    handleTokenChange = async (evt) => {
        evt.preventDefault();

        let token = Number(evt.target.value);
        this.props.token.tokenSize = token;
        console.log("handleTokenChange tokenSize: ", this.props.token.tokenSize, "tokenId: ", this.props.token.tokenName);
        this.setState({
            token: token,
        });

        this.updateTradeTotalSize()

    };

    /* 각 Address에 할당해줄 Token Size를 측정하기 위한 함수 */
    SetTokenAmount = async (percentage, value) => {
        // console.log("ether balance: ", this.props.token.etherBalance);
        if (value !== 0) {
            this.setState({
                token: (parseFloat(value) / 100) * parseFloat(this.props.token.EtherBalance)
            });
            this.props.token.tokenSize = this.state.token;
            this.updateTradeTotalSize();
        } else {
            this.setState({
                token: (parseFloat(percentage) / 100) * parseFloat(this.props.token.EtherBalance)
            });
            this.props.token.tokenSize = this.state.token;
            this.updateTradeTotalSize();
        }
    }

    clickItem = (value) => {
        this.setState({
            swap_display: value
        })
        // 선택한 swap pair abi로 업데이트
        this.props.token.pair_abi = this.props.token.pair_abi_list[value];
        console.log("SELECTED TOKEN PAIR ABI: ", value, this.props.token.pair_abi);
    }

    render() {
        return (
            <React.Fragment>
                    {this.props.onStake ? 
                    <Row>
                        <div className="display_default_pair" id={this.props.token.default_t_id}>
                            <button className="eth_icon"><img src="images/eth_icon.png" alt="eth_icon"></img></button>
                            <button className="dollar_icon"><img src="images/dollar_icon.png" alt="dollar_icon"></img></button>
                            <div className="swap_select">
                                <DropdownButton id="dropdown-performer" title={this.state.swap_display} menuAlign="left">
                                    <Dropdown.Item id="dropdown-performer-item0" onClick={(e) => { this.clickItem(this.state.swap_types[0]) }}>
                                        {this.state.swap_types[0]}
                                    </Dropdown.Item>
                                    <Dropdown.Item id="dropdown-performer-item1" onClick={(e) => { this.clickItem(this.state.swap_types[1]) }}>
                                        {this.state.swap_types[1]}
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                        <div className="display_address_pair" id={this.props.token.address_t_id}>
                            <button className="eth_icon"><img src={this.props.token.pair_token0_img} alt=""></img></button>
                            <button className="dollar_icon"><img src={this.props.token.pair_token1_img} alt=""></img></button>
                            <div className="eth_usdt_pair">
                                <h5>  {this.props.token.pair_token0_name} - {this.props.token.pair_token1_name} </h5>
                            </div>
                        </div>
                        <div className="eth_token_size">
                            <div className="address">
                                <input className="address-input" type="text" name="" onChange={(e) => { this.handlePairChange(e); }} />
                                <input className="inputTokenSize" type="number" name={this.token.tokenName} min="0"
                                    value={this.state.token} placeholder='0' onChange={this.handleTokenChange} />
                            </div>
                            <div className="token_size">
                            </div>
                        </div>
                        <div className="percent_slider">
                            <PercentSlider SetTokenAmount={this.SetTokenAmount} />
                        </div>
                    </Row>
                    :
                    ""
                    }
                <div className="eth-usdt-row"></div>
            </React.Fragment>
        );
    }
}

export default AddPool;