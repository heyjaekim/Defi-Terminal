import React from 'react';

class AllocationPercent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <button
                    type="button"
                    id="percent0"
                    onClick={(e) => {
                        this.SetPercent(0);
                        this.percentAnimation(0, e.target);
                    }}
                >
                    0%
                                            </button>
                <button
                    type="button"
                    id="percent25"
                    onClick={(e) => {
                        this.SetPercent(25);
                        this.percentAnimation(25, e.target);
                    }}
                >
                    25%
                                            </button>
                <button
                    type="button"
                    id="percent50"
                    onClick={(e) => {
                        this.SetPercent(50);
                        this.percentAnimation(50, e.target);
                    }}
                >
                    50%
                                            </button>
                <button
                    type="button"
                    id="percent75"
                    onClick={(e) => {
                        this.SetPercent(75);
                        this.percentAnimation(75, e.target);
                    }}
                >
                    75%
                                            </button>
                <button
                    type="button"
                    id="percent100"
                    onClick={(e) => {
                        this.SetPercent(100);
                        this.percentAnimation(100, e.target);
                    }}
                >
                    100%
                                            </button>
            </React.Fragment>
        );
    }
}

export default AllocationPercent;