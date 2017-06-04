import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Schedule from '../../controllers/Schedule';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


import GymSelector from '../common/GymSelector';

import camGym from '../../config/cam-gym';

export default class Query extends React.Component {
    constructor(props) {
        super(props);
        let d = new Date();
        d.setDate(d.getDate() + 5);
        this.defaultDate = d;
        d = new Date();
        this.disabledDate = d.setDate(d.getDate() + 4);
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'];
        this.state = {
            start: this.fitDate(this.defaultDate),
            end: '',
            campus: '',
            gym: '',
            records: [],
            gymNumber: 0,
        }
    }

    query() {
        Schedule.getSchedules({
            campus: this.state.campus,
            gym: this.state.gym,
            type: this.state.type,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
        })
            .then(res => {
                this.setState({records: res[0]})
                this.setState({gymNumber: res[0].one.length})
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

    showStatus(status) {
        let backgroundColor = null;
        if(status == '3') // 体育教学
            backgroundColor = 'red';
        if(status == '1') //开放
            backgroundColor = 'green';
        if(status == '2') //占用
            backgroundColor = 'gray';
        return backgroundColor;
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v})
    }

    handleGymChange(e, k, v) {
        this.setState({gym: v})
    }

    render() {
        return (
            <div>
            <div style={{paddingTop: "20px"}}>
            
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                {/*<span style={{margin: "0 20px"}}>从：</span><br />*/}
                <span style={{margin: "0 20px"}}>选择日期：</span><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="选择日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    defaultDate={this.defaultDate}
                    onChange={(e, v) => {
                        this.setState({start: v});
                        }}
                    shouldDisableDate={d => d < this.disabledDate}
                /><br />
                {/*<span style={{margin: "0 20px"}}>至：</span><br />
                <DatePicker
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({end: v});
                    }}
                    shouldDisableDate={d => d < this.disabledDate}

                />*/}
            </div>
            <div style={{width: "100%", textAlign: "center"}}>
            <GymSelector onChange={(g) => {
                this.setState({campus: g.campus, type: g.type, gym: g.gym})    
            }} />
            <RaisedButton
                label="查询"
                onClick={this.query.bind(this)}
            />
            </div>
            
            
            </div>
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            
            <Paper style={{width: "90%", textAlign: "center"}}>
                <div style={{width: "40%", display:"flex"}}>
                    <div style={{lineHeight: "52px", marginLeft: "5vw"}}>体育教学</div>
                <div style={{backgroundColor: "red", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                    <div style={{lineHeight: "52px", marginLeft: "5vw"}}>开放</div>
                <div style={{backgroundColor: "green", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                    <div style={{lineHeight: "52px", marginLeft: "5vw"}}>占用</div>
                <div style={{backgroundColor: "gray", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                </div>
            <Table selectable={false} style={{padding: "20px"}}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                {/*<TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>星期</TableHeaderColumn>*/}
                {[...Array(14).keys()].map((ele, idx) => idx == 0 ? 
                 <TableHeaderColumn key={idx}>{`6:00 - 8:00`}</TableHeaderColumn>
                 :
                 <TableHeaderColumn key={idx}>{`${7 + idx}:00 - ${9 + idx}:00`}</TableHeaderColumn>)}
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {[...Array(this.state.gymNumber).keys()].map((ele, idx) => {
                    return (
                        <TableRow key={idx}>
                        <TableHeaderColumn>{1 + 1*idx}号{this.state.gym}</TableHeaderColumn>                            
                        {/*<TableHeaderColumn>{ele.date}</TableHeaderColumn>
                        <TableHeaderColumn>{ele.week}</TableHeaderColumn>*/}
                        {this.serial.map(
                            (d, i) => <TableHeaderColumn key={i} style={{backgroundColor: this.showStatus(this.state.records[d][idx]), border: "2px solid", opacity: this.state.isModifying ? 0.7 : 1}}></TableHeaderColumn>
                        )}
                        
 
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            </Paper>
            
            </div>
            </div>
        )
    }
}