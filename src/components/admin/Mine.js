import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
                    floatHint: '管理员级别',
                    name: 'level',
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
            switch: [true, true, true, true, true]
        }
    }

    componentDidMount() {
        if(Auth.isLogin())
            this.getInfo();
        addEventListener('login', () => {
            this.getInfo();
        });
        addEventListener('logout', () => {
            this.setState({
                schoolnum: '',
                realname: '',
                campus: '',
                tel: '',
                level: '',
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
        User.getLevel()
            .then(res => this.setState({
                level: res,
            }));
    }

    putInfo() {
        User.putInfo(this.state);
        addEventListener('info put ok', () => setTimeout(() => {this.getInfo(), 0}));
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
            <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{padding: "50px"}}>
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
            </Paper>
            </MuiThemeProvider>
            </div>
        )
    }
}