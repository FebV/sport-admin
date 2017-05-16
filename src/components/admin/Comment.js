import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Awesome from '../common/RichEditor';
import RichTextEditor from 'react-rte';
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import CommentInfoModel from '../../controllers/Comment';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import API from '../../controllers/API'
import Auth from '../../controllers/Auth'

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            postCommentModalOpen: false,
            articleDetailModalOpen: false,
            articleDetailId: null,
            commentDetail: null,
            mode: 'post', //or edit
            title: '',
            writer: '',
            article: '',
            time: '选择日期',
            hasMore: true,
        }

        this.page = 1;
        this.loading = false;
        this.hasMore = true;


        window.onscroll = e => {
            if(this.Loading)
                return;
            if(!this.state.hasMore)
                return;
            //let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if((document.body.scrollTop + innerHeight) == document.body.scrollHeight) {
                this.page++;
                this.componentDidMount();
            }
        }
    }

    resetState() {
        this.setState({title: '', writer: '', article: '', time: '选择日期', commentList: []});
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
    }

    componentDidMount() {
        addEventListener('put comment ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('post comment ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('accept comment ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('decline comment ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('delete comment ok', () => {
            this.resetState();
            this.query();
        });
        this.loading = true;
        CommentInfoModel.getAllComment(this.page)
            .then(res => {
                this.page++;
                if(res.data.length < 20)     //每次查询记录数
                    this.setState({hasMore: false});
                this.setState({commentList: [...this.state.commentList, ...res.data]});
            });
    }

    query() {
        this.loading = true;
        CommentInfoModel.getAllComment(this.page)
            .then(res => {
                this.page++;
                if(res.data.length < 20)     //每次查询记录数
                    this.setState({hasMore: false});
                this.setState({commentList: [...this.state.commentList, ...res.data]});
            });
    }

    deleteComment() {
        console.log(this.state.articleDetailId)
        this.setState({articleDetailModalOpen: false});
        CommentInfoModel.deleteComment({id: this.state.articleDetailId});
    }

    postComment(picUrl='') {
        this.resetState();
        this.setState({postCommentModalOpen: false})
        if(this.state.mode == 'post') {
            CommentInfoModel.postComment({
                title: this.state.title,
                writer: this.state.writer,
                time: this.state.time,
                article: this.state.article,
                picture: picUrl,
            })
        }
        else if(this.state.mode == 'edit') {
            CommentInfoModel.putComment({
                commentId: this.state.articleDetailId,
                title: this.state.title,
                article: this.state.article,
                writer: this.state.writer,
                time: this.state.time,
                picture: picUrl,
        })
        }
    }

    fitDate(date) {
        const d = new Date(date);
        return `${this.leftPadding(d.getFullYear())}-${this.leftPadding((d.getMonth()+1))}-${this.leftPadding(d.getDate())}`;
    }

    leftPadding(date) {
        if(1*date < 10)
            date = '0' + date;
        return date;
    }


    render() {
        // console.log(this.state.commentDetail);
        return (
            <div style={{padding: "20px", width: "calc(100% - 40px)", height: "clac(100% - 20px)", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{width: "90%"}}>
            <Table
                selectable={false}
                style={{width: "100%"}}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn style={{width: "20px"}}>#</TableHeaderColumn>
                <TableHeaderColumn>标题</TableHeaderColumn>
                <TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>留言状态</TableHeaderColumn>
                <TableHeaderColumn>查看详情</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {this.state.commentList.map((ele, idx) => {
                    let state = '未知';
                    if(ele.state == 0)
                        state = '未审核';
                    if(ele.state == 1)
                        state = '通过';
                    if(ele.state == -1)
                        state = '不通过';
                    return (
                        <TableRow key={idx}>
                        <TableRowColumn style={{width: "20px"}}>{1 + 1*idx}</TableRowColumn>                            
                        <TableRowColumn>{ele.title}</TableRowColumn>
                        <TableRowColumn>{ele.created_at}</TableRowColumn>
                        <TableRowColumn>{state}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    console.log(ele.id)
                                    this.setState({articleDetailId: 1*(ele.id)});
                                    this.setState({articleDetailModalOpen: true});
                                    this.setState({mode: 'post'});
                                    this.setState({articleIdx: idx});
                                    this.setState({title: '', writer: '', article: '<h1>加载新闻中</h1>', time: ''});
                                }} label="查看详情" />
                        </TableRowColumn>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            <Divider />
            {this.state.hasMore ? "滚到底部加载更多" : "没有更多记录"}
            </Paper>
            </MuiThemeProvider>
            <ArticleDetail open={this.state.articleDetailModalOpen} close={() => this.setState({articleDetailModalOpen: false})} mode={this.state.mode} commentId={this.state.articleDetailId} props={this} deleteComment={this.deleteComment.bind(this)} />
            </div>
        )
    }
}


class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    accept() {
        CommentInfoModel.acceptComment({commentId: this.props.commentId});
        this.props.close();
    }

    decline() {
        CommentInfoModel.declineComment({commentId: this.props.commentId});
        this.props.close();        
    }


    render() {
        setTimeout(() => dispatchEvent(new Event('resize')), 0);
        if(this.props.mode == 'edit')
            return null;
        console.log(this.props.props.state.commentList[this.props.props.state.articleIdx]);
        if(!this.props.props.state.commentList[this.props.props.state.articleIdx])
            return null;
        const {title, time, content, email, name, tel, created_at} = this.props.props.state.commentList[this.props.props.state.articleIdx];
        return (
            <MuiThemeProvider>
            <Dialog
                autoScrollBodyContent={true}
                autoDetectWindowHeight={false}
                style={{height: "500px"}}
                title="留言详情"
                open={this.props.open}
                onRequestClose={this.props.close}
                actions={
                    <div style={{width: "100%"}}>
                    <span style={{width: '50%', textAlign: "right"}}>
                        <MuiThemeProvider>
                            <RaisedButton label="取消" onClick={() => this.props.close()} />
                        </MuiThemeProvider><MuiThemeProvider>
                            <RaisedButton style={{marginLeft: "20px"}} label="删除" onClick={() => this.props.deleteComment()} />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <RaisedButton style={{marginLeft: "20px"}} label="不通过" onClick={this.decline.bind(this)} />
                        </MuiThemeProvider>
                        <MuiThemeProvider>
                            <RaisedButton style={{marginLeft: "20px"}} label="通过" onClick={this.accept.bind(this)} />
                        </MuiThemeProvider>
                    </span>
                    </div>
                }
                children={
                    <div style={{fontSize: '24px', marginTop:"20px"}}>
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>标题：</span>{title}<br />
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>姓名：</span>{name}<br />
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>时间：</span>{created_at}<br />
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>邮箱：</span>{email}<br />
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>内容：</span>{content}<br />
                        <span style={{display: 'inline-block', textAlign:"right", width: "150px", fontSize: "24px"}}>联系方式：</span>{tel}<br />
                    </div>
                }
            />
            </MuiThemeProvider>
        )
    }
}

class CommentBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            null
        );
    }
}