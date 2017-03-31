import React from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import User from '../../controllers/User';

export default class Privilege extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        }
    }

    select(index) {
        this.setState({selectedIndex: index});
    }

    render() {
        return (
        <div style={{height: "calc(100% - 48px - 64px)"}}>
        
        <div style={{padding: "50px"}}>
            {this.state.selectedIndex == 0 ? <Profile /> : null}
            {this.state.selectedIndex == 2 ? <Creation /> : null}
        </div>
        <Paper style={{position: 'absolute', bottom: "0px", width: "100%"}}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="编辑资料"
            icon={<i className="fa fa-pencil-square-o"></i>}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="查看信息"
            icon={<i className="fa fa-cog"></i>}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="创建删除"
            icon={<i className="fa fa-key"></i>}
            onTouchTap={() => this.select(2)}
          />
          <BottomNavigationItem
            label="内务管理"
            icon={<i className="fa fa-user"></i>}
            onTouchTap={() => this.select(3)}
          />
        </BottomNavigation>
        </Paper>
        </div>
        )
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tfs: [
                {
                    floatHint: '账号',
                    disabled: true,
                    name: 'schoolnum',
                },
                {
                    floatHint: '用户名',
                    disabled: true,
                    name: 'username',
                },
                {
                    floatHint: '姓名',
                    disabled: true,
                    name: 'realname',
                },
                {
                    floatHint: '校区',
                    disabled: true,
                    name: 'campus',
                },
                {
                    floatHint: '电话',
                    disabled: true,
                    name: 'tel',
                },
            ],
            info: {
                schoolnum: 'gagagaga',
                username: '',
                realname: '',
                campus: '',
                tel: '',
            }
        }
    }

    componentDidMount() {
        User.getInfo()
            .then(res => this.setState({info: res}));
    }

    switchModify(index) {
        let tfs = [...this.state.tfs];
        let isModify = false;
        let newTfs = tfs.map( (e, idx) => {
            if(idx == index) {
                if(e.disabled == false)
                    isModify = true;
                let newE = {floatHint: e.floatHint, name: e.name, disabled: !e.disabled};
                return newE;
            }
            return e;
        })
        this.setState({tfs: newTfs});
        if(isModify)
            console.log`modify`;
    }

    handleModify(ev, nv, name) {
        let newInfo = this.state.info;
        for(let i in newInfo) {
            if(i == name)
                newInfo[name] = nv;
        }
        this.setState({info: newInfo});
    }

    render() {
        return (
            <Paper  style={{padding: "50px"}}>
            <div>个人资料</div>
            {this.state.tfs.map( (e, idx) => {
                return (
                    <div key={idx}>
                    <TextField
                        floatingLabelText={e.floatHint}
                        disabled={e.disabled}
                        value={this.state.info[e.name]}
                        onChange={(ev, nv) => this.handleModify(ev, nv, e.name)}
                    />
                    <RaisedButton style={{marginLeft: '40px'}} disabled={idx == 0 ? true : false} onClick={() => this.switchModify(idx)} label={e.disabled ? "修改" : "确定"}  />
                    </div>
                );
            })}
            </Paper>
        )
    }
}

class Creation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Paper style={{padding: "50px"}}>
                <div>创建管理员</div>
                <TextField 
                    floatingLabelText="账号"
                />
                <br />
                <TextField 
                    floatingLabelText="校区"
                />
                <br />                
                <TextField 
                    floatingLabelText="密码"
                />
                <br />
                <RaisedButton
                    style={{marginTop: "20px"}}
                    label="创建"
                />
                </Paper>
            </div>
        )
    }
}