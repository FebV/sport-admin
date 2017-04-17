/**
 * Created by weng on 2017/4/13.
 */
import React from 'react';

export default class Manage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Manage</h2>
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