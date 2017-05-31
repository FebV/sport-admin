import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import Checkbox from 'material-ui/Checkbox';

import Schedule from '../../controllers/Schedule';
import Applies from '../../controllers/Applies';
import camGym from '../../config/cam-gym';

export default class Apply extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        d.setDate(d.getDate() + 5);
        this.defaultDate = d;
        d = new Date();
        this.disabledDate = d.setDate(d.getDate() + 4);
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six'];
        this.state = {
            campus: 'zx',
            gym: 'basketball',
            time: null,
            classtime: Array(14).fill(false),
            major: '',
            content: '',
            pnumber: '',
            charger: '',
            tel: '',
            num: '',
            teacher: '',
            teacher_tel: '',
            remark: '',
            department: '',
            classtimeDisTable: Array(14).fill(false)
        }
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v})
    }

    handleGymChange(e, k, v) {
        this.setState({gym: v})
    }

    handleDateChange(n, v) {
        const formatTime = this.fitDate(v);
        this.setState({time: formatTime});
        Schedule.getSchedulesOfDay({campus: this.state.campus, gym: this.state.gym, day: formatTime})
            .then(res => {
                if(res != null) {
                    let disTable = [];
                    this.serial.map(ele => {
                        disTable.push(res[ele] != '体育教学' ? true : false);
                    })
                    this.setState({classtimeDisTable: disTable});
                }
            });
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

    resetState() {
        this.setState({
            campus: 'zx',
            gym: 'basketball',
            major: '',
            content: '',
            pnumber: '',
            charger: '',
            tel: '',
            num: '',
            teacher: '',
            teacher_tel: '',
            remark: '',
            department: '',
        });
    }

    postInnerApply() {
        let ClsTime = [];
        this.state.classtime.map( (e, idx) => {
            if(e)
                ClsTime.push(this.serial[idx]);
        });
        ClsTime = ClsTime.join(',');
        Applies.postInnerApply({
            campus: this.state.campus,
            gym: this.state.gym,
            time: this.state.time,
            classtime: ClsTime,
            major: this.state.major,
            content: this.state.content,
            pnumber: this.state.pnumber,
            charger: this.state.charger,
            num: this.state.num,
            tel: this.state.tel,
            remark: this.state.remark,
            teacher: this.state.teacher,
            teacher_tel: this.state.teacher_tel,
        })
        this.resetState();
    }

    postOuterApply() {
        let ClsTime = [];
        this.state.classtime.map( (e, idx) => {
            if(e)
                ClsTime.push(this.serial[idx]);
        });
        ClsTime = ClsTime.join(',');
        Applies.postOuterApply({
            campus: this.state.campus,
            gym: this.state.gym,
            time: this.state.time,
            classtime: ClsTime,
            num: this.state.num,
            department: this.state.department,
            content: this.state.content,
            charger: this.state.charger,
            tel: this.state.tel,
        })
        this.resetState();
        
    }

    render() {
        return (
            
            <div style={{width:"100%", display: "flex", justifyContent: "center"}}>
            <Tabs style={{width: "40%"}}>
                <Tab label="校内申请" style={{backgroundColor: "#DD2C00"}}>
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "80%", textAlign: "center", margin: "20px 0", padding: "20px 0"}}>
                校区
            
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.campus}
                onChange={this.handleCampusChange.bind(this)}
            >
                <MenuItem value={"mu"} primaryText="综合体育馆" />
                <MenuItem value={"zx"} primaryText="中心校区" />
                <MenuItem value={"hj"} primaryText="洪家楼校区" />
                <MenuItem value={"qf"} primaryText="千佛山校区" />
                <MenuItem value={"bt"} primaryText="趵突泉校区" />
                <MenuItem value={"xl"} primaryText="兴隆山校区" />
                <MenuItem value={"rj"} primaryText="软件园校区" />
            </DropDownMenu>
            
            场馆
            
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.gym}
                    onChange={this.handleGymChange.bind(this)}
                >
                    {camGym[this.state.campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}
                    
                </DropDownMenu>
            <br />
                <DatePicker
                    style={{display: "inline-block", marginTop: "20px"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    shouldDisableDate={d => d < this.disabledDate}
                    onChange={this.handleDateChange.bind(this)}
                /><br />
                <div style={{marginTop: "10px 0"}}>使用节次</div>
                <div style={{textAlign: "left"}}>
                    {/*{[...Array(14).keys()].map( (e, idx) => {
                        //console.log(this.state.classtimeDisTable)
                        let base = idx < 2 ? 8  : 10;
                        return (
                            <span key={e}><Checkbox
                                style={{marginLeft: "40%"}}
                                label={`${base + idx * 2}:00 - ${base + 2 + idx * 2}:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[idx]}
                            /></span>)
                    })}*/}
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`6:00 - 8:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[0]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`8:00 - 9:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[1]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`9:00 - 10:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[2]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`10:00 - 11:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[3]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`11:00 - 12:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[4]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`12:00 - 13:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[5]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`13:00 - 14:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[6]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`14:00 - 15:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[7]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`15:00 - 16:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[8]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`16:00 - 17:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[9]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`17:00 - 18:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[10]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`18:00 - 19:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[11]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`19:00 - 20:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[12]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`20:00 - 21:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[13]}
                        />
                    </span>
                </div>
                <TextField
                    value={this.state.major}
                    onChange={(e, v) => this.setState({major: v})}
                    floatingLabelText="使用学院"
                /><br />
                <TextField
                    value={this.state.content}                
                    onChange={(e, v) => this.setState({content: v})}                
                    floatingLabelText="活动内容"
                /><br />
                <TextField
                    value={this.state.pnumber}                
                    onChange={(e, v) => this.setState({pnumber: v})}                
                    floatingLabelText="参加人数"
                /><br />
                <TextField 
                    value={this.state.charger}                
                    onChange={(e, v) => this.setState({charger: v})}                
                    floatingLabelText="负责人姓名"
                /><br />
                <TextField
                    value={this.state.tel}                
                    onChange={(e, v) => this.setState({tel: v})}                
                    floatingLabelText="联系方式（手机）"
                /><br />
                <TextField
                    value={this.state.num}                
                    onChange={(e, v) => this.setState({num: v})}                
                    floatingLabelText="申请数量"
                /><br />
                <TextField
                    value={this.state.teacher}                
                    onChange={(e, v) => this.setState({teacher: v})}                
                    floatingLabelText="学院老师姓名"
                /><br />
                <TextField
                    value={this.state.teacher_tel}                
                    onChange={(e, v) => this.setState({teacher_tel: v})}                
                    floatingLabelText="学院老师电话（手机）"
                /><br />
                <TextField
                    value={this.state.remark}                
                    onChange={(e, v) => this.setState({remark: v})}
                    floatingLabelText="备注"
                /><br />
                <RaisedButton
                    onClick={this.postInnerApply.bind(this)}
                    label="提交"
                />
                </Paper>
                </div>
                </Tab>
                <Tab label="校外申请" >
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "80%", textAlign: "center", margin: "20px 0", padding: "20px 0"}}>
                校区
            
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.campus}
                onChange={this.handleCampusChange.bind(this)}
            >
                <MenuItem value={"mu"} primaryText="综合体育馆" />
                <MenuItem value={"zx"} primaryText="中心校区" />
                <MenuItem value={"hj"} primaryText="洪家楼校区" />
                <MenuItem value={"qf"} primaryText="千佛山校区" />
                <MenuItem value={"bt"} primaryText="趵突泉校区" />
                <MenuItem value={"xl"} primaryText="兴隆山校区" />
                <MenuItem value={"rj"} primaryText="软件园校区" />
            </DropDownMenu>
            
            场馆
            
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.gym}
                    onChange={this.handleGymChange.bind(this)}
                >
                    {camGym[this.state.campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}
                    
                </DropDownMenu>
            <br />
                <DatePicker
                    style={{display: "inline-block", marginTop: "20px"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    shouldDisableDate={d => d < this.disabledDate}
                    onChange={this.handleDateChange.bind(this)}
                /><br />
                <div style={{marginTop: "10px 0"}}>使用节次</div>
                <div style={{textAlign: "left"}}>
                    {/*{[...Array(6).keys()].map( (e, idx) => {
                        console.log(this.state.classtimeDisTable)
                        let base = idx < 2 ? 8  : 10;
                        return (
                            <span key={e}><Checkbox
                                style={{marginLeft: "40%"}}
                                label={`${base + idx * 2}:00 - ${base + 2 + idx * 2}:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[idx]}
                            /></span>)
                    })}*/}
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`6:00 - 8:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[0]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`8:00 - 9:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[1]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`9:00 - 10:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[2]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`10:00 - 11:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[3]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`11:00 - 12:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[4]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`12:00 - 13:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[5]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`13:00 - 14:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[6]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`14:00 - 15:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[7]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`15:00 - 16:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[8]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`16:00 - 17:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[9]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`17:00 - 18:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[10]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`18:00 - 19:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[11]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`19:00 - 20:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[12]}
                        />
                    </span>
                    <span>
                        <Checkbox
                                style={{marginLeft: "40%"}}
                                label={`20:00 - 21:00`}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[13]}
                        />
                    </span>
                </div>
                <TextField
                    value={this.state.department}                
                    onChange={(e, v) => this.setState({department: v})}
                    floatingLabelText="使用单位"
                /><br />
                <TextField
                    value={this.state.content}                
                    onChange={(e, v) => this.setState({content: v})}                
                    floatingLabelText="活动内容"
                /><br />
                <TextField
                    value={this.state.num}                
                    onChange={(e, v) => this.setState({num: v})}                
                    floatingLabelText="申请数量"
                /><br />
                <TextField 
                    value={this.state.charger}                
                    onChange={(e, v) => this.setState({charger: v})}                
                    floatingLabelText="负责人姓名"
                /><br />
                <TextField
                    value={this.state.tel}                
                    onChange={(e, v) => this.setState({tel: v})}                
                    floatingLabelText="联系方式"
                /><br />
                <RaisedButton
                    onClick={this.postOuterApply.bind(this)}
                    label="提交"
                />
                </Paper>
                </div>
                </Tab>
            </Tabs>
            </div>
            
        )
    }
}