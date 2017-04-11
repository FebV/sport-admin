import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Schedule from '../../controllers/Schedule';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import camGym from '../../config/cam-gym';

export default class Gym extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            campus: 'zx',
            gym: 'basketball',
            records: [],
            uploadModalOpen: false,
            isModifying: false,
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
        if(status == '有课')
            backgroundColor = 'red';
        if(status == '空闲')
            backgroundColor = 'green';
        if(status == '安排')
            backgroundColor = 'white';
        return backgroundColor;
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v})
    }

    handleGymChange(e, k, v) {
        this.setState({gym: v})
    }

    modify(date, items) {
        console.log(date, items);
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
            <MuiThemeProvider>
            <RaisedButton
                style={{marginLeft: "20px"}}
                label="修改"
                onClick={() => this.setState({isModifying: !this.state.isModifying})}
            />
            </MuiThemeProvider>
            </div>
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{width: "100%"}}>
            <Table
                selectable={false}
                style={{padding: "20px", width: "100%"}}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn style={{width: "20px"}}>#</TableHeaderColumn>
                <TableHeaderColumn style={{width: "80px"}}>日期</TableHeaderColumn>
                <TableHeaderColumn>星期</TableHeaderColumn>
                {[...Array(11).keys()].map((ele, idx) => <TableHeaderColumn style={{width: "20px"}} key={idx}>{1*idx+1}</TableHeaderColumn>)}
                <TableHeaderColumn>修改</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {this.state.records.map((ele, idx) => {
                    return (
                        <TableRow key={idx}>
                        <TableRowColumn style={{width: "20px"}}>{1 + 1*idx}</TableRowColumn>                            
                        <TableRowColumn style={{width: "80px"}}>{ele.date}</TableRowColumn>
                        <TableRowColumn>{ele.week}</TableRowColumn>
                        {['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'].map(
                            (d, idx) => <TableRowColumn onClick={() => console.log(ele.data, d)} key={idx} style={{backgroundColor: this.showStatus(ele[d]), border: "2px solid", width: "20px", opacity: !this.state.isModifying ? "1" : "0.7", cursor: this.state.isModifying ? "pointer" : ""}}></TableRowColumn>
                        )}
                        <TableRowColumn>
                            <i onClick={() => this.setState({isModifying: !this.state.isModifying})} style={{cursor: "pointer"}} className={this.state.isModifying ? "fa fa-floppy-o fa-lg" : "fa fa-lg fa-gavel"}></i>
                        </TableRowColumn>
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
            </div>
            <UploadArrangeExcel open={this.state.uploadModalOpen} onRequestClose={() => this.setState({uploadModalOpen: false})} />
            <MuiThemeProvider>
            <FloatingActionButton onClick={() => this.setState({uploadModalOpen: true})} style={{position: 'absolute', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            </MuiThemeProvider>
            </div>
        )
    }
}

class UploadArrangeExcel extends React.Component {
    constructor(props) {
        super(props);
        this.originStyle = {
            marginTop: "50px",
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px dotted",
            transition: "all 0.3s",
            marginBottom: "20px",
            userSelect: "none",
        }
        this.overStyle = {
            marginTop: "50px",            
            height: "200px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "3px dotted",
            boxShadow: "0px 0px 50px #292929 inset",
            transition: "all 0.3s",
            marginBottom: "20px",
            userSelect: "none",            
        }
        this.state = {
            style: this.originStyle,
            file: null,
            campus: 'mu',
            gym: 'basketball',
        };
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v});
    }
    
    handleGymChange(e, k, v) {
        this.setState({gym: v});
    }

    uploadExcel() {
        Schedule.postSchedules({campus: this.state.campus, gym: this.state.gym, file: this.state.file});
    }

    render() {
        return (
            <MuiThemeProvider>
            <Dialog
                style={{userSelect: "none", width: "800px", marginLeft: "calc(50% - 400px)"}}
                title="上传场馆排期表格"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
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
                </div>
            <div
                onDragLeave={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({style: this.originStyle})
                }}
                onDragOver={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onDragEnter={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({style: this.overStyle});
                }}
                style={this.state.style}
                onDrop={e => {
                    this.setState({style: this.originStyle});
                    this.setState({file: e.dataTransfer.files[0]});
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                {this.state.file == null ? "拖拽上传文件" : "文件名： " + this.state.file.name}
                {this.state.file == null ? "" : <br />}
                {this.state.file == null ? "" : "文件大小： " + Number(this.state.file.size / 1024).toFixed(2)  + "k"}
            </div>
            <RaisedButton
                style={{float: "right", marginLeft: "20px"}}
                label="上传"
                onClick={this.uploadExcel.bind(this)}
            /><RaisedButton
                style={{float: "right"}}
                label="取消"
                onClick={this.props.onRequestClose}
            />
            </Dialog>
            </MuiThemeProvider>
        )
    }
}