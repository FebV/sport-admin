import React from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
        <div style={{height: "calc(100% - 48px - 64px - 20px)"}}>
        
        {this.state.selectedIndex == 0 ? <Profile /> : null}

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
                schoolnum: 'root',
                username: '',
                realname: '',
                campus: '',
                tel: '',
            }
        }
    }

    switchModify(index) {
        let tfs = [...this.state.tfs];
        let newTfs = tfs.map( (e, idx) => {
            if(idx == index) {
                let newE = {floatHint: e.floatHint, name: e.name, disabled: !e.disabled};
                return newE;
            }
            return e;
        })
        this.setState({tfs: newTfs});
    }

    render() {
        return (
            <Paper style={{margin: "20px", padding: "40px"}}>
            {this.state.tfs.map( (e, idx) => {
                return (
                    <div key={idx}>
                    <TextField
                        floatingLabelText={e.floatHint}
                        disabled={e.disabled}
                        value={this.state.info[e.name]}
                    />
                    <RaisedButton style={{marginLeft: '40px'}} onClick={() => this.switchModify(idx)} label={e.disabled ? "修改" : "确定"}  />
                    </div>
                );
            })}
            </Paper>
        )
    }
}