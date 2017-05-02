import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Schedule from '../../controllers/Schedule';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import camGym from '../../config/cam-gym';

export default class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            campus: 'zx',
            gym: 'basketball',
            records: []
        }
    }

    query() {
        Schedule.getSchedules({
            campus: this.state.campus,
            gym: this.state.gym,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
        })
            .then(res => {
                this.setState({records: res})
                console.log(res);
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
        if(status == '体育教学')
            backgroundColor = 'red';
        if(status == '开放')
            backgroundColor = 'green';
        if(status == '占用')
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
            <div style={{paddingTop: "20px"}}>
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
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
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
                <TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>星期</TableHeaderColumn>
                {[...Array(11).keys()].map((ele, idx) => <TableHeaderColumn key={idx}>{1*idx+1}</TableHeaderColumn>)}
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {this.state.records.map((ele, idx) => {
                    return (
                        <TableRow key={idx}>
                        <TableHeaderColumn>{1 + 1*idx}</TableHeaderColumn>                            
                        <TableHeaderColumn>{ele.date}</TableHeaderColumn>
                        <TableHeaderColumn>{ele.week}</TableHeaderColumn>
                        {['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'].map(
                            (d, idx) => <TableHeaderColumn key={idx} style={{backgroundColor: this.showStatus(ele[d]), border: "2px solid"}}></TableHeaderColumn>
                        )}
                        
 
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
            </div>
            </div>
        )
    }
}