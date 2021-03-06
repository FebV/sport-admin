import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

import Auth from '../../controllers/Auth';
import User from '../../controllers/User';

export default class headBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: Auth.isLogin(),
            dialogOpen: false
        };

    }

    componentDidMount() {
        addEventListener('login ok',(e) => {
            this.setState({isLogin: Auth.isLogin()});
        })
        addEventListener('logout ok',(e) => {
            this.setState({isLogin: Auth.isLogin()});
        })
    }

    openDialog() {
        this.setState({dialogOpen: true});
    }

    closeDialog() {
        this.setState({dialogOpen: false});
    }

    render() {
        return (
            
            <div>
            <AppBar
                style={{zIndex: 1500, position: 'fixed', height: "10vh", backgroundColor: location.pathname.indexOf('admin') > -1 ? "rgb(0, 188, 212)" : '#900f13', fontWeight: "900", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", fontSize: "5vh"}}
                title="山东大学体育场馆管理平台"
                titleStyle={{fontSize: "3vh"}}
                //onLeftIconButtonTouchTap={this.props.handleDrawer}
                iconElementRight={this.state.isLogin ? <UserBio></UserBio> : <LoginButton openDialog={this.openDialog.bind(this)} />}
            />
            
            <div style={{height: "10vh"}}></div>
            {/*{location.pathname.indexOf('admin') > -1 ? null : <div style={{height: "30vh", backgroundColor: "black"}}></div>}*/}
            <LoginDialog closeDialog={this.closeDialog.bind(this)} open={this.state.dialogOpen} />
            </div>
            
        );
    }
}

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RaisedButton onClick={this.props.openDialog} label="管理员登陆" style={{marginRight: '3vw'}} />
        )
    }
}

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolnum: 'root',
            password: '123456'
        }
    }


    render() {
        return (
        <Dialog
            contentStyle={{width: '30%', minWidth: '400px'}}
            title="管理员登陆"
            actions={[
                <FlatButton onClick={this.props.closeDialog} label="取消" />,
                <FlatButton label="登陆" onClick={() => {
                        this.props.closeDialog()
                        Auth.login({schoolnum: this.state.schoolnum, password: this.state.password})
                    }} />
            ]}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.closeDialog}
        >
        <TextField
            floatingLabelText="用户名"
            value={this.state.schoolnum}
            onChange={(e, v) => this.setState({schoolnum: v})}
        />
        <br />
        <TextField
            floatingLabelText="密码"
            type="password"
            value={this.state.password}            
            onChange={(e, v) => this.setState({password: v})}            
        />

        </Dialog>
        )
    }
}

class UserBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popOpen: false,
            username: 'admin'
        }

        addEventListener('info put ok', () => this.getInfo());
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo() {
        User.getInfo()
            .then(res => this.setState({username: res.realname}));
    }

    render() {
        return(
            <div style={{float: "right"}}>
                <Avatar onClick={ e => {
                    e.preventDefault();
                    this.setState({popOpen: true, anchorEl: e.currentTarget})
                    }} className="fa fa-user-circle-o" />
                <Popover
                    open={this.state.popOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={() => {this.setState({popOpen: false})}}
                >
                <Menu>
                    {<Link to="/admin/mine">
                        <MenuItem primaryText="管理员视图" />
                    </Link>}
                    <MenuItem onClick={Auth.logout} primaryText="退出登陆" />
                </Menu>
                </Popover>
                <span style={{margin: "0px 20px", fontSize: "15px"}}>欢迎， {this.state.username}</span>
            </div>
        )
    }
}