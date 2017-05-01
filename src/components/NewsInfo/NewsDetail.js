import React from 'react';

import NewsInfoModel from '../../controllers/NewsInfo';

export default class NewsDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article: '新闻加载中',
            title: '',
            writer: '',
            time: '',
        }
    }
    
    componentDidMount() {
        NewsInfoModel.getNewsDetail(this.props.match.params.id)
            .then(res => {
                this.setState(res);
            })
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "2vh"}}>
                <div style={{width: "60%"}}>
                <div style={{width: "100%", textAlign: "center", fontWeight: "900", fontSize: "4vh"}}>{this.state.title}</div>
                <hr />
                <div style={{width: "40%", textAlign: "center", fontWeight: "900", fontSize: "5vh", marginLeft: "30%"}}><span style={{float: "left"}}>作者:{this.state.writer}</span><span style={{float: "right"}}>时间:{this.state.time}</span></div>
                <div style={{padding: "30px"}} className="newsContent" dangerouslySetInnerHTML={{__html: this.state.article}}></div>
                </div>
            </div>
        )
    }
}