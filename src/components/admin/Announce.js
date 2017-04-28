import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Awesome from '../common/RichEditor';
import RichTextEditor from 'react-rte';
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import NewsInfoModel from '../../controllers/NewsInfo';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class Announce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            postNewsModalOpen: false,
            articleDetailModalOpen: false,
            articleDetailId: null,
            newsDetail: null,
            mode: 'post', //or edit
            title: '',
            writer: '',
            article: '',
            time: '',
        }

        addEventListener('put news ok', () => this.componentDidMount());
        addEventListener('post news ok', () => this.componentDidMount());
        addEventListener('accept news ok', () => this.componentDidMount());
        addEventListener('decline news ok', () => this.componentDidMount());
    }

    componentDidMount() {
        NewsInfoModel.getAllNews(0)
            .then(res => {
                this.setState({newsList: res});
            });
    }

    queryDetail(id) {
        NewsInfoModel.getNewsDetail(id)
            .then(res => {
                console.log(res);
                this.setState(res)//, () => this.forceUpdate())
            });
    }

    postNews() {
        NewsInfoModel.postNews({
            title: this.state.title,
            writer: this.state.writer,
            time: this.fitDate(this.state.time),
            article: this.state.content,
        })
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
        // console.log(this.state.newsDetail);
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
                {this.state.newsList.map((ele, idx) => {
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
                                }} label="查看详情" />
                        </TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    this.setState({articleDetailId: 1*(ele.id)});
                                    this.setState({postNewsModalOpen: true});
                                    this.setState({articleIdx: idx});
                                    this.setState({mode: 'edit'});
                                    this.queryDetail(1*(ele.id));
                                }} label="编辑新闻" />
                        </TableRowColumn>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
                <MuiThemeProvider>
                <FloatingActionButton onClick={() => this.setState({postNewsModalOpen: true})} style={{position: 'absolute', right: "30px", bottom: "30px"}}>
                    <i className="fa fa-plus fa-lg"></i>
                </FloatingActionButton>
                </MuiThemeProvider>
            <PostNewsModal open={this.state.postNewsModalOpen} close={() => this.setState({postNewsModalOpen: false})} mode={this.state.mode} news={this.state.newsDetail} newsId={this.state.articleDetailId} props={this} detail={this.state.newsDetail} />
            <ArticleDetail open={this.state.articleDetailModalOpen} close={() => this.setState({articleDetailModalOpen: false})} mode={this.state.mode} newsId={this.state.articleDetailId} detail={this.state.newsDetail} />
            </div>
        )
    }
}

class PostNewsModal extends React.Component {
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
                title="发布新闻"
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
                        props.setState({time: v});
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
                    <RaisedButton style={{marginLeft: "20px"}} label="提交" onClick={props.postNews.bind(props)} />
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
        NewsInfoModel.acceptNews({newsId: this.props.newsId});
        this.props.close();
    }

    decline() {
        NewsInfoModel.declineNews({newsId: this.props.newsId});
        this.props.close();        
    }


    render() {
        setTimeout(() => dispatchEvent(new Event('resize')), 500);
        if(!this.props.detail || this.props.mode == 'edit')
            return null;
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
                        标题：{this.props.detail.title}<br />
                        作者：{this.props.detail.writer}<br />
                        时间：{this.props.detail.time}<br />
                        <div dangerouslySetInnerHTML={{__html: this.props.detail.article}}></div>
                    </div>
                }
            />
            </MuiThemeProvider>
        )
    }
}