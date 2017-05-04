import React from 'react';

import NoticeInfoModel from '../../controllers/Notice';

export default class NoticeDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            article: '<h2>通知加载中</h2>',
            title: '',
            writer: '',
            time: '',
        }
    }
    
    componentDidMount() {
        console.log(`notice`);
        NoticeInfoModel.getNoticeDetail(this.props.match.params.id)
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
                <div style={{padding: "30px"}} dangerouslySetInnerHTML={{__html: this.state.article}}></div>
                </div>
            </div>
        )
    }
}