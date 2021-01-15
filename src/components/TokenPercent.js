import React from 'react';

export default function TokenPercent(props) {
    let percent = ((props.token.value / props.totalSize) * 100).toFixed(1).toString();
    let value = `${percent} %`
    return (
        <React.Fragment>
                <input className={props.token.title} type="percent" value={value}/><br />
        </React.Fragment>
    );

}