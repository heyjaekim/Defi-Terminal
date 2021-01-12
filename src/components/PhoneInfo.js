import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      email: '010-0000-0000',
      id: 0
    }
  }
  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const {
      name, email, id
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{email}</div>
      </div>
    );
  }
}

export default PhoneInfo;