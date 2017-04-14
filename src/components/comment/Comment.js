import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommentModel from '../../controllers/Comment'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../controllers/Auth';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        //shit.state
        this.state = {
            comments: [],
            postCommentDialogOpen: false,
        }
    }

    componentDidMount() {
        CommentModel.getInnerComment(1)
            .then(res => this.setState({comments: res.data.data}));
    }
    
    render() {
        return (
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: "50%",}}>
            {this.state.comments.length == 0
                ?
            <div style={{width: "100%", height: "80%", marginTop: "30%", textAlign: "center", fontSize: "5vh", color: "gray"}}>暂无评论</div> : ''}
            {this.state.comments.map((ele, idx) => {
                return (
                    <MuiThemeProvider key={idx}>
                    <Card style={{margin: "50px", width: "80%"}}>
                    <CardHeader
                    title={ele.title}
                    subtitle={ele.created_at}
                    />
                    <CardText>
                    {ele.content}
                    </CardText>
                    <CardActions style={{textAlign: 'right'}}>
                    { Auth.isLogin() ? <FlatButton label="删除" /> : null }
                    </CardActions>
                    </Card>
                    </MuiThemeProvider>
                )
            })}
            </div>
            <MuiThemeProvider>
            <FloatingActionButton onClick={() => this.setState({postCommentDialogOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            </MuiThemeProvider>
            <PostCommentDialog
                open={this.state.postCommentDialogOpen}
                close={() => this.setState({postCommentDialogOpen: false})}
            />
            </div>
        )
    }
}

class PostCommentDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            name: '',
            tel: '',
            email: '',
        }
    }

    postComment() {
        CommentModel.postInnerComment({});
        this.props.close();
    }

    render() {
        return (
            <MuiThemeProvider>
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="发布评论"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.close}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.postComment.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
            >
            <TextField
                floatingLabelText="标题"
                value={this.state.title}
                onChange={(e, v) => this.setState({title: v})}
            /><br />
            <TextField
                floatingLabelText="内容"
                value={this.state.content}
                onChange={(e, v) => this.setState({content: v})}
            /><br />
            <TextField
                floatingLabelText="姓名"
                value={this.state.name}
                onChange={(e, v) => this.setState({name: v})}                    
            /><br />
            <TextField
                floatingLabelText="联系方式"
                value={this.state.tel}
                onChange={(e, v) => this.setState({tel: v})}                    
            /><br />
            <TextField
                floatingLabelText="邮箱"
                value={this.state.email}
                onChange={(e, v) => this.setState({email: v})}                    
            /><br />
            </Dialog>
            </MuiThemeProvider>
        )
    }
}