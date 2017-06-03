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

import GymSelector from '../common/GymSelector';


import Schedule from '../../controllers/Schedule';
import camGym from '../../config/cam-gym';

export default class Gym extends React.Component {
    constructor(props) {
        super(props);
        this.serial = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen'];
        this.state = {
            start: '',
            end: '',
            // campus: 'zx',
            // gym: 'basketball',
            // type: '',
            records: [],
            uploadModalOpen: false,
            isModifying: false,
            isClicking: false,
            arrangeModifierOpen: false,
            anchorEl: null,
            date: null,
            nthClass: null,
            batModStart: null,
            batModEnd: null,
            camGym: null,
            gymNumber: 0,
        }

        addEventListener("put schedules ok", () => {
            this.query();
        })

    }

    componentDidMount() {
        console.log(`res`);
        camGym.then(res => {
            console.log(res);
            this.setState({camGym: res})
        })
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
        console.log(status);
        let backgroundColor = null;
        if(status == '3') //体育教学
            backgroundColor = 'red';
        if(status == '1') //开放
            backgroundColor = 'green';
        if(status == '2') //占用
            backgroundColor = 'gray';
        return backgroundColor;
    }


    //show a popover
    modify(r, c, p) {
        return ;
        if(!this.state.isModifying)
            return;
        //bat modify control
        // if(p.ctrlKey) {
        //     if(!this.state.batModStart)
        //         this.setState({batModStart: })
        // }
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
                    onChange={(e, v) => {
                        this.setState({start: v});
                        }}
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
            
            
            <RaisedButton
                style={{marginLeft: "20px"}}
                label={this.state.isModifying ? "确定" : "修改"}
                onClick={() => this.setState({isModifying: !this.state.isModifying})}
            />
            
            </div>
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            
            <Paper style={{width: "90%", textAlign: "center"}}>
                <div style={{width: "40%", display:"flex"}}>
                    <div style={{lineHeight: "52px", marginLeft: "1vw"}}>体育教学</div>
                <div style={{backgroundColor: "red", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                    <div style={{lineHeight: "52px", marginLeft: "1vw"}}>开放</div>
                <div style={{backgroundColor: "green", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                    <div style={{lineHeight: "52px", marginLeft: "1vw"}}>占用</div>
                <div style={{backgroundColor: "gray", width: "2vw", height: "26px", border: "2px solid gray", display: "inline-block", marginTop: "12px", marginLeft: "3px"}}></div>
                </div>
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
                        <TableHeaderColumn>{1 + 1*idx}</TableHeaderColumn>                            
                        {/*<TableHeaderColumn>{ele.date}</TableHeaderColumn>
                        <TableHeaderColumn>{ele.week}</TableHeaderColumn>*/}
                        {this.serial.map(
                            (d, i) => <TableHeaderColumn key={i} style={{backgroundColor: this.showStatus(this.state.records[d][idx]), border: "2px solid"}}></TableHeaderColumn>
                        )}
                        
 
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
            </Paper>
            
            </div>
            <UploadArrangeExcel open={this.state.uploadModalOpen} onRequestClose={() => this.setState({uploadModalOpen: false})} />
            
            <FloatingActionButton onClick={() => this.setState({uploadModalOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            
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
            camGym: null,
        };
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
        this.setState({campus: v});
    }
    
    handleGymChange(e, k, v) {
        this.setState({gym: v});
    }

    uploadExcel() {
        Schedule.postSchedules({
            campus: this.state.campus,
            type: this.state.type,
            gym: this.state.gym,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end)});
        this.props.close();
    }

    render() {
        return (
            
            <Dialog
                style={{userSelect: "none", width: "800px", marginLeft: "calc(50% - 400px)"}}
                title="生成场馆排期"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
            <div>
            <span style={{margin: "0 20px"}}>从：</span>
                {/*<span style={{margin: "0 20px"}}>选择日期：</span><br />*/}
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="选择日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({start: v});
                        }}
                /><br />
                <span style={{margin: "0 20px"}}>至：</span>
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({end: v});
                    }}
                /><br />
            <GymSelector onChange={(g) => {
                this.setState({campus: g.campus, type: g.type, gym: g.gym})    
            }} />
            </div>
            {/*<div style={{width: "100%", textAlign: "center"}}>
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
                    {
                        this.state.camGym ? 
                        this.state.camGym[this.state.campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })
                    :
                    null
                    }
                    
                </DropDownMenu>
                </div>*/}
            {/*<div
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
            </div>*/}
            <RaisedButton
                style={{margin: "15px"}}
                label="生成"
                onClick={this.uploadExcel.bind(this)}
            /><RaisedButton
                style={{margin: "15px"}}

                label="取消"
                onClick={this.props.onRequestClose}
            />
            </Dialog>
            
        )
    }
}

class ArrangeModifier extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
            <Popover
                anchorOrigin={{vertical: 'center', horizontal: 'middle'}}
                anchorEl={this.props.anchorEl}
                open={this.props.open}
                onRequestClose={this.props.close}
                >
                <Menu>
                    <MenuItem onClick={() => {
                        this.props.postModify('体育教学')
                        this.props.close();
                        }}
                        primaryText="调为体育教学" />
                    <MenuItem onClick={() => {
                        this.props.postModify('占用')
                        this.props.close();
                        }}
                        primaryText="调为占用" />
                    <MenuItem onClick={() => {
                        this.props.postModify('开放')
                        this.props.close();
                        }}
                        primaryText="调为开放" />
                </Menu>
            </Popover>
            
        )
    }
}