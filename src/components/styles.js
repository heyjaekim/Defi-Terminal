import styled from "styled-components";


export const Summary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #fff;
  span {
    font-size: 33px;
    font-weight: 100;
    letter-spacing: 0.03rem;
  }
  .update_info_area {
    display: none;
    text-align: center;
    span {
      &:last-child {
        display: block;
        margin-top: 30px;
        font-size: 22px;
        text-align: left;
        strong {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
`;

export const StakeTogglerAnimationBox = styled.span`
  position: absolute;
  left: 0px;
  width: 291px;
  height: 40px;
  border-radius: 30px;
  background: #073d67;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

export const GasSpeedAnimationBox = styled.span`
  position: absolute;
  left: 0px;
  width: 162px;
  height: 40px;
  border-radius: 30px;
  background: #073d67;
  transition: left 0.3s ease-in-out;
`;

export const PercentAnimationBox = styled.span`
  position: absolute;
  left: 0px;
  width: 82px;
  height: 40px;
  border-radius: 30px;
  background: #073d67;
  transition: left 0.3s ease-in-out;
`;

export const styles = {
  menu: {
      overflow: 'hidden',
      border: '2px solid #ddd',
      width: 300,
      marginTop: 20,
  },
  selection: {
      padding: 10,
      margin: 0,
      borderBottom: '1px solid #ededed'
  },
  button: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      cursor: 'pointer',
      width: 200,
      height: 45,
      border: 'none',
      borderRadius: 4,
      backgroundColor: '#ffc107',
  },
}

export const menuHamber = {
  input: {
    display: 'block',
    cursor: 'pointer',
  },
  label: {
    display: 'block',
    width: '38px',
    height: '30px',
    position: 'relative',
    cursor: 'pointer',
  }
  
}