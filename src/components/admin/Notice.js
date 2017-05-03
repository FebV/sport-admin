import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Awesome from '../common/RichEditor';
import RichTextEditor from 'react-rte';
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import NoticeInfoModel from '../../controllers/Notice';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import API from '../../controllers/API'
import Auth from '../../controllers/Auth'

export default class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList: [],
            postNoticeModalOpen: false,
            articleDetailModalOpen: false,
            articleDetailId: null,
            noticeDetail: null,
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
        this.setState({title: '', writer: '', article: '', time: '选择日期', noticeList: []});
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
    }

    componentDidMount() {
        addEventListener('put notice ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('post notice ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('accept notice ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('decline notice ok', () => {
            this.resetState();
            this.query();
        });
        addEventListener('delete notice ok', () => {
            this.resetState();
            this.query();
        });
        this.loading = true;
        NoticeInfoModel.getAllNotice(this.page)
            .then(res => {
                this.page++;
                if(res.data.length < 20)     //每次查询记录数
                    this.setState({hasMore: false});
                this.setState({noticeList: [...this.state.noticeList, ...res.data]});
            });
    }

    query() {
        this.loading = true;
        NoticeInfoModel.getAllNotice(this.page)
            .then(res => {
                this.page++;
                if(res.data.length < 20)     //每次查询记录数
                    this.setState({hasMore: false});
                this.setState({noticeList: [...this.state.noticeList, ...res.data]});
            });
    }

    queryDetail(id) {
        NoticeInfoModel.getNoticeDetail(id)
            .then(res => {
                console.log(res);
                this.setState(res)
            });
    }

    deleteNotice() {
        this.setState({articleDetailModalOpen: false});
        NoticeInfoModel.deleteNotice({noticeId: this.state.articleDetailId});
    }

    postNotice(picUrl='') {
        this.resetState();
        this.setState({postNoticeModalOpen: false})
        if(this.state.mode == 'post') {
            NoticeInfoModel.postNotice({
                title: this.state.title,
                writer: this.state.writer,
                time: this.state.time,
                article: this.state.article,
                picture: picUrl,
            })
        }
        else if(this.state.mode == 'edit') {
            NoticeInfoModel.putNotice({
                noticeId: this.state.articleDetailId,
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
        // console.log(this.state.noticeDetail);
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
                <TableHeaderColumn>文章状态</TableHeaderColumn>
                <TableHeaderColumn>查看详情</TableHeaderColumn>
                <TableHeaderColumn>编辑</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {this.state.noticeList.map((ele, idx) => {
                    let state = '未知';
                    if(ele.state == 1)
                        state = '未审核';
                    if(ele.state == 2)
                        state = '未通过';
                    if(ele.state == 3)
                        state = '已通过';
                    return (
                        <TableRow key={idx}>
                        <TableRowColumn style={{width: "20px"}}>{1 + 1*idx}</TableRowColumn>                            
                        <TableRowColumn>{ele.title}</TableRowColumn>
                        <TableRowColumn>{ele.time}</TableRowColumn>
                        <TableRowColumn>{state}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    this.setState({articleDetailId: 1*(ele.id)});
                                    this.setState({articleDetailModalOpen: true});
                                    this.setState({mode: 'post'});
                                    this.setState({articleIdx: idx});
                                    this.queryDetail(1*(ele.id));
                                    this.setState({title: '', writer: '', article: '<h1>加载新闻中</h1>', time: ''});
                                }} label="查看详情" />
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    this.setState({articleDetailId: 1*(ele.id)});
                                    this.setState({postNoticeModalOpen: true});
                                    this.setState({articleIdx: idx});
                                    this.setState({mode: 'edit'});
                                    this.queryDetail(1*(ele.id));
                                    this.setState({title: '', writer: '', article: '<h1>加载新闻中</h1>', time: ''});                                    
                                }} label="编辑通知" />
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
                <MuiThemeProvider>
                <FloatingActionButton onClick={() => {
                    this.setState({postNoticeModalOpen: true});
                    this.setState({title: '', writer: '', article: '', time: '选择日期'});
                    }} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                    <i className="fa fa-plus fa-lg"></i>
                </FloatingActionButton>
                </MuiThemeProvider>
            <PostNoticeModal open={this.state.postNoticeModalOpen} close={() => this.setState({postNoticeModalOpen: false})} mode={this.state.mode} notice={this.state.noticeDetail} noticeId={this.state.articleDetailId} props={this} detail={this.state.noticeDetail} />
            <ArticleDetail open={this.state.articleDetailModalOpen} close={() => this.setState({articleDetailModalOpen: false})} mode={this.state.mode} noticeId={this.state.articleDetailId} props={this} deleteNotice={this.deleteNotice.bind(this)} />
            </div>
        )
    }
}

class PostNoticeModal extends React.Component {
    constructor(props) {
        super(props);
        this.modules =  {
            toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
            ],
        }
        this.state = {
            picUrl: null,
        }
    }


    // componentReceiveProps() {
    //     console.log(this.props);
    //     this.setState({
    //         content: this.props.article,
    //         title: this.props.title,
    //         writer: this.props.writer,
    //         time: this.props.time,
    //     });
    // }

    submit() {
        this.props.close();
        const {title, content, writer, time} = this.state;

    }

    render() {
        let {props} = this.props;
        return (
        <MuiThemeProvider>
            <Dialog
                autoScrollBodyContent={true}
                style={{userSelect: "none", width: "60%", marginLeft: "20%"}}
                title="发布通知"
                modal={true}
                open={this.props.open}
                onRequestClose={this.props.close}
            >
            <div style={{width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", alignContent: "center"}}>
                <MuiThemeProvider>
                    <DatePicker
                    style={{display: "inline-block"}}
                    hintText={props.mode == 'post' ? "新闻时间" : props.state.time}
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        props.setState({time: props.fitDate(v)});
                        }}
                />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <TextField floatingLabelText="标题" value={props.state.title} onChange={(e, v) => props.setState({title: v})} fullWidth={true} />
                </MuiThemeProvider><br />
                <MuiThemeProvider>                
                    <TextField floatingLabelText="作者" value={props.state.writer} onChange={(e, v) => props.setState({writer: v})} fullWidth={true} />
                </MuiThemeProvider>
                </div>
                <div style={{marginTop: "50px", height: "30%"}}>
                <ReactQuill modules={this.modules} theme="snow" onChange={(s) => props.setState({article: s})} value={props.state.article} style={{height: "60%"}} />
                </div>
                <div style={{width: "100%", textAlign: "right"}}>
                <MuiThemeProvider>
                    <RaisedButton label="取消" onClick={() => this.props.close()} />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <RaisedButton style={{marginLeft: "20px"}} label="提交" onClick={() => props.postNotice(this.state.picUrl)} />
                </MuiThemeProvider>
                </div>

            </Dialog>
            </MuiThemeProvider>
        )
    }
}



class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    accept() {
        NoticeInfoModel.acceptNotice({noticeId: this.props.noticeId});
        this.props.close();
    }

    decline() {
        NoticeInfoModel.declineNotice({noticeId: this.props.noticeId});
        this.props.close();        
    }


    render() {
        setTimeout(() => dispatchEvent(new Event('resize')), 0);
        if(this.props.mode == 'edit')
            return null;
        const {title, writer, time, article} = this.props.props.state;
        return (
            <MuiThemeProvider>
            <Dialog
                autoScrollBodyContent={true}
                autoDetectWindowHeight={false}
                style={{height: "500px"}}
                title="新闻详情"
                open={this.props.open}
                onRequestClose={this.props.close}
                actions={
                    <div style={{width: "100%"}}>
                    <span style={{width: '50%', textAlign: "right"}}>
                        <MuiThemeProvider>
                            <RaisedButton label="取消" onClick={() => this.props.close()} />
                        </MuiThemeProvider><MuiThemeProvider>
                            <RaisedButton style={{marginLeft: "20px"}} label="删除新闻" onClick={() => this.props.deleteNotice()} />
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
                    <div>
                        标题：{title}<br />
                        作者：{writer}<br />
                        时间：{time}<br />
                        <div dangerouslySetInnerHTML={{__html: article}}></div>
                    </div>
                }
            />
            </MuiThemeProvider>
        )
    }
}

class NoticeBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            null
        );
    }
}