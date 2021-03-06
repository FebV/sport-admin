import React from 'react';

import NoticeModel from '../../controllers/Notice'
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CommentModel from '../../controllers/Comment'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Carousel from 'react-bootstrap/lib/Carousel';
import Auth from '../../controllers/Auth';
import { Link } from 'react-router-dom';

export default class Notice extends React.Component {
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
            hasMore: true,
        }
        window.onscroll =  e => {
            if(this.isLoading)
                return;
            if(!this.state.hasMore)
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
    }

    componentDidMount() {
        this.page = 1;
        this.state.comments = [];
        this.query();
    }

    query() {
        if(!this.state.hasMore)
            return;
        this.setState({loading: true});
        this.isLoading = true;
        NoticeModel.getPublishedNotice(this.page, 20)
            .then(res => {
                this.isLoading = false;
                this.setState({loading: false});
                if(res.data.length > 0) {
                    this.setState({comments: [...this.state.comments, ...res.data]});
                }
                if(res.data.length < 20){
                    this.setState({hasMore: false})
                }
            });
    }
    
    render() {
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>

            
            <div style={{width: "calc(100% - 40px)", display: "flex", justifyContent: "center", padding: "20px"}}>
            <div style={{width: "80%", padding: "20px", border: "1px solid rgb(144, 15, 19)", borderRadius: "20px"}}>
                <h4>最新通知</h4>
                <hr style={{borderTop: "1px solid black", border: "asda"}} />
            <List>
                {this.state.comments.map( (ele, idx) => {
                    return (
                        <Link to={`/notice/${ele.id}`} key={idx}>
                            <div key={idx} style={{padding: "5px 25px"}}>
                            { idx != 0 ? <Divider /> : null}
                            <img src="/static/img/NewsIcon.gif" style={{margin: "0px 10px", position: "relative", top: "5px"}} />
                            <span style={{lineHeight: "20px", position: "relative", top: '5px'}}>{ele.title}</span>
                            <span style={{float: 'right', position: "relative", top: '5px'}}>{ele.time}</span>
                            </div>
                        </Link>
                    )
                })}
            </List>
            </div>
            </div>
            
            </div>
        );
        /*return (
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{width: "50%"}}>
            {this.state.comments.length == 0 && !this.state.loading
                ?
            <div style={{width: "100%", height: "80%", marginTop: "30%", textAlign: "center", fontSize: "5vh", color: "gray"}}>暂无评论</div> : ''}
            
            {this.state.comments.map((ele, idx) => {
                return (
                    <MuiThemeProvider key={idx}>
                    <Card style={{margin: "50px", width: "80%"}}>
                    <CardHeader
                    title={ele.id+" --- "+ele.title}
                    subtitle={ele.created_at}
                    />
                    <CardText>
                    {ele.content}
                    </CardText>
                    <CardActions style={{textAlign: 'right'}}>
                    { Auth.isLogin()
                    ?
                    <div>
                    <FlatButton label="查看联系方式" onClick={() => {
                        alert(`姓名：${ele.name}\n邮箱：${ele.email}\n电话：${ele.tel}`);
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
            

            </div>
        )*/
    }
}


            {/*<DeleteDialog
                open={this.state.deleteDialogOpen}
                close={() => this.setState({deleteDialogOpen: false})}
                deleteCommentId={this.state.deleteCommentId}
            />*/}
// class Notice extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             noticelist: [],
//         }
//     }



//     render() {
//         return (
//             <div>notice</div>
//         )
//     }
// }