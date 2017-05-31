import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommentModel from '../../controllers/Comment'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';


import Auth from '../../controllers/Auth';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        //shit.state
        this.isLoading = false;
        this.page = 1;
        this.state = {
            comments: [],
            postCommentDialogOpen: false,
            loading: true,
            deleteDialogOpen: false,
            deleteCommentId: null,
            isLogin: Auth.isLogin(),
            detailDialogOpen: false,
        }
        
    }

    componentDidMount() {
        window.onscroll =  e => {
            if(location.pathname != '/comment')
                return;
            if(this.isLoading)
                return;
            //let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if((document.body.scrollTop + innerHeight) == document.body.scrollHeight) {
                this.page++;
                this.query();
            }
        }

        addEventListener('post comment ok', () => {
            this.componentDidMount();
        })
        addEventListener('delete comment ok', () => {
            this.componentDidMount();
        })
        addEventListener('login ok', () => {
            this.setState({isLogin: true});
        })
        addEventListener('logout ok', () => {
            this.setState({isLogin: false});
        })

        this.page = 1;
        this.state.comments = [];
        this.query();
    }

    query() {
        this.setState({loading: true});
        this.isLoading = true;
        CommentModel.getPublishedComment(this.page)
            .then(res => {
                console.log(res);
                this.isLoading = false;
                this.setState({loading: false});
                if(res && res.data.length > 0) {
                    this.setState({comments: [...this.state.comments, ...res.data]});
                }
            });
    }

    getDetail(id) {
        CommentModel.getCommentDetail({id})
            .then(res => this.setState(res));
    }
    
    render() {
        return (
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: "50%"}}>
            {this.state.comments.length == 0 && !this.state.loading
                ?
            <div style={{width: "100%", height: "80%", marginTop: "30%", textAlign: "center", fontSize: "5vh", color: "gray"}}>暂无评论</div> : ''}
            
            {this.state.comments.map((ele, idx) => {
                return (
                    <Card style={{margin: "50px", width: "80%"}}>
                    <CardHeader
                    title={ele.id+" --- "+ele.title}
                    subtitle={ele.created_at}
                    />
                    <CardText>
                    {ele.content}
                    </CardText>
                    <CardActions style={{textAlign: 'right'}}>
                    { this.state.isLogin
                    ?
                    <div>
                    <FlatButton label="查看联系方式" onClick={() => {
                        this.setState({detailDialogOpen: true})
                        this.getDetail(ele.id);
                    }} />
                    <FlatButton label="删除" onClick={() => {
                        this.setState({deleteCommentId: ele.id});
                        this.setState({deleteDialogOpen: true})
                    }} />
                    </div>
                    :
                    null }
                    </CardActions>
                    </Card>
                    
                )
            })}
            <div style={{position: "fixed", left: "calc(50% - 25px)", top: "calc(50% - 25px)", width: "50px", height: "50px"}}>
            {this.state.loading
            ?
            
            <RefreshIndicator
            size={50}
            left={0}
            top={0}
            loadingColor="#FF9800"
            status="loading"
            style={{position: "relative"}}
            />
            
            :
            null
            }
            </div>
            </div>
            
            <FloatingActionButton onClick={() => this.setState({postCommentDialogOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            
            <PostCommentDialog
                open={this.state.postCommentDialogOpen}
                close={() => this.setState({postCommentDialogOpen: false})}
            />
            <CommentDetail
                open={this.state.detailDialogOpen}
                close={() => this.setState({detailDialogOpen: false})}
                name={this.state.name}
                tel={this.state.tel}
                email={this.state.email}
            />
            <DeleteDialog
                open={this.state.deleteDialogOpen}
                close={() => this.setState({deleteDialogOpen: false})}
                deleteCommentId={this.state.deleteCommentId}
            />
            </div>
        )
    }
}

class CommentDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <Dialog
                open={this.props.open}
                onRequestClose={this.props.close}
            >
            <h2>联系方式<br /></h2>
            <span style={{marginRight: "10px"}}>姓名:</span>{this.props.name}<br />
            <span style={{marginRight: "10px"}}>电话:</span>{this.props.tel}<br />
            <span style={{marginRight: "10px"}}>邮箱:</span>{this.props.email}<br />
            </Dialog>
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
        CommentModel.postComment({
            title: this.state.title,
            content: this.state.content,
            name: this.state.name,
            tel: this.state.tel, 
            email: this.state.email});
        this.props.close();
    }

    render() {
        return (
            
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
            
        )
    }
}

class DeleteDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteComment() {
        CommentModel.deleteComment({id: this.props.deleteCommentId});
        this.props.close();
    }

    render() {
        console.log(this.props)
        return (
            
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="确认删除评论？"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.close}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.deleteComment.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
            >
            </Dialog>
            
        )
    }
}