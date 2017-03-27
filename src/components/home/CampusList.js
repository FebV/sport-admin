import React from 'react';

export default class CampusList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CampusPic />
            </div>
        )
    }
}

class CampusPic extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Campus</div>
        )
    }
}