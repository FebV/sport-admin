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
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
        this.state = {
            campus: 'zx',
            gym: 'basketball',
            time: null,
            classtime: Array(11).fill(false),
            major: '',
            content: '',
            pnumber: '',
            charger: '',
            tel: '',
            teacher: '',
            teacher_tel: '',
            remark: '',
            department: '',
            classtimeDisTable: Array(11).fill(false)
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
            department: this.state.department,
            content: this.state.content,
            charger: this.state.charger,
            tel: this.state.tel,
        })
        this.resetState();
        
    }

    render() {
        return (
            <MuiThemeProvider>
            <div style={{width:"100%", display: "flex", justifyContent: "center"}}>
            <Tabs style={{width: "40%"}}>
                <Tab label="校内申请" style={{backgroundColor: "#DD2C00"}}>
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "80%", textAlign: "center", margin: "20px 0", padding: "20px 0"}}>
                校区
            <MuiThemeProvider>
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
            </MuiThemeProvider>
            场馆
            <MuiThemeProvider>
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.gym}
                    onChange={this.handleGymChange.bind(this)}
                >
                    {camGym[this.state.campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}
                    
                </DropDownMenu>
            </MuiThemeProvider><br />
                <DatePicker
                    style={{display: "inline-block", marginTop: "20px"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={this.handleDateChange.bind(this)}
                /><br />
                <div style={{marginTop: "10px 0"}}>使用节次</div>
                <div style={{textAlign: "left"}}>
                    {[...Array(11).keys()].map(e => {
                        return (
                            <span key={e}><Checkbox
                                style={{display: "inline-block", height: "15px", width: "8%", margin: "10px 0px 10px 80px"}}
                                label={e+1}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[e]}
                            /></span>)
                    })}
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
            <MuiThemeProvider>
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
            </MuiThemeProvider>
            场馆
            <MuiThemeProvider>
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.gym}
                    onChange={this.handleGymChange.bind(this)}
                >
                    {camGym[this.state.campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}
                    
                </DropDownMenu>
            </MuiThemeProvider><br />
                <DatePicker
                    style={{display: "inline-block", marginTop: "20px"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={this.handleDateChange.bind(this)}
                /><br />
                <div style={{marginTop: "10px 0"}}>使用节次</div>
                <div style={{textAlign: "left"}}>
                    {[...Array(11).keys()].map(e => {
                        return (
                            <span key={e}><Checkbox
                                style={{display: "inline-block", height: "15px", width: "10%", margin: "10px 0px 10px 80px"}}
                                label={e+1}
                                onCheck={(ev, b) => {
                                    const newClsTime = [...this.state.classtime];
                                    newClsTime[e] = b;
                                    this.setState({classtime: newClsTime});
                                }}
                                disabled={!this.state.classtimeDisTable[e]}
                            /></span>)
                    })}
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
            </MuiThemeProvider>
        )
    }
}