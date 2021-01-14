import React from 'react';

export default function TokenPair(props) {

    return (
        <React.Fragment>
            <h5 className="pair1"> {props.token.pair[0]} - {props.token.pair[1]} </h5>
        </React.Fragment>
    );

}