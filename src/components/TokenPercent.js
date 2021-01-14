import React from 'react';

export default function TokenPercent(props) {
    
    return (
        <React.Fragment>
                <input className={props.token.title} type="percent" value={ ((props.token.value / props.totalSize) * 100).toFixed(1) }/><br />
        </React.Fragment>
    );

}