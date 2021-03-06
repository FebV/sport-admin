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
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import ApplyModel from '../../controllers/Applies';
import GymSelector from '../common/GymSelector';
import Exporter from './exporter/Exporter';

const tweakClsTime = (oldStr) => {
    return oldStr.split(',').map(e => {
                if(e == 1)
                    return '6:00 - 8:00';
                else
                    return `${1*e + 6}:00 - ${1*e + 7}:00`;
            }).join(',');
}


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
            start: this.fitDate(new Date().setDate(1)),
            end: '',
            campus: '',
            gym: '',
            type: '',
            remark: '',
            page: '校内',
            cost: '',
            innerRecords: [],
            outerRecords: [],
            innerDetailDialogOpen: false,
            outererDetailDialogOpen: false,
            innerDetailIdx: null,
            outerDetailIdx: null,
        }
        addEventListener("put innerApply ok", () => {this.innerQuery()})
        addEventListener("delete innerApply ok", () => {this.innerQuery()})
        addEventListener("put outerApply ok", () => {this.outerQuery()})
        addEventListener("delete outerApply ok", () => {this.outerQuery()})
    }

    innerQuery() {
        ApplyModel.getInnerApply({
            campus: this.state.campus,
            type: this.state.type,
            gym: this.state.gym,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
        })
            .then(res => this.setState({innerRecords: res}));
    }
    
    outerQuery() {
        ApplyModel.getOuterApply({
            campus: this.state.campus,
            type: this.state.type,
            gym: this.state.gym,
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
        })
            .then(res => this.setState({outerRecords: res}));
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

    exportInner({start, end, campus}) {
        ApplyModel.exportInner({start, end, campus});
    }

    exportOuter({start, end, campus}) {
        ApplyModel.exportOuter({start, end, campus});
    }

    render() {
        return (
        
            <Tabs>
            <Tab label="校内申请" onActive={() => this.setState({page: '校内'})} >
            <div style={{padding: "20px"}}>
                
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span style={{margin: "0 20px"}}>从：</span><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="起始日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    defaultDate={new Date(new Date().setDate(1))}
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
            
            <div style={{width: "100%", textAlign: "center"}}>
            
                <GymSelector
                    dropType={true}
                    dropGym={true}
                    onChange={(g) => {
                        this.setState({campus: g.campus, type: g.type, gym: g.gym})    
                    }}
                />
            <RaisedButton
                label="查询"
                onClick={this.innerQuery.bind(this)}
            />
            
            </div>
            
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
                <TableHeaderColumn>使用时间</TableHeaderColumn>
                <TableHeaderColumn>院系</TableHeaderColumn>
                <TableHeaderColumn>联系方式</TableHeaderColumn>
                <TableHeaderColumn>备注</TableHeaderColumn>
                <TableHeaderColumn>状态</TableHeaderColumn>
                <TableHeaderColumn>查看详情</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.innerRecords.map((ele, idx) => {
                {/*let targetName = null;
                for(let i of camGym[ele.campus]) {
                    if(i.name == ele.gym) {
                        targetName = i.label;
                        break;
                    }
                }*/}
                let state = null;
                {/*if(ele.state == 3)
                    state = '已通过';*/}
                if(ele.state == 2)
                    state = '已通过'
                if(ele.state == 1)
                    state = '馆长通过'
                if(ele.state == 0)
                    state = '未审核'
                if(ele.state == -1)
                    state = '馆长未通过'
                if(ele.state == -2)
                    state = '·中心·未通过'
                if(ele.state == -3)
                    state = '院长未通过'
                let targetClsTime = ele.classtime;
                for(let i in this.serial) {
                    targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
                }
                targetClsTime = tweakClsTime(targetClsTime);
                return (
                    <TableRow key={idx}>
                        <TableRowColumn title={ele.campus_chinese}>{ele.campus_chinese}</TableRowColumn>
                        <TableRowColumn title={ele.gym}>{ele.gym}</TableRowColumn>
                        <TableRowColumn title={ele.time}>{ele.time}</TableRowColumn>
                        <TableRowColumn title={targetClsTime}>{targetClsTime}</TableRowColumn>
                        <TableRowColumn title={ele.major}>{ele.major}</TableRowColumn>
                        <TableRowColumn title={ele.tel}>{ele.tel}</TableRowColumn>
                        <TableRowColumn title={ele.remark}>{ele.remark}</TableRowColumn>
                        <TableRowColumn title={state}>{state}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    this.setState({innerDetailIdx: idx});
                                    this.setState({innerDetailDialogOpen: true});
                                    this.setState({applyId: ele.id});
                                }} label="查看详情" />
                        </TableRowColumn>
                    </TableRow>
                )
            })}
            </TableBody>
            </Table>
            </Paper>
            {this.state.page == '校内' ?
            <Exporter export={this.exportInner.bind(this)} title="导出校内申请记录" />
            :
            this.state.page == '校外' ?
            <Exporter export={this.exportOuter.bind(this)} title="导出校外申请记录" />
            :
            null
            }

            <InnerDetail
                handleRemark={(r) => this.setState({remark: r})}
                handleCost={(r) => this.setState({cost: r})}
                remark={this.state.remark}
                cost={this.state.cost}
                applyId={this.state.applyId}
                open={this.state.innerDetailDialogOpen}
                onRequestClose={() => this.setState({innerDetailDialogOpen: false, remark: ''})}
                record={this.state.innerRecords[this.state.innerDetailIdx]}
            />
            </div>
            </Tab>
            <Tab label="校外申请" style={{backgroundColor: "rgb(144, 15, 19)"}} onActive={() => this.setState({page: '校外'})} >
            <div style={{padding: "20px"}}>
            
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <span style={{margin: "0 20px"}}>从：</span><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="起始日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    defaultDate={new Date(new Date().setDate(1))}
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
            
            <div style={{width: "100%", textAlign: "center"}}>
                <GymSelector
                    dropType={true}
                    dropGym={true}
                    onChange={(g) => {
                        this.setState({campus: g.campus, type: g.type, gym: g.gym})    
                    }}
                />
            
            <RaisedButton
                label="查询"
                onClick={this.outerQuery.bind(this)}
            />
            
            </div>
            
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
                <TableHeaderColumn>使用时间</TableHeaderColumn>
                <TableHeaderColumn>联系方式</TableHeaderColumn>
                <TableHeaderColumn>状态</TableHeaderColumn>
                <TableHeaderColumn>查看详情</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.outerRecords.map((ele, idx) => {
                {/*let targetName = null;
                for(let i of camGym[ele.campus]) {
                    if(i.name == ele.gym) {
                        targetName = i.label;
                        break;
                    }
                }*/}
                let state = null;
                state = '待审核';
                if(ele.state == 3)
                    state = '通过';
                if(ele.state < 0)
                    state = '未通过'
                let targetClsTime = ele.classtime;
                for(let i in this.serial) {
                    targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
                }

                targetClsTime = tweakClsTime(targetClsTime);

                return (
                    <TableRow key={idx}>
                        <TableRowColumn title={ele.campus_chinese}>{ele.campus_chinese}</TableRowColumn>
                        <TableRowColumn title={ele.gym}>{ele.gym}</TableRowColumn>
                        <TableRowColumn title={ele.time}>{ele.time}</TableRowColumn>
                        <TableRowColumn title={targetClsTime}>{targetClsTime}</TableRowColumn>
                        <TableRowColumn title={ele.tel}>{ele.tel}</TableRowColumn>
                        <TableRowColumn title={state}>{state}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton onClick={() => {
                                    this.setState({outerDetailIdx: idx});
                                    this.setState({outerDetailDialogOpen: true});
                                    this.setState({applyId: ele.id});
                                }} label="查看详情" />
                        </TableRowColumn>
                    </TableRow>
                )
            })}
            </TableBody>
            </Table>
            </Paper>

            <OuterDetail
                applyId={this.state.applyId}
                open={this.state.outerDetailDialogOpen}
                onRequestClose={() => this.setState({outerDetailDialogOpen: false})}
                record={this.state.outerRecords[this.state.outerDetailIdx]}
            />
            </div>
            </Tab>
            </Tabs>
            
        )
    }
}

class InnerDetail extends React.Component {
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
        }

    }

    putApplyState(state) {
        ApplyModel.putInnerApply({applyId: this.props.applyId, state, remark: this.props.remark, cost: this.props.cost});
        this.props.handleRemark('');
        this.props.handleCost('');
    }

    deleteApplyState() {
        ApplyModel.deleteInnerApply({applyId: this.props.applyId});
        this.props.handleRemark('');
        this.props.handleCost('');
    }

    render() {
        if(!this.props.record)
            return <div></div>
        // let targetName = null;
        // for(let i of camGym[this.props.record.campus]) {
        //     if(i.name == this.props.record.gym) {
        //         targetName = i.label;
        //         break;
        //     }
        // }
        let targetClsTime = this.props.record.classtime;
        for(let i in this.serial) {
            targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
        }

        targetClsTime = tweakClsTime(targetClsTime);

        let state = null;
            // if(this.props.record.state == 3)
            //     state = '已通过';
            if(this.props.record.state == 2)
                state = '已通过'
            if(this.props.record.state == 1)
                state = '馆长审批通过'
            if(this.props.record.state == 0)
                state = '未审核'
            if(this.props.record.state == -1)
                state = '馆长未通过'
            if(this.props.record.state == -2)
                state = '·中心·未通过'
            if(this.props.record.state == -3)
                state = '院长未通过'
        return (
            
            <Dialog
                autoScrollBodyContent={true}
                style={{userSelect: "none", width: "1000px", marginLeft: "calc(50% - 400px)"}}
                title="申请详情"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <div>
                    <span>校区：</span><span>{this.props.record.campus_chinese}</span><br />
                    <span>场馆：</span><span>{this.props.record.gym}</span><br />
                    <span>负责人：</span><span>{this.props.record.charger}</span><br />
                    <span>日期：</span><span>{this.props.record.time}</span><br />
                    <span>使用节次：</span><span>{targetClsTime}</span><br />
                    <span>使用学院：</span><span>{this.props.record.major}</span><br />
                    <span>活动内容：</span><span>{this.props.record.content}</span><br />
                    <span>参加人数：</span><span>{this.props.record.pnumber}</span><br />
                    <span>联系方式：</span><span>{this.props.record.tel}</span><br />
                    <span>活动费用：</span><span>{this.props.record.money}</span><br />
                    <span>审核状态：</span><span>{state}</span><br />
                    <span>申请备注：</span><span>{this.props.record.remark}</span><br />
                    <span>上轮审批备注：</span><span>{this.props.record.teacher_remark}</span><br />
                </div>
                <div style={{float: "left"}}>
                <TextField floatingLabelText="活动费用" value={this.props.cost} onChange={(e, v) => this.props.handleCost(v)} /><br />
                <TextField floatingLabelText="审核备注" value={this.props.remark} onChange={(e, v) => this.props.handleRemark(v)} />
                <RaisedButton
                    style={{marginLeft: "10px"}}
                    onClick={() => {
                        this.putApplyState(1);
                        this.props.onRequestClose();
                    }}
                    label="同意申请"
                />
                <RaisedButton
                    onClick={() => {
                        this.putApplyState(-1);
                        this.props.onRequestClose();
                    }}
                    style={{marginLeft: "20px"}}
                    label="回绝申请"
                />
                <RaisedButton
                    onClick={() => {
                        this.deleteApplyState();
                        this.props.onRequestClose();
                    }}
                    style={{marginLeft: "20px"}}
                    label="删除申请"
                />
                </div>
            </Dialog>
            
        )
    }
}

class OuterDetail extends React.Component {
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
        }
    }

    putApplyState(state) {
        ApplyModel.putOuterApply({applyId: this.props.applyId, state});
    }

    deleteApplyState() {
        ApplyModel.deleteOuterApply({applyId: this.props.applyId});
    }

    render() {
        if(!this.props.record)
            return <div></div>
        // let targetName = null;
        // for(let i of camGym[this.props.record.campus]) {
        //     if(i.name == this.props.record.gym) {
        //         targetName = i.label;
        //         break;
        //     }
        // }
        let targetClsTime = this.props.record.classtime;
        for(let i in this.serial) {
            targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
        }
        targetClsTime = tweakClsTime(targetClsTime);

        console.log(this.props.record);
        let state = null;
        state = '待审核';
        if(this.props.record.state == 3)
            state = '通过';
        if(this.props.record.state < 0)
            state = '未通过'
        return (
            
            <Dialog
                autoScrollBodyContent={true}
                style={{userSelect: "none", width: "800px", marginLeft: "calc(50% - 400px)"}}
                title="申请详情"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
            >
                <div>
                    <span>校区：</span><span>{this.props.record.campus_chinese}</span><br />
                    <span>场馆：</span><span>{this.props.record.gym}</span><br />
                    <span>负责人：</span><span>{this.props.record.charger}</span><br />
                    <span>日期：</span><span>{this.props.record.time}</span><br />
                    <span>使用节次：</span><span>{targetClsTime}</span><br />
                    <span>使用单位：</span><span>{this.props.record.department}</span><br />
                    <span>活动内容：</span><span>{this.props.record.content}</span><br />
                    <span>联系方式：</span><span>{this.props.record.tel}</span><br />
                    <span>审核状态：</span><span>{state}</span><br />
                </div>
                <div style={{float: "right"}}>
                <RaisedButton
                    onClick={() => {
                        this.props.onRequestClose();
                        this.putApplyState(3);
                    }}
                    label="同意申请"
                />
                <RaisedButton
                    onClick={() => {
                        this.props.onRequestClose();
                        this.putApplyState(2);
                    }}
                    style={{marginLeft: "20px"}}
                    label="回绝申请"
                />
                <RaisedButton
                    onClick={() => {
                        this.props.onRequestClose();
                        this.deleteApplyState();
                    }}
                    style={{marginLeft: "20px"}}
                    label="删除申请"
                />
                </div>
            </Dialog>
            
        )
    }
}