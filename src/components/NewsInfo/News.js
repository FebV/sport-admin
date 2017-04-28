import React from 'react';

import NewsModel from '../../controllers/NewsInfo'

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newslist: [],
        }
    }

    componentDidMount() {
        NewsModel.getPublishedNews(1)
            .then(res => console.log(res));//this.setState({newslist: res}))
    }

    render() {
        return (
            <div>news</div>
        )
    }
}