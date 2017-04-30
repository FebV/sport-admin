import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Auth from '../../controllers/Auth';
import User from '../../controllers/User';

export default class Account extends React.Component {
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
        },
        this.deleteInitStyle = 
        {
            marginLeft: "5px",            
            padding: "2px",
            border: "2px solid black",
            borderRadius: "20%",
            transform: "scale(1.2)",            
            transition: "all 0.2s",
        }
        this.deleteHoverStyle = 
        {
            marginLeft: "5px",
            padding: "2px",
            border: "2px solid black",
            borderRadius: "20%",
            transform: "scale(1.2)",
            transition: "all 0.2s",
            cursor: "pointer"
        }
        this.state = {
            accounts: [],
            addAdminDialogOpen: false,
            level: null,
            deleteIndex: null,
            authIndex: null,
            deleteAdminDialogOpen: false,
            deleteAdminId: null,
            authAdminId: null,
            authAdminDialogOpen: false,
            permission: null,
        }

        addEventListener('user post ok', () => {
            this.getPeople();
        });
        addEventListener('user delete ok', () => {
            this.getPeople();
        });
        addEventListener('user auth ok', () => {
            this.getPeople();
        });
    }

    componentDidMount() {
        if(!Auth.isLogin())
            return;
        this.getPeople();
        User.getLevel()
            .then(res => this.setState({level: res}));
    }

    getPeople() {
        User.getPeople()
            .then(res => this.setState({accounts: res}));
    }

    handleCloseAddAdminDialog() {
        this.setState({addAdminDialogOpen: false});
    }

    handleOpenAddAdminDialog() {
        this.setState({addAdminDialogOpen: true});
    }

    handleDeleteDialogOpen() {
        this.setState({deleteAdminDialogOpen: !this.state.deleteAdminDialogOpen});
    }
    handleAuthDialogOpen() {
        this.setState({authAdminDialogOpen: !this.state.authAdminDialogOpen});
    }

    deleteAdmin() {
        User.deletePeople(this.state.deleteAdminId);
    }

    authAdmin() {
        User.authPeople(this.state.authAdminId, this.state.permission);
    }

    render() {
        return (
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{width: "80%"}}>
            <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn>账号</TableHeaderColumn>
                <TableHeaderColumn>校区</TableHeaderColumn>
                <TableHeaderColumn>姓名</TableHeaderColumn>
                <TableHeaderColumn>联系方式</TableHeaderColumn>
                <TableHeaderColumn>常用操作</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.accounts.map( (e, idx) => {
                return (
                    <TableRow key={idx}> 
                        <TableRowColumn>{e.schoolnum}</TableRowColumn>
                        <TableRowColumn>{this.schoolNameMap[e.campus]}</TableRowColumn>
                        <TableRowColumn>{e.realname}</TableRowColumn>
                        <TableRowColumn>{e.tel}</TableRowColumn>
                        <TableRowColumn>
                            <i 
                            title="删除"
                            style={ this.state.deleteIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({deleteIndex: idx})}
                            onMouseLeave={() => this.setState({deleteIndex: null})}
                            onClick={ () => {
                                this.handleDeleteDialogOpen();
                                this.setState({deleteAdminId: e.u_id});
                            }}
                            className="fa fa-times">
                            </i>
                            <i 
                            title={"设置权限"}
                            style={ this.state.authIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({authIndex: idx})}
                            onClick={ () => {
                                this.setState({authIndex: idx});
                                this.setState({authAdminId: e.u_id, permission: e.permission % 2 + 1});
                                this.handleAuthDialogOpen();
                            }}
                            className={"fa fa-check-square-o"}>
                            </i>
                        </TableRowColumn>
                    </TableRow>
                )
            })}
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
            <MuiThemeProvider>
            <FloatingActionButton onClick={this.handleOpenAddAdminDialog.bind(this)} style={{position: 'absolute', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            </MuiThemeProvider>
            <AddAdmin handleClose={this.handleCloseAddAdminDialog.bind(this)} handleOpen={this.handleOpenAddAdminDialog.bind(this)} open={this.state.addAdminDialogOpen} />
            <DeleteAdmin deleteAdmin={this.deleteAdmin.bind(this)} toggle={this.handleDeleteDialogOpen.bind(this)} open={this.state.deleteAdminDialogOpen} />
            <AuthAdmin props={this} toggle={this.handleAuthDialogOpen.bind(this)} open={this.state.authAdminDialogOpen} />
            </div>
        )
    }
}

class AddAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.schoolNameMap = {
            '综合体育馆': 'mu',
            '中心校区': 'zx',
            '洪家楼校区': 'hj',
            '千佛山校区': 'qf',
            '趵突泉校区': 'bt',
            '兴隆山校区': 'xl',
            '软件园校区': 'rj',
        },
        this.state = {
            schoolnum: '',
            password: '',
            realname: '',
            campus: '综合体育馆',
            level: null,
        }
    }

    componentDidMount() {
        if(Auth.isLogin())
        User.getLevel()
            .then(res => this.setState({level: 1*res}));
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v});
    }

    handleAddAdmin() {
        this.props.handleClose();
        return User.postPeople({
            schoolnum: this.state.schoolnum,
            password: this.state.password,
            realname: this.state.realname,
            campus: this.schoolNameMap[this.state.campus],
            grade: this.state.level+1,
        });
    }

    render() {
        return (
            <MuiThemeProvider>
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="创建管理员"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.handleClose}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.handleAddAdmin.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
            >
                <DropDownMenu
                    value={this.state.campus}
                    onChange={this.handleCampusChange.bind(this)}
                >
                    <MenuItem value={"综合体育馆"} primaryText="综合体育馆" />
                    <MenuItem value={"中心校区"} primaryText="中心校区" />
                    <MenuItem value={"洪家楼校区"} primaryText="洪家楼校区" />
                    <MenuItem value={"千佛山校区"} primaryText="千佛山校区" />
                    <MenuItem value={"趵突泉校区"} primaryText="趵突泉校区" />
                    <MenuItem value={"兴隆山校区"} primaryText="兴隆山校区" />
                    <MenuItem value={"软件园校区"} primaryText="软件园校区" />
                </DropDownMenu>
                <TextField
                    floatingLabelText="账号"
                    value={this.state.schoolnum}
                    onChange={(e, v) => this.setState({schoolnum: v})}
                /><br />
                <TextField
                    floatingLabelText="姓名"
                    value={this.state.realname}
                    onChange={(e, v) => this.setState({realname: v})}
                /><br />
                <TextField
                    floatingLabelText="密码"
                    value={this.state.password}
                    onChange={(e, v) => this.setState({password: v})}                    
                /><br />
                
            </Dialog>
            </MuiThemeProvider>
        )
    }
}

class DeleteAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
            <Dialog
                style={{width: "400px", marginLeft: "calc(50% - 200px)"}}
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.toggle}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={() => {
                            this.props.deleteAdmin();
                            this.props.toggle();
                        }}
                    />
                ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.toggle}
                >
                删除该管理员？
            </Dialog>
            </MuiThemeProvider>
        )
    }
}

class AuthAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campus: 'zx',
        }
    }

    postAuth() {
        const state = this.props.props.state;
        const account = state.accounts[state.authIndex];
        const permisson = Object.assign({}, this.state);
        permisson.u_id = account.u_id;
        delete permisson['campus'];
        User.authPeople(account.u_id, permisson);
    }

    render() {
        // if(!this.props.authIndex)
        //     return null;
        const state = this.props.props.state;
        const account = state.accounts[state.authIndex];//[this.props.props.state.authIndex];
        if(!account)
            return null;
        let {campus} = account;
        console.log(account);
        console.log(this.state.campus);
        console.log(account[this.state.campus]);
        return (
            <MuiThemeProvider>
            <Dialog
                style={{width: "400px", marginLeft: "calc(50% - 200px)"}}
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.toggle}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={() => {
                            this.postAuth();
                            this.props.toggle();
                        }}
                    />
                ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.toggle}
                >
                <DropDownMenu
                    value={this.state.campus}
                    onChange={(e, k, v) => {
                        this.setState({campus: v})
                    }}
                >
                    <MenuItem value={"mu"} primaryText="综合体育馆" />
                    <MenuItem value={"zx"} primaryText="中心校区" />
                    <MenuItem value={"hj"} primaryText="洪家楼校区" />
                    <MenuItem value={"qf"} primaryText="千佛山校区" />
                    <MenuItem value={"bt"} primaryText="趵突泉校区" />
                    <MenuItem value={"xl"} primaryText="兴隆山校区" />
                    <MenuItem value={"rj"} primaryText="软件园校区" />
                </DropDownMenu>
                <RadioButtonGroup onChange={(e, v) => {
                        this.setState({[this.state.campus]: v}, () => console.log(this.state))
                    }} name="shipSpee" valueSelected={this.state[this.state.campus] || account[this.state.campus]}>
                    <RadioButton
                        value={'0'}
                        label="无权限"
                    />
                    <RadioButton
                        value={'1'}
                        label="场地管理"
                    />
                    <RadioButton
                        value={'2'}
                        label="井老师"
                    />
                    <RadioButton
                        value="ludicrous"
                        label="院长"
                    />
                    </RadioButtonGroup>
                <Checkbox label="财务管理" onCheck={(e, v) => this.setState({finance: v})} checked={this.state.finance || account.finance == '1'} />
                <Checkbox label="新闻管理" onCheck={(e, v) => this.setState({news: v})} checked={this.state.news || account.news == '1'} />
                <Checkbox label="器材管理" onCheck={(e, v) => this.setState({equipment: v})} checked={this.state.equipment || account.equipment == '1'} />
            </Dialog>
            </MuiThemeProvider>
        )
    }
}