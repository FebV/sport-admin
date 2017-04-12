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

import Schedule from '../../controllers/Schedule';
import camGym from '../../config/cam-gym';

export default class Gym extends React.Component {
    constructor(props) {
        super(props);
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
        this.state = {
            start: '',
            end: '',
            campus: 'zx',
            gym: 'basketball',
            records: [],
            uploadModalOpen: false,
            isModifying: false,
            isClicking: false,
            arrangeModifierOpen: false,
            anchorEl: null,
            date: null,
            nthClass: null,
        }

        addEventListener("put schedules ok", () => {
            this.query();
        })
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
            backgroundColor = '#F44336';
        if(status == '空闲')
            backgroundColor = '#FAFAFA';
        if(status == '安排')
            backgroundColor = '#006064';
        return backgroundColor;
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v})
    }

    handleGymChange(e, k, v) {
        this.setState({gym: v})
    }

    //show a popover
    modify(r, c, p, e) {
        if(!this.state.isModifying)
            return;
        this.setState({arrangeModifierOpen: true});
        this.setState({anchorEl: p.target});
        this.setState({date: this.state.records[r].date, nthClass: this.serial[c-4]});
    }

    postModify(targetStatus) {
        Schedule.putSchedules({
            campus: this.state.campus,
            gym: this.state.gym,
            date: this.state.date,
            nthClass: this.state.nthClass,
            targetStatus
        })
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
                label={this.state.isModifying ? "确定" : "修改"}
                onClick={() => this.setState({isModifying: !this.state.isModifying})}
            />
            </MuiThemeProvider>
            </div>
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{width: "90%"}}>
            <Table
                onCellClick={(r, c, p, e) => {
                    this.modify(r, c, p,e);
                }}
                selectable={false}
                style={{width: "100%"}}>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn style={{width: "20px"}}>#</TableHeaderColumn>
                <TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>星期</TableHeaderColumn>
                {[...Array(11).keys()].map((ele, idx) => <TableHeaderColumn  style={{width: "5%"}} key={idx}>{1*idx+1}</TableHeaderColumn>)}
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {this.state.records.map((ele, idx) => {
                    return (
                        <TableRow key={idx}>
                        <TableRowColumn style={{width: "20px"}}>{1 + 1*idx}</TableRowColumn>                            
                        <TableRowColumn>{ele.date}</TableRowColumn>
                        <TableRowColumn>{ele.week}</TableRowColumn>
                        {this.serial.map(
                            (d, idx) => (
                                    <TableRowColumn
                                        key={idx}
                                        style={{backgroundColor: this.showStatus(ele[d]), border: "1px solid", width: "5%", opacity: !this.state.isModifying ? "1" : "0.7", cursor: this.state.isModifying ? "pointer" : ""}}
                                    ></TableRowColumn>
                                )
                        )}
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
            <ArrangeModifier
                postModify={this.postModify.bind(this)}
                anchorEl={this.state.anchorEl}
                open={this.state.arrangeModifierOpen}
                close={() => this.setState({arrangeModifierOpen: false})}
            />
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

class ArrangeModifier extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
            <Popover
                anchorOrigin={{vertical: 'center', horizontal: 'middle'}}
                anchorEl={this.props.anchorEl}
                open={this.props.open}
                onRequestClose={this.props.close}
                >
                <Menu>
                    <MenuItem onClick={() => {
                        this.props.postModify('有课')
                        this.props.close();
                        }}
                        primaryText="调为有课" />
                    <MenuItem onClick={() => {
                        this.props.postModify('空闲')
                        this.props.close();
                        }}
                        primaryText="调为空闲" />
                    <MenuItem onClick={() => {
                        this.props.postModify('安排')
                        this.props.close();
                        }}
                        primaryText="调为安排" />
                </Menu>
            </Popover>
            </MuiThemeProvider>
        )
    }
}