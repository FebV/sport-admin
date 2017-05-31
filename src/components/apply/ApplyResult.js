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
            tel: '12345678901',
            start: '',
            end: '',
            campus: 'zx',
            gym: 'basketball',
            remark: '',
            innerRecords: [],
            outerRecords: [],
            innerDetailDialogOpen: false,
            outererDetailDialogOpen: false,
            innerDetailIdx: null,
            outerDetailIdx: null,
        }
    }

    innerQuery() {
        ApplyModel.queryInnerApplyByTel({
            tel: this.state.tel
        })
            .then(res => this.setState({innerRecords: res}));
    }
    
    outerQuery() {
        ApplyModel.queryOuterApplyByTel({
            tel: this.state.tel
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

    render() {
        return (
        
            <Tabs>
            <Tab label="校内申请">
            <div style={{padding: "20px"}}>
                
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            </div>
            
            <div style={{width: "100%", textAlign: "center"}}>
            
                <TextField value={this.state.tel} floatingLabelText="手机号（必填）" onChange={(e, v) => this.setState({tel: v})} />
            
            
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
                <TableHeaderColumn>节次</TableHeaderColumn>
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
                let targetName = null;
                for(let i of camGym[ele.campus]) {
                    if(i.name == ele.gym) {
                        targetName = i.label;
                        break;
                    }
                }
                let state = null;
                state = ele.state == 3 ? '通过' : ele.record  == -3 ? '未通过' : '正在审核';
                let targetClsTime = ele.classtime;
                for(let i in this.serial) {
                    targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
                }
                return (
                    <TableRow key={idx}>
                        <TableRowColumn title={this.schoolNameMap[ele.campus]}>{this.schoolNameMap[ele.campus]}</TableRowColumn>
                        <TableRowColumn title={targetName}>{targetName}</TableRowColumn>
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
            
            <InnerDetail
                handleRemark={(r) => this.setState({remark: r})}
                remark={this.state.remark}
                applyId={this.state.applyId}
                open={this.state.innerDetailDialogOpen}
                onRequestClose={() => this.setState({innerDetailDialogOpen: false, remark: ''})}
                record={this.state.innerRecords[this.state.innerDetailIdx]}
            />
            </div>
            </Tab>
            <Tab label="校外申请">
            <div style={{padding: "20px"}}>
            
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            </div>
            
            <div style={{width: "100%", textAlign: "center"}}>
            
                <TextField floatingLabelText="手机号（必填" value={this.state.tel} onChange={(e, v) => this.setState({tel: v})} />
            
            
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
                <TableHeaderColumn>节次</TableHeaderColumn>
                <TableHeaderColumn>联系方式</TableHeaderColumn>
                <TableHeaderColumn>状态</TableHeaderColumn>
                <TableHeaderColumn>查看详情</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.outerRecords.map((ele, idx) => {
                let targetName = null;
                for(let i of camGym[ele.campus]) {
                    if(i.name == ele.gym) {
                        targetName = i.label;
                        break;
                    }
                }
                let state = null;
                if(ele.state == 3)
                    state = '通过';
                if(ele.state == 2)
                    state = '未通过'
                if(ele.state == 1)
                    state = '待审核'
                let targetClsTime = ele.classtime;
                for(let i in this.serial) {
                    targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
                }
                return (
                    <TableRow key={idx}>
                        <TableRowColumn title={this.schoolNameMap[ele.campus]}>{this.schoolNameMap[ele.campus]}</TableRowColumn>
                        <TableRowColumn title={targetName}>{targetName}</TableRowColumn>
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
        ApplyModel.putInnerApply({applyId: this.props.applyId, state, remark: this.props.remark});
    }

    deleteApplyState() {
        ApplyModel.deleteInnerApply({applyId: this.props.applyId});
    }

    render() {
        if(!this.props.record)
            return <div></div>
        let targetName = null;
        for(let i of camGym[this.props.record.campus]) {
            if(i.name == this.props.record.gym) {
                targetName = i.label;
                break;
            }
        }
        let targetClsTime = this.props.record.classtime;
        for(let i in this.serial) {
            targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
        }
        let state = null;
        state = this.props.record.state == 3 ? '通过' : this.props.record  == -3 ? '未通过' : '正在审核';
        return (
            <Dialog
                style={{userSelect: "none", width: "1000px", marginLeft: "calc(50% - 500px)"}}
                title="申请详情"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                actions={<RaisedButton label="点击打印" onClick={() => printTable()} />}
            >
                <div>
                    <div dangerouslySetInnerHTML={{__html: `
                    <div id="printDiv" style="width:600px;margin: 0 auto;">
                    <style>
                        .apply-table td {
                            height: 70px;
                        }
                        .apply-table-content {
                            height: 200px;
                        }
                        .apply-table-content td {
                            text-align: left;
                            padding-left: 20px;
                        }
                        table {
                            border-spacing: 0;
                            border-collapse: collapse;
                            text-align: center;
                        }
                    </style>
                    <div style="text-align: center" class="apply-table">
                    <h2>山东大学学生社团活动申请表</h2>
                    <span style="float: right; margin-right: 20px">申请时间:${this.props.record.created_at}</span>
                    <table border="1" style="width:100%; text-align: center">
                        <tbody>
                        <tr>
                            <td width="25%">申请校区</td>
                            <td>${this.schoolNameMap[this.props.record.campus]}</td>
                            <td width="25%">申请场馆</td>
                            <td>${targetName}</td>
                        </tr>
                        <tr>
                            <td>使用节次</td>
                            <td>${targetClsTime}</td>
                            <td>使用时间</td>
                            <td>${this.props.record.time}</td>
                        </tr>
                        <tr>
                            <td>参加人数</td>
                            <td>${this.props.record.pnumber}</td>
                            <td>费用</td>
                            <td>${this.props.record.money}</td>
                        </tr>
                        <tr>
                            <td>使用学院</td>
                            <td colspan="3">${this.props.record.major}</td>
                        </tr>
                        <tr>
                            <td>学院老师</td>
                            <td>${this.props.record.teacher}</td>
                            <td>学院老师联系方式</td>
                            <td colspan="3">${this.props.record.teacher_tel}</td>
                        </tr>
                        <tr class="apply-table-content">
                            <td>活动内容</td>
                            <td colspan="3">${this.props.record.content}</td>
                        </tr>
                        <tr>
                            <td>组织者</td>
                            <td>${this.props.record.charger}</td>
                            <td>组织者联系方式</td>
                            <td>${this.props.record.tel}</td>
                        </tr>
                        <tr>
                            <td>活动第一负责人（联系方式）</td>
                            <td colspan="3">asd</td>
                        </tr>
                        <tr class="apply-table-content">
                            <td>备注</td>
                            <td colspan="3">${this.props.record.remark}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>
                    `}}>
                    
                    </div>
                    {/*<span>上轮审批备注：</span><span>{this.props.record.teacher_remark}</span><br />*/}
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
        let targetName = null;
        for(let i of camGym[this.props.record.campus]) {
            if(i.name == this.props.record.gym) {
                targetName = i.label;
                break;
            }
        }
        let targetClsTime = this.props.record.classtime;
        for(let i in this.serial) {
            targetClsTime = targetClsTime.replace(this.serial[i], 1*i+1);
        }
        let state = null;
            if(this.props.record.state == 3)
                state = '通过';
            if(this.props.record.state == 2)
                state = '未通过'
            if(this.props.record.state == 1)
                state = '待审核'

        let oldContent = 
            <div>
                <div>
                    <span>校区：</span><span>{this.schoolNameMap[this.props.record.campus]}</span><br />
                    <span>场馆：</span><span>{targetName}</span><br />
                    <span>负责人：</span><span>{this.props.record.charger}</span><br />
                    <span>使用时间：</span><span>{this.props.record.time}</span><br />
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
            </div>
        return (
            
            <Dialog
                style={{userSelect: "none", width: "1000px", marginLeft: "calc(50% - 500px)"}}
                title="申请详情"
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.onRequestClose}
                autoScrollBodyContent={true}
                actions={<RaisedButton label="点击打印" onClick={() => printTable()} />}
            >
                <div>
                    <div dangerouslySetInnerHTML={{__html: `
                    <div id="printDiv" style="width:600px;margin: 0 auto;">
                    <style>
                        .apply-table td {
                            height: 70px;
                        }
                        .apply-table-content {
                            height: 200px;
                        }
                        .apply-table-content td {
                            text-align: left;
                        }
                        table {
                            border-spacing: 0;
                            border-collapse: collapse;
                            text-align: center;
                        }
                    </style>
                    <div style="text-align: center" class="apply-table">
                    <h2>山东大学学生社团活动申请表</h2>
                    <span style="float: right; margin-right: 20px">申请时间:${this.props.record.created_at}</span>
                    <table border="1" style="width:100%; text-align: center">
                        <tbody>
                        <tr>
                            <td width="25%">申请校区</td>
                            <td>${this.schoolNameMap[this.props.record.campus]}</td>
                            <td width="25%">申请场馆</td>
                            <td>${targetName}</td>
                        </tr>
                        <tr>
                            <td>使用节次</td>
                            <td>${targetClsTime}</td>
                            <td>使用时间</td>
                            <td>${this.props.record.time}</td>
                        </tr>
                        <tr>
                            <td>参加人数</td>
                            <td>${this.props.record.pnumber}</td>
                            <td>费用</td>
                            <td>${this.props.record.money}</td>
                        </tr>
                        <tr class="apply-table-content">
                            <td>活动内容</td>
                            <td colspan="3">${this.props.record.content}</td>
                        </tr>
                        <tr>
                            <td>组织者</td>
                            <td>${this.props.record.charger}</td>
                            <td>组织者联系方式</td>
                            <td>${this.props.record.tel}</td>
                        </tr>
                        <tr>
                            <td>活动第一负责人（联系方式）</td>
                            <td colspan="3">asd</td>
                        </tr>
                        <tr class="apply-table-content">
                            <td>备注</td>
                            <td colspan="3">${this.props.record.remark}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </div>
                    `}}>
                    
                    </div>
                    {/*<span>上轮审批备注：</span><span>{this.props.record.teacher_remark}</span><br />*/}
                </div>
            </Dialog>
            
        )
    }
}