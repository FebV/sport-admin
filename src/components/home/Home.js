import React from 'react';

import CampusList from './CampusList';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CampusList />
                <div>新闻</div>
                <div>通知公告</div>
            </div>
        )
    }
}