import React from 'react';

export default class ZhTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <h2>Tab One</h2>
            <p>
            This is an example tab.
            </p>
            <p>
            You can put any sort of HTML or react component in here. It even keeps the component state!
            </p>
        </div>
        )
    }
}