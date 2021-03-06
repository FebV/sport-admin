import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FinanceModel from '../../controllers/Finance';
import Request from '../../controllers/Request';
import Auth from '../../controllers/Auth';
import API from '../../controllers/API';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import camGym from '../../config/cam-gym';
import TextField from 'material-ui/TextField';

import Export from './exporter/Exporter';

export default class Finances extends React.Component{
    constructor(props){
        super(props);
        this.state={
            financeArr:[],
            addFinanceDialogOpen: false,
            putFinanceDialogOpen: false,
            putFinanceId: 0,
            putFinanceDepartment: '',
            putFinanceCampus: '',
            putFinanceContent: '',
            putFinanceMoney: 0,
            putFinanceBilling_time: '',
            putFinanceAdmin: '',
            putFinanceRemark: '',
            searchCampus:'zx',
            start:'',
            end:'',

        };
        this.schoolNameMap = {
            'mu': '综合体育馆',
            'zx': '中心校区',
            'hj': '洪家楼校区',
            'qf': '千佛山校区',
            'bt': '趵突泉校区',
            'xl': '兴隆山校区',
            'rj': '软件园校区',
        };
        this.deleteInitStyle =
        {
            marginLeft: "5px",
            padding: "2px",
            border: "2px solid black",
            borderRadius: "20%",
            transition: "all 0.2s",
        }
        this.deleteHoverStyle =
        {
            marginLeft: "5px",
            padding: "2px",
            border: "2px solid black",
            borderRadius: "20%",
            transform: "scale(1.2)",
            transition: "all 0.2s",
            cursor: "pointer"
        };
        this.page = 1;
        this.isLoading = false;
        window.onscroll =  e => {
            if(this.isLoading)
                return;
            //let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if((document.body.scrollTop + innerHeight) == document.body.scrollHeight) {
                if(this.state.financeArr.length!=0){
                    this.page++;
                    this.query();
                }

            }
        }

        addEventListener('post finance ok', () => {
            this.page = 1;
            this.setState({financeArr: []})
            this.query();
        })
        addEventListener('delete finance ok', () => {
            this.page = 1;
            this.setState({financeArr: []})
            this.query();
        })
        addEventListener('put finance ok', () => {
            this.page = 1;
            this.setState({financeArr: []})            
            this.query();
        })


    }
    componentDidMount(){
        // this.query();
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
    query(){
        this.isLoading = true;

        Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
            .then(res => res ? res : ED.dispatch({type: 'alert', msg: '请求用户级别失败'}))
            .then(
                res =>{
                    console.log(res);

                    if(res.finance != 0) {
                        let getF =FinanceModel.getFinance(this.page,this.state.searchCampus,this.fitDate(this.state.start),this.fitDate(this.state.end));
                            getF.then(
                                _res=> {
                                    this.isLoading = false;
                                    if(this.state.financeArr != _res.data){
                                        this.setState({
                                            financeArr: [...this.state.financeArr, ..._res.data]
                                        })
                                    }

                                    console.log(this.state.financeArr)
                                }
                            )

                        }
                    })
    }
    exportFin({start, end, campus}){
        FinanceModel.exportFinance({
            campus,
            start,
            end,
        })

        // Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
        //     .then(res => res ? res : ED.dispatch({type: 'alert', msg: '请求用户级别失败'}))
        //     .then(
        //         res =>{
        //             console.log(res);

        //             if(res.finance != 0) {
        //                 let getF =FinanceModel.exportFinance(this.page,this.state.searchCampus,this.fitDate(this.state.start),this.fitDate(this.state.end));
        //                 // getF.then(
        //                 //     _res=> {
        //                 //
        //                 //
        //                 //
        //                 //         console.log(_res);
        //                 //     }
        //                 // )

        //             }
        //         })
    }
    handleDeleteFinance(id){
        // this.setState({
        //     financeArr:[]
        // });
        Request.get({url: API.getLevel, data: {api_token: Auth.getToken()}})
            .then(res => res ? res : ED.dispatch({type: 'alert', msg: '请求用户级别失败'}))
            .then(
                res =>{
                    // console.log(res);
                    if(res.finance != 0) {
                        console.log(id);
                        FinanceModel.deleteFinance(id);


                    }
                })
    }



    render(){
        return(
            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center",marginTop:'20px'}}>
                    <span style={{margin: "0px 20px"}}>从：</span><br />
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
                <div style={{width: "100%", textAlign: "center",height:'80px'}}>
                    校区
                    <DropDownMenu
                        style={{position: 'relative', top: '20px'}}
                        value={this.state.searchCampus}
                        onChange={(e, k, v) => {this.setState({searchCampus: v})}}
                    >
                        <MenuItem value={"mu"} primaryText="综合体育馆" />
                        <MenuItem value={"zx"} primaryText="中心校区" />
                        <MenuItem value={"hj"} primaryText="洪家楼校区" />
                        <MenuItem value={"qf"} primaryText="千佛山校区" />
                        <MenuItem value={"bt"} primaryText="趵突泉校区" />
                        <MenuItem value={"xl"} primaryText="兴隆山校区" />
                        <MenuItem value={"rj"} primaryText="软件园校区" />
                    </DropDownMenu>
                    <RaisedButton
                        label="查询"
                        onClick={()=>{this.setState({financeArr:[]}); this.query()}}
                        style={{marginRight:'20px'}}
                    />
                    <RaisedButton
                        label="导出"
                        onClick={()=>{ this.exportFin()}}
                    />

                </div>


                <div>
                    <Table selectable={false}>
                        <TableHeader displaySelectAll={false}
                                     adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>使用单位</TableHeaderColumn>
                                <TableHeaderColumn>校区</TableHeaderColumn>
                                <TableHeaderColumn>活动内容</TableHeaderColumn>
                                <TableHeaderColumn>费用</TableHeaderColumn>
                                <TableHeaderColumn>入账时间</TableHeaderColumn>
                                <TableHeaderColumn>收费员</TableHeaderColumn>
                                <TableHeaderColumn>备注</TableHeaderColumn>
                                <TableHeaderColumn>操作</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody  displayRowCheckbox={false}>



                            {
                                this.state.financeArr.map((item,idx)=>{

                                    return (<TableRow key={idx} style={{color: `${item.state != 0 ? "gray" : "black"}`}}
                                              hovered={item.state == -1 ? true : false}>

                                        <TableRowColumn title={item.department}>{item.department}</TableRowColumn>
                                        <TableRowColumn
                                            title={this.schoolNameMap[item.campus]}>{this.schoolNameMap[item.campus]}</TableRowColumn>
                                        <TableRowColumn title={item.content}>{item.content}</TableRowColumn>
                                        <TableRowColumn title={item.money}>{item.money}</TableRowColumn>
                                        <TableRowColumn title={item.billing_time}>{item.billing_time}</TableRowColumn>
                                        <TableRowColumn title={item.admin}>{item.admin}</TableRowColumn>
                                        <TableRowColumn title={item.remark}>{item.remark}</TableRowColumn>
                                        <TableRowColumn>
                                            <i
                                                title="删除"
                                                style={ this.state.deleteIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                                                onMouseOver={() => this.setState({deleteIndex: idx})}
                                                onMouseLeave={() => this.setState({deleteIndex: null})}
                                                onClick={ () => {
                                                    const re = confirm(`确定要删除此项?`);
                                                    if (re)
                                                        this.handleDeleteFinance(item.id);
                                                    //this.handleDeleteDialogOpen();
                                                    //this.setState({deleteAdminId: e.u_id});
                                                }}
                                                className="fa fa-times">
                                            </i>
                                            <i
                                                title={`${item.state != 0 ? "撤销" : "变动"}`}
                                                style={ this.state.authIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                                                onMouseOver={() => this.setState({authIndex: idx})}
                                                onMouseLeave={() => this.setState({authIndex: null})}
                                                onClick={ () => {
                                                    this.setState({putFinanceDialogOpen: `${item.state != 0 ?false:true}`});
                                                    this.setState({putFinanceId: item.id});
                                                    this.setState({putFinanceDepartment: item.department});
                                                    this.setState({putFinanceCampus: item.campus});
                                                    this.setState({putFinanceContent: item.content});
                                                    this.setState({putFinanceMoney: item.money});
                                                    this.setState({putFinanceBilling_time: item.billing_time});
                                                    this.setState({putFinanceAdmin: item.admin});
                                                    this.setState({putFinanceRemark: item.remark});
                                                    this.setState({putOrBack:`${item.state != 0 ? "back" :"put"}`});
                                                    {/*this.state.putFinanceId =item.id;*/
                                                    }
                                                    {/*this.state.putFinanceDepartment =item.department;*/
                                                    }
                                                    {/*this.state.putFinanceCampus =item.putFinanceCampus;*/
                                                    }
                                                    {/*this.state.putFinanceContent =item.putFinanceContent;*/
                                                    }
                                                    {/*this.state.putFinanceMoney =item.putFinanceMoney;*/
                                                    }
                                                    {/*this.state.putFinanceBilling_time =item.putFinanceBilling_time;*/
                                                    }
                                                    {/*this.state.putFinanceAdmin =item.putFinanceAdmin;*/
                                                    }
                                                    {/*this.state.putFinanceRemark =item.putFinanceRemark;*/
                                                    }
                                                    {/*console.log(item.money)*/
                                                    }

                                                }}
                                                className={`${item.state != 0 ? "fa fa-reply" :"fa fa-check-square-o"}`}>
                                            </i>
                                        </TableRowColumn>
                                    </TableRow>)
                                }
                            )}



                        </TableBody>

                    </Table>
                    <ChangeFinance id={this.state.putFinanceId}
                                   open={this.state.putFinanceDialogOpen}
                                   close={() => this.setState({putFinanceDialogOpen: false})}
                                   putFinanceCampus = {this.state.putFinanceCampus}
                                   putFinanceDepartment = {this.state.putFinanceDepartment}
                                   putFinanceContent = {this.state.putFinanceContent}
                                   putFinanceMoney = {this.state.putFinanceMoney}
                                   putFinanceBilling_time = {this.state.putFinanceBilling_time}
                                   putFinanceAdmin = {this.state.putFinanceAdmin}
                                   putFinanceRemark = {this.state.putFinanceRemark}

                    />
                    <AddFinance open={this.state.addFinanceDialogOpen} close={() => this.setState({addFinanceDialogOpen: false})} />
                    <Export export={this.exportFin.bind(this)} title="导出财务记录" />
                        <FloatingActionButton onClick={() => this.setState({addFinanceDialogOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                            <i className="fa fa-plus fa-lg"></i>
                        </FloatingActionButton>
                    
                </div>
            </div>
            
        );
    }

}

class AddFinance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department: '',
            campus: 'zx',
            content: '',
            money: 1,
            billing_time: '',
            remark: '',
            admin: '',
        }
    }


    postFinance() {
        this.props.close();
        FinanceModel.postFinance({
            campus: this.state.campus,
            department: this.state.department,
            content: this.state.content,
            money: this.state.money,
            billing_time: this.fitDate(this.state.billing_time),
            remark: this.state.remark,
        });
        console.log(this.state.department);
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

    render() {
        return (
            
                <Dialog
                    style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                    title="发布财务信息"
                    actions={[
                        <RaisedButton
                            label="取消"
                            onClick={this.props.close}
                        />,
                        <RaisedButton
                            style={{marginLeft: "20px"}}
                            label="确定"
                            onClick={()=>this.postFinance()}
                        />
                    ]}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.close}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        floatingLabelText="使用单位"
                        value={this.state.department}
                        onChange={(e, v) => this.setState({department: v})}
                    /><br />
                    <div style={{width: "100%", textAlign: "center"}}>
                        校区
                        <DropDownMenu
                            style={{position: 'relative', top: '20px'}}
                            value={this.state.campus}
                            onChange={(e, k, v) => {this.setState({campus: v})}}

                        >
                            <MenuItem value={"mu"} primaryText="综合体育馆" />
                            <MenuItem value={"zx"} primaryText="中心校区" />
                            <MenuItem value={"hj"} primaryText="洪家楼校区" />
                            <MenuItem value={"qf"} primaryText="千佛山校区" />
                            <MenuItem value={"bt"} primaryText="趵突泉校区" />
                            <MenuItem value={"xl"} primaryText="兴隆山校区" />
                            <MenuItem value={"rj"} primaryText="软件园校区" />
                        </DropDownMenu>
                        <br />

                    </div>
                    <TextField
                        floatingLabelText="活动内容"
                        value={this.state.content}
                        onChange={(e, v) => this.setState({content: v})}
                    /><br />
                    <TextField
                        floatingLabelText="费用"
                        value={this.state.money}
                        onChange={(e, v) => this.setState({money: v})}
                    /><br />
                    <DatePicker
                        style={{display: "inline-block", position: "relative", top: "10px"}}
                        hintText="入账时间"
                        DateTimeFormat={Intl.DateTimeFormat}
                        locale="zh-CN"
                        cancelLabel="取消"
                        okLabel="确定"
                        onChange={(e, v) => {
                            this.setState({billing_time: v});
                        }}
                    /><br />
                    {/*<TextField*/}
                        {/*floatingLabelText="收费员"*/}
                        {/*value={this.state.admin}*/}
                        {/*onChange={(e, v) => this.setState({admin: v})}*/}
                    {/*/><br />*/}
                    <TextField
                        floatingLabelText="备注"
                        value={this.state.remark}
                        onChange={(e, v) => this.setState({remark: v})}
                    /><br />

                </Dialog>
            
        )
    }
}





class ChangeFinance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            department: null,
            campus: 'zx',
            content: null,
            money: null,
            billing_time:null,
            remark: null,
            admin: null,
        }
    }
    componentDidMount(){

    }

    putFinance() {
        this.props.close();
        // console.log(this.state.department?this.state.department:this.props.putFinanceDepartment);
        FinanceModel.putFinance({
            id:this.props.id,
            department: this.state.department?this.state.department:this.props.putFinanceDepartment,
            campus: this.state.campus?this.state.campus:this.props.putFinanceCampus,
            content: this.state.content?this.state.content:this.props.putFinanceContent,
            money: this.state.money?this.state.money:this.props.putFinanceMoney,
            billing_time: this.props.putFinanceBilling_time,
            admin: this.state.admin?this.state.admin:this.props.putFinanceAdmin,
            remark: this.state.remark?this.state.remark:this.props.putFinanceRemark,
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

    render() {
        // console.log(this.props);
        return (
            
                <Dialog
                    style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                    title="修改财务信息"
                    actions={[
                        <RaisedButton
                            label="取消"
                            onClick={this.props.close}
                        />,
                        <RaisedButton
                            style={{marginLeft: "20px"}}
                            label="确定"
                            onClick={()=>this.putFinance(this.props.id)}
                        />
                    ]}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.close}
                    autoScrollBodyContent={true}
                >
                    <TextField
                        floatingLabelText="使用单位"
                        defaultValue={this.props.putFinanceDepartment}
                        onChange={(e, v) => this.setState({department: v})}
                    /><br />
                    <div style={{width: "100%", textAlign: "center"}}>
                        校区
                        <DropDownMenu
                            style={{position: 'relative', top: '20px'}}
                            value={this.state.campus}

                            onChange={(e, k, v) => {this.setState({campus: v});console.log(this.state.campus)}}
                        >
                            <MenuItem value={"mu"} primaryText="综合体育馆" />
                            <MenuItem value={"zx"} primaryText="中心校区" />
                            <MenuItem value={"hj"} primaryText="洪家楼校区" />
                            <MenuItem value={"qf"} primaryText="千佛山校区" />
                            <MenuItem value={"bt"} primaryText="趵突泉校区" />
                            <MenuItem value={"xl"} primaryText="兴隆山校区" />
                            <MenuItem value={"rj"} primaryText="软件园校区" />
                        </DropDownMenu>
                        <br />

                    </div>
                    <TextField
                        floatingLabelText="活动内容"
                        defaultValue={this.props.putFinanceContent}

                        onChange={(e, v) => this.setState({content: v})}
                    /><br />
                    <TextField
                        floatingLabelText="费用"
                        defaultValue={this.props.putFinanceMoney}
                        onChange={(e, v) => this.setState({money: v})}
                    /><br />
                    {/*<DatePicker*/}
                        {/*style={{display: "inline-block", position: "relative", top: "10px"}}*/}
                        {/*hintText= { this.props.putFinanceBilling_time || "更新时间" }*/}
                        {/*DateTimeFormat={Intl.DateTimeFormat}*/}
                        {/*locale="zh-CN"*/}
                        {/*cancelLabel="取消"*/}
                        {/*okLabel="确定"*/}
                        {/*onChange={(e, v) => {*/}
                            {/*this.setState({billing_time: v});*/}
                        {/*}}*/}
                    {/*/><br />*/}
                    <TextField
                        floatingLabelText="收费员"
                        defaultValue={this.props.putFinanceAdmin}
                        disabled={true}
                        onChange={(e, v) => this.setState({admin: v})}
                    /><br />
                    <TextField
                        floatingLabelText="备注"
                        defaultValue={this.props.putFinanceRemark}

                        onChange={(e, v) => this.setState({remark: v})}
                    /><br />

                </Dialog>
            
        )
    }
}