import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Auth from '../../controllers/Auth';

export default class headBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: Auth.isLogin(),
            dialogOpen: true
        };
        addEventListener('logStatusChange',() => {
            console.log(`got lsc`);
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
            <MuiThemeProvider>
            <div>
            <AppBar
                style={{zIndex: 1500}}
                title="山东大学体育场馆管理平台"
                iconElementLeft={this.props.leftIcon ? null : <i></i>}
                onLeftIconButtonTouchTap={this.props.handleDrawer}
                iconElementRight={this.state.isLogin ? <span>已登录</span> : <LoginButton openDialog={this.openDialog.bind(this)} />}
            />
            <LoginDialog closeDialog={this.closeDialog.bind(this)} open={this.state.dialogOpen} />
            </div>
            </MuiThemeProvider>
        );
    }
}

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RaisedButton onClick={this.props.openDialog} label="管理员登陆" style={{marginTop: '5px'}} />
        )
    }
}

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    render() {
        return (
        <Dialog
            contentStyle={{width: '30%', minWidth: '300px'}}
            title="管理员登陆"
            actions={[<FlatButton onClick={this.props.closeDialog} label="取消" />, <FlatButton label="登陆" onClick={() => Auth.login({username: this.state.username, password: this.state.password})} />]}
            modal={false}
            open={this.props.open}
            onRequestClose={this.props.closeDialog}
        >
        <TextField
            floatingLabelText="用户名"
            onChange={(e, v) => this.setState({username: v})}
        />
        <br />
        <TextField
            floatingLabelText="密码"
            type="password"
            onChange={(e, v) => this.setState({password: v})}            
        />

        </Dialog>
        )
    }
}