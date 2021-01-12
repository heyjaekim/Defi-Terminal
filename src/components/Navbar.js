import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IoWalletSharp, IoWalletOutline } from 'react-icons/io5';
import { SidebarData } from "./SidebarData";
import { Link } from 'react-router-dom';
import './css/Navbar.css';
import { IconContext } from "react-icons/lib";

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebar:false
        };
    };

    showSidebar = () => {
        this.setState({sidebar:!this.state.sidebar});
        console.log(this.state.sidebar);
    }

    render() {
        return (
            <React.Fragment>
                <IconContext.Provider value={{color:'white'}}>
                <div className="home">
                    <section className="navbar-attr">
                        <div class="navbar-hamber" id="ConnectedPage-view" style={{display:"block"}}>
                            <Link className="navbar-logo" to="/">
                                <img src="images/Logo_White.png" alt="" height="57px" width="281.8px" />
                            </Link>
                            <Link to="#" className="menu-bars">
                                <FaIcons.FaBars onClick={this.showSidebar}/>
                            </Link>
                            <div className="navbar-walletaddr">
                                <h5> {this.props.WalletAddress}</h5>
                                <h5 className="m"><IoWalletOutline/></h5>
                            </div>
                        </div>
                        <nav className={this.state.sidebar ? "nav-menu active" : "nav-menu"}>
                            <ul className="nav-menu-items" onClick={this.showSidebar} >
                                <li className="navbar-toggle" >
                                    <Link to="#" className="menu-bars">
                                        <AiIcons.AiOutlineClose />
                                    </Link>
                                </li>
                                {SidebarData.map((item, index) => {
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span className="menu-titles">{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    </section>
                </div>
                </IconContext.Provider>
            </React.Fragment>
        );
    }
}

export default Navbar;