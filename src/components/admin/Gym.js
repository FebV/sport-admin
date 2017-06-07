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
        camGym.then(res => {
            this.setState({camGym: res})
        })
    }

    query() {
        Schedule.getSchedules({
            campus: this.state.campus,
            gym: this.state.gym ,
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
        if(!this.state.isModifying)
            return;
        const target = p.target;
        //bat modify control
        if(p.ctrlKey) {
            if(!this.state.selectBegin)
                return this.setState({selectBegin: [r, c]});
            if(!this.state.selectEnd) {
                this.setState({selectEnd: [r, c]}, () => {
                    this.setState({anchorEl: target});
                    this.setState({arrangeModifierOpen: true});
                });
                return;
            }
        }

        this.setState({selectCell: [r, c]});
        this.setState({anchorEl: target});
        this.setState({arrangeModifierOpen: true});
        
    }

    postModify(targetStatus) {

        let records = this.state.records;

        if(this.state.selectEnd) {
            let {selectBegin, selectEnd} = this.state;
            let b = [];
            let e = [];
            if(selectBegin[0] < selectEnd[0]) {
                b[0] = selectBegin[0];
                e[0] = selectEnd[0];
            } else {
                b[0] = selectEnd[0];
                e[0] = selectBegin[0];
            }

            if(selectBegin[1] < selectEnd[1]) {
                b[1] = selectBegin[1];
                e[1] = selectEnd[1];
            } else {
                b[1] = selectEnd[1];
                e[1] = selectBegin[1];
            }

            for(let r = b[0]; r <= e[0]; r++) {
                for(let c = b[1]; c <= e[1]; c++) {
                    console.log(records, r, c);
                    let newRec = records[this.serial[c-2]].split('');
                    newRec[r] = targetStatus;
                    records[this.serial[c-2]] = newRec.join('');
                }
            }
        }

        if(this.state.selectCell) {
            let cell = this.state.selectCell;
            let r = cell[0];
            let c = cell[1];
            console.log(records, r, c);
            let newRec = records[this.serial[c-2]].split('');
            newRec[r] = targetStatus;
            records[this.serial[c-2]] = newRec.join('');
        }

        this.setState({records});

        console.log(this.state);

        Schedule.putSchedules({
            campus: this.state.campus,
            gym: this.state.gym,
            type: this.state.type,
            records: JSON.stringify(this.state.records)
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
            <span>#按住Ctrl键批量修改</span>
            
            </div>
            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            
            <Paper style={{width: "100%", textAlign: "center"}}>
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
                <TableHeaderColumn style={{width: "150px"}}>#</TableHeaderColumn>
                {/*<TableHeaderColumn>日期</TableHeaderColumn>
                <TableHeaderColumn>星期</TableHeaderColumn>*/}
                {[...Array(14).keys()].map((ele, idx) => idx == 0 ? 
                 <TableHeaderColumn key={idx}>{`6:00`}</TableHeaderColumn> 
                 :
                 <TableHeaderColumn key={idx}>{`${7 + idx}:00`}</TableHeaderColumn>)}
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
                {[...Array(this.state.gymNumber).keys()].map((ele, idx) => {
                    return (
                        <TableRow key={idx}>
                        <TableHeaderColumn style={{width: "150px"}}>{1 + 1*idx}号{this.state.gym}</TableHeaderColumn>                            
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
            <UploadArrangeExcel open={this.state.uploadModalOpen} onRequestClose={() => this.setState({uploadModalOpen: false})} />
            
            <FloatingActionButton onClick={() => this.setState({uploadModalOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            
            <ArrangeModifier
                postModify={this.postModify.bind(this)}
                anchorEl={this.state.anchorEl}
                open={this.state.arrangeModifierOpen}
                close={() => {
                    this.setState({arrangeModifierOpen: false});
                    this.setState({selectCell: undefined});
                    this.setState({selectBegin: undefined});
                    this.setState({selectEnd: undefined});
                }}
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
        this.props.onRequestClose();
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
                        this.props.postModify('3') // 体育教学
                        this.props.close();
                        }}
                        primaryText="调为体育教学" />
                    <MenuItem onClick={() => {
                        this.props.postModify('2') //占用
                        this.props.close();
                        }}
                        primaryText="调为占用" />
                    <MenuItem onClick={() => {
                        this.props.postModify('1') //开放
                        this.props.close();
                        }}
                        primaryText="调为开放" />
                </Menu>
            </Popover>
            
        )
    }
}