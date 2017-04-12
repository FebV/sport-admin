import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';

import ApplyModel from '../../controllers/Applies';
import camGym from '../../config/cam-gym';


export default class Apply extends React.Component {
    constructor(props) {
        super(props);
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
        this.schoolNameMap = {
            'mu': '综合体育馆',
            'zx': '中心校区',
            'hj': '洪家楼校区',
            'qf': '千佛山校区',
            'bt': '趵突泉校区',
            'xl': '兴隆山校区',
            'rj': '软件园校区',
        },
        this.state = {
            start: '',
            end: '',
            campus: 'zx',
            gym: 'basketball',
            records: [],
        }
    }

    query() {
        ApplyModel.getApply({
            campus: this.state.campus,
            gym: this.state.gym,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
        })
            .then(res => this.setState({records: res}));
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

    handleCampusChange(e, k, v) {
        this.setState({campus: v})
    }

    handleGymChange(e, k, v) {
        this.setState({gym: v})
    }

    render() {
        return (
            <div style={{padding: "20px"}}>
                <MuiThemeProvider>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span style={{margin: "0 20px"}}>从：</span><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="起始日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({start: v});
                        }}
                /><br />
                <span style={{margin: "0 20px"}}>至：</span><br />
                <DatePicker
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({end: v});
                    }}
                />
            </div>
            </MuiThemeProvider>
            <div style={{width: "100%", textAlign: "center"}}>
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
                </MuiThemeProvider>
            <MuiThemeProvider>
            <RaisedButton
                label="查询"
                onClick={this.query.bind(this)}
            />
            </MuiThemeProvider>
            </div>
            <MuiThemeProvider>
            <Paper style={{marginTop: "20px", width: "100%"}}>
            <Table
                selectable={false}
            >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
            <TableRow>
                <TableHeaderColumn>校区</TableHeaderColumn>
                <TableHeaderColumn>场馆</TableHeaderColumn>
                <TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>节次</TableHeaderColumn>
                <TableHeaderColumn>院系</TableHeaderColumn>
                <TableHeaderColumn>活动内容</TableHeaderColumn>
                <TableHeaderColumn>参加人数</TableHeaderColumn>
                <TableHeaderColumn>负责人</TableHeaderColumn>
                <TableHeaderColumn>联系方式</TableHeaderColumn>
                <TableHeaderColumn>花费</TableHeaderColumn>
                <TableHeaderColumn>备注</TableHeaderColumn>
                <TableHeaderColumn>状态</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.records.map((ele, idx) => {
                let targetName = null;
                for(let i of camGym[ele.campus]) {
                    if(i.name == ele.gym) {
                        targetName = i.label;
                        break;
                    }
                }
                let targetClsTime = null;
                for(let i in this.serial) {
                    targetClsTime = ele.classtime.replace(this.serial[i], i-1);
                }
                return (
                    <TableRow key={idx}>
                        <TableRowColumn title={this.schoolNameMap[ele.campus]}>{this.schoolNameMap[ele.campus]}</TableRowColumn>
                        <TableRowColumn title={targetName}>{targetName}</TableRowColumn>
                        <TableRowColumn title={ele.time}>{ele.time}</TableRowColumn>
                        <TableRowColumn title={targetClsTime}>{targetClsTime}</TableRowColumn>
                        <TableRowColumn title={ele.major}>{ele.major}</TableRowColumn>
                        <TableRowColumn title={ele.content}>{ele.content}</TableRowColumn>
                        <TableRowColumn title={ele.pnumber}>{ele.pnumber}</TableRowColumn>
                        <TableRowColumn title={ele.charger}>{ele.charger}</TableRowColumn>
                        <TableRowColumn title={ele.tel}>{ele.tel}</TableRowColumn>
                        <TableRowColumn title={ele.cost}>{ele.cost}</TableRowColumn>
                        <TableRowColumn title={ele.remark}>{ele.remark}</TableRowColumn>
                        <TableRowColumn title={ele.state}>{ele.state}</TableRowColumn>
                    </TableRow>
                )
            })}
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
            </div>
        )
    }
}