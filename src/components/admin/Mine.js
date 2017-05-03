import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';


import User from '../../controllers/User';
import Auth from '../../controllers/Auth';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.schoolNameMap = {
            'mu': '综合体育馆',
            'zx': '中心校区',
            'hj': '洪家楼校区',
            'qf': '千佛山校区',
            'bt': '趵突泉校区',
            'xl': '兴隆山校区',
            'rj': '软件园校区',
        }

        this.tfs = [
                {
                    floatHint: '账号',
                    name: 'schoolnum',
                },
                {
                    floatHint: '校区',
                    name: 'campus',
                },
                {
                    floatHint: '姓名',
                    name: 'realname',
                },
                {
                    floatHint: '电话',
                    name: 'tel',
                },
            ],
        this.state = {
            schoolnum: '',
            realname: '',
            level: '',
            campus: '',
            tel: '',
            switch: [true, true, true, true, true],
            changePassDialogOpen: false,
        }
        addEventListener('info put ok', () => this.getInfo.bind(this));
    }

    componentDidMount() {
        if(Auth.isLogin())
            this.getInfo();
        addEventListener('login ok', () => {
            this.getInfo();
        });
        addEventListener('logout ok', () => {
            this.setState({
                schoolnum: '',
                realname: '',
                campus: '',
                tel: '',
                level: null,
                switch: [true, true, true, true, true]
            })
        });
    }

    getInfo() {
        User.getInfo()
            .then(res => this.setState({
                schoolnum: res.schoolnum,
                realname: res.realname,
                campus: this.schoolNameMap[res.campus],
                tel: res.tel
            }));
        User.getLevel(true)
            .then(res => {
                //console.log(res);
                this.setState({level: res})
            });
    }

    putInfo() {
        User.putInfo(this.state);
    }

    switchModify(index) {
        let newSwitch = this.state.switch.map( (e, idx) => {
            if(idx == index) {
                e = !e;
            if(e)
                this.putInfo();
            }
            return e;
        })
        this.setState({switch: newSwitch});
    }

    handleModify(ev, nv, name) {
        this.setState({[name]: nv});
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <MuiThemeProvider>
            <Paper style={{padding: "50px", margin: '20px'}}>
            <div>个人资料</div>
            {this.tfs.map( (e, idx) => {
                const val = e.name == 'campus' ? this.schoolNameMap[this.state[e.name]] : this.state[e.name];
                return (
                    <div key={idx}>
                    <TextField
                        floatingLabelText={e.floatHint}
                        disabled={this.state.switch[idx]}
                        value={this.state[e.name]}
                        onChange={(ev, nv) => this.handleModify(ev, nv, e.name)}
                    />
                    <RaisedButton style={{marginLeft: '40px'}} disabled={ (idx < 3 ) || !Auth.isLogin() ? true : false} onClick={() => this.switchModify(idx)} label={this.state.switch[idx] ? "修改" : "确定"}  />
                    </div>
                );
            })}
            <RaisedButton style={{float: "right", marginTop: "20px"}} label="修改密码" onClick={() => this.setState({changePassDialogOpen: true})} />
            </Paper>
            </MuiThemeProvider>
            {
                this.state.level
                    ?
            <MuiThemeProvider>
            <Paper style={{width: "80%", textAlign: "center", marginTop: "20px"}}>
                <h2 style={{margin: "10px"}}>个人权限表</h2>
            <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                {Object.keys(this.state.level).map( (e, idx) =>{
                    if(this.schoolNameMap[e])
                        return <TableHeaderColumn key={idx} >{this.schoolNameMap[e]}</TableHeaderColumn>
                    else
                        return null;
                })}
                {['财务管理', '新闻审核', '器材管理'].map( (e, idx) => {
                    return <TableHeaderColumn key={10+idx} >{e}</TableHeaderColumn>
                })}
                </TableRow>
            </TableHeader>
            {<TableBody
                displayRowCheckbox={false}
            >
            {<TableRow>
                {Object.keys(this.state.level).map( (e, idx) =>{
                    const CampusLevelMap = [
                        '没有权限',
                        '场馆管理员',
                        '井老师',
                        '院长',
                    ];
                    if(this.schoolNameMap[e])
                        return <TableHeaderColumn key={idx} >{CampusLevelMap[this.state.level[e]]}</TableHeaderColumn>
                    else
                        return null;
                })}
                {['finance', 'news', 'equipment'].map( (e, idx) => {
                    const OperationMap = ['没有权限', '拥有权限']
                    return <TableHeaderColumn key={10+idx} >{OperationMap[this.state.level[e]]}</TableHeaderColumn>
                })}
                </TableRow>
            })}
            </TableBody>}
            </Table>
            </Paper>
            </MuiThemeProvider>
                :
                null
            }
            <ChangePassDialog open={this.state.changePassDialogOpen} close={() => this.setState({changePassDialogOpen: false})} />
            </div>
        )
    }
}

class ChangePassDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            newPassRepeat: '',
        }
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
            <Dialog
                contentStyle={{width: "500px"}}
                title="修改密码"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
            >
            <TextField type="password" floatingLabelText="原密码" value={this.state.oldPass} onChange={(e, v) => this.setState({oldPass: v})} /><br />
            <TextField type="password" floatingLabelText="新密码" value={this.state.newPass} onChange={(e, v) => this.setState({newPass: v})} /><br />
            <TextField floatingLabelText="新密码" value={this.state.newPassRepeat} onChange={(e, v) => this.setState({newPassRepeat: v})} errorText={this.state.newPass == this.state.newPassRepeat ? "" : "两次输入不一致"} /><br />
            <div style={{marginTop: '20px'}}>
                <RaisedButton label="确认修改" onClick={() => {
                        this.props.close();
                        User.putPass({
                            old_password: this.state.oldPass,
                            new_password: this.state.newPass,
                            new_password_re: this.state.newPassRepeat,
                        })
                    }} />
                <RaisedButton style={{marginLeft: '20px'}} label="取消" />
            </div>
            </Dialog>
            </div>
            </MuiThemeProvider>
        )
    }
}