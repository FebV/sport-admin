import React from 'react';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import {Tabs, Tab} from 'material-ui/Tabs';

import Auth from '../../controllers/Auth';
import User from '../../controllers/User';
import EquipmentModel from '../../controllers/Equipment';
import camGym from '../../config/cam-gym';
import GymSelector from '../common/GymSelector';

export default class Equipment extends React.Component {
    constructor(props) {
        super(props);
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
        this.schoolNameMap = {
            'mu': '综合体育馆',
            'zx': '中心校区',
            'hj': '洪家楼校区',
            'qf': '千佛山校区',
            'bt': '趵突泉校区',
            'xl': '兴隆山校区',
            'rj': '软件园校区',
        };
        this.state = {
            transEquipName: '',
            campus: 'zx',
            equipments: [],
            trans: [],
            addEquipmentDialogOpen: false,
            transEquipmentDialogOpen: false,
            editEquipmentDialogOpen: false,
            searchWord: '',
            canOperate: true,
        }
        addEventListener('post equipment ok', () => this.queryEquipment())
        addEventListener('delete equipment ok', () => this.queryEquipment())
        addEventListener('delete trans ok', () => this.queryTrans())
    }

    componentDidMount() {
        User.canModEquip().then(res => {
            this.setState({canOperate: res});
        })
    }

    queryEquipment() {
        EquipmentModel.getEquipment(this.state.campus)
            .then(res => this.setState({equipments: res}));
    }

    queryTrans() {
        EquipmentModel.getTrans(this.state.campus)
            .then(res => this.setState({trans: res}));
    }

    search() {
        if(this.state.searchWord == '')
            return alert('器材名称必填')
        EquipmentModel.searchByName({name: this.state.searchWord})
            .then(res => {
                this.setState({equipments: res});
            })
    }

    handleDeleteEquipment(id) {
        EquipmentModel.deleteEquipment(id);
    }

    handleDeleteTrans(id) {
        EquipmentModel.deleteTrans(id);
    }

    render() {
        return (
            
            <Tabs>
            <Tab label="器材总览">
            <div style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <div style={{width: "100%", textAlign: "center"}}>
                校区
            
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.campus}
                onChange={(e, k, v) => this.setState({campus: v})}
            >
                <MenuItem value={"mu"} primaryText="综合体育馆" />
                <MenuItem value={"zx"} primaryText="中心校区" />
                <MenuItem value={"hj"} primaryText="洪家楼校区" />
                <MenuItem value={"qf"} primaryText="千佛山校区" />
                <MenuItem value={"bt"} primaryText="趵突泉校区" />
                <MenuItem value={"xl"} primaryText="兴隆山校区" />
                <MenuItem value={"rj"} primaryText="软件园校区" />
            </DropDownMenu>
            
            <RaisedButton label="查询" onClick={() => this.queryEquipment()}></RaisedButton><br />
            <span style={{position: "relative", top: "0px", right: "30px"}}>或</span>
                <TextField floatingLabelText="根据名称搜索" value={this.state.searchWord} onChange={(e, v) => this.setState({searchWord: v})} /><i style={{cursor: "pointer"}} className="fa fa-search" onClick={this.search.bind(this)} />
            </div>
            
            <Paper style={{width: "90%"}}>
            <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn>体育馆</TableHeaderColumn>
                <TableHeaderColumn>场馆类型</TableHeaderColumn>
                <TableHeaderColumn><span onClick={() => {
                    this.setState({equipments: this.state.equipments.sort((a, b) => a.equipment_name > b.equipment_name)})  
                }}>器材名称</span></TableHeaderColumn>
                <TableHeaderColumn>购置日期</TableHeaderColumn>
                <TableHeaderColumn>购置数量</TableHeaderColumn>
                <TableHeaderColumn>在用数量</TableHeaderColumn>
                <TableHeaderColumn>弃置数量</TableHeaderColumn>
                <TableHeaderColumn>规格</TableHeaderColumn>
                <TableHeaderColumn>采购价格</TableHeaderColumn>
                <TableHeaderColumn>备注</TableHeaderColumn>
                {this.state.canOperate ? <TableHeaderColumn>操作</TableHeaderColumn> : null}
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {this.state.equipments.map( (e, idx) => {
                return (
                    <TableRow key={idx}> 
                        <TableRowColumn>{e.gym}</TableRowColumn>
                        <TableRowColumn>{e.type}</TableRowColumn>
                        <TableRowColumn>{e.equipment_name}</TableRowColumn>
                        <TableRowColumn>{e.buy_date}</TableRowColumn>
                        <TableRowColumn>{e.buy_number}</TableRowColumn>
                        <TableRowColumn>{e.in_number}</TableRowColumn>
                        <TableRowColumn>{e.no_number}</TableRowColumn>
                        <TableRowColumn>{e.unit}</TableRowColumn>
                        <TableRowColumn>{e.price}</TableRowColumn>
                        <TableRowColumn title={e.remark}>{e.remark}</TableRowColumn>
                        {this.state.canOperate ? <TableRowColumn>
                            <i 
                            title="删除"
                            style={ this.state.deleteIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({deleteIndex: idx})}
                            onMouseLeave={() => this.setState({deleteIndex: null})}
                            onClick={ () => {
                                const re = confirm(`确定要删除器材 ${e.equipment_name} ?`);
                                if(re)
                                    this.handleDeleteEquipment(e.id);
                                //this.handleDeleteDialogOpen();
                                //this.setState({deleteAdminId: e.u_id});
                            }}
                            className="fa fa-times">
                            </i>
                            <i 
                            title={"修改"}
                            style={ this.state.editIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({editIndex: idx})}
                            onMouseLeave={() => this.setState({editIndex: null})}
                            onClick={ () => {
                                this.setState({editEquipmentDialogOpen: true});
                                this.setState({editEquipmentId: e.id});
                                this.setState({editEquipName: e.equipment_name});
                            }}
                            className={"fa fa-pencil-square-o"}>
                            </i>
                            <i 
                            title={"变动"}
                            style={ this.state.authIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({authIndex: idx})}
                            onMouseLeave={() => this.setState({authIndex: null})}
                            onClick={ () => {
                                this.setState({transEquipmentDialogOpen: true});
                                this.setState({transEquipmentId: e.id});
                                this.setState({transEquipName: e.equipment_name});
                            }}
                            className={"fa fa-check-square-o"}>
                            </i>
                        </TableRowColumn> : null}
                    </TableRow>
                )
            })}
            </TableBody>
            </Table>
            </Paper>
            
            
            <FloatingActionButton onClick={() => this.setState({addEquipmentDialogOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            
            
            <AddEquipment handleClose={() => this.setState({addEquipmentDialogOpen: false})} open={this.state.addEquipmentDialogOpen} />
            <TransEquipment equipment_name={this.state.transEquipName} id={this.state.transEquipmentId} open={this.state.transEquipmentDialogOpen} close={() => this.setState({transEquipmentDialogOpen: false})} />
            <EditEquipment props={this.state} equipment_name={this.state.editEquipName} id={this.state.editEquipmentId} open={this.state.editEquipmentDialogOpen} close={() => this.setState({editEquipmentDialogOpen: false})} />
            </div>
            </Tab>
            <Tab label="变动记录">
            <div style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
            <div style={{width: "100%", textAlign: "center", height: "20%"}}>
                校区
            
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.campus}
                onChange={(e, k, v) => this.setState({campus: v})}
            >
                <MenuItem value={"mu"} primaryText="综合体育馆" />
                <MenuItem value={"zx"} primaryText="中心校区" />
                <MenuItem value={"hj"} primaryText="洪家楼校区" />
                <MenuItem value={"qf"} primaryText="千佛山校区" />
                <MenuItem value={"bt"} primaryText="趵突泉校区" />
                <MenuItem value={"xl"} primaryText="兴隆山校区" />
                <MenuItem value={"rj"} primaryText="软件园校区" />
            </DropDownMenu>
            
            <RaisedButton label="查询" onClick={() => this.queryTrans()}></RaisedButton>
            </div>
            
            <Paper style={{width: "90%"}}>
            <Table selectable={false} >
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn>操作人</TableHeaderColumn>
                <TableHeaderColumn>所属校区</TableHeaderColumn>
                <TableHeaderColumn>所属场馆</TableHeaderColumn>
                <TableHeaderColumn>器材名称</TableHeaderColumn>
                <TableHeaderColumn>使用校区</TableHeaderColumn>
                <TableHeaderColumn>使用场馆</TableHeaderColumn>
                <TableHeaderColumn>使用数量</TableHeaderColumn>
                <TableHeaderColumn>使用时期</TableHeaderColumn>
                <TableHeaderColumn>备注</TableHeaderColumn>
                <TableHeaderColumn>操作</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={false}
            >
            {/*this.state.trans.map( (e, idx) => {
                let belongGym = camGym[e.belong_campus].find(v => v.name == e.belong_gym);
                let useGym = camGym[e.belong_campus].find(v => v.name == e.belong_gym);
                let belongGymName = '未指定';
                let useGymName = '未指定';
                if(belongGym)
                    belongGymName = belongGym.label;
                if(useGym)
                    useGymName = useGym.label;
                return (
                    <TableRow key={idx}> 
                        <TableRowColumn>{e.adminname}</TableRowColumn>
                        <TableRowColumn>{this.schoolNameMap[e.belong_campus]}</TableRowColumn>
                        <TableRowColumn>{belongGymName}</TableRowColumn>
                        <TableRowColumn>{e.equipment_name}</TableRowColumn>
                        <TableRowColumn>{this.schoolNameMap[e.use_campus]}</TableRowColumn>
                        <TableRowColumn>{useGymName}</TableRowColumn>
                        <TableRowColumn>{e.use_number}</TableRowColumn>
                        <TableRowColumn>{e.created_at.substring(0, 10)}</TableRowColumn>
                        <TableRowColumn title={e.remark}>{e.remark}</TableRowColumn>
                        <TableRowColumn>
                            <i 
                            title="删除"
                            style={ this.state.deleteIndex == idx ? this.deleteHoverStyle : this.deleteInitStyle}
                            onMouseOver={() => this.setState({deleteIndex: idx})}
                            onMouseLeave={() => this.setState({deleteIndex: null})}
                            onClick={ () => {
                                const re = confirm(`确定要删除记录 ?`);
                                if(re)
                                    this.handleDeleteTrans(e.id);
                                //this.handleDeleteDialogOpen();
                                //this.setState({deleteAdminId: e.u_id});
                            }}
                            className="fa fa-times">
                            </i>
                        </TableRowColumn>
                    </TableRow>
                )
            })*/}
            </TableBody>
            </Table>
            </Paper>
            
            
            <FloatingActionButton onClick={() => this.setState({addEquipmentDialogOpen: true})} style={{position: 'fixed', right: "30px", bottom: "30px"}}>
                <i className="fa fa-plus fa-lg"></i>
            </FloatingActionButton>
            
            </div>
            
            </Tab>
            </Tabs>
            
        )
    }
}

class AddEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campus: '',
            gym: '',
            type: '',
            equipment_name: '',
            buy_date: '',
            buy_number: '',
            in_number: '',
            unit: '',
            no_number: '',
            use_campus: 'zx',
            use_number: '0',
            price: '',
            remark: '',
        }
    }

    addEquipment() {
        this.props.handleClose();
        EquipmentModel.postEquipment({
            campus: this.state.campus,
            type: this.state.type,
            gym: this.state.gym,
            equipment_name: this.state.equipment_name,
            buy_date: this.fitDate(this.state.buy_date),
            buy_number: this.state.buy_number,
            unit: this.state.unit,
            //in_number: this.state.in_number,
            //no_number: this.state.no_number,
            use_campus: this.state.campus,
            use_number: this.state.use_number,
            price: this.state.price,
            remark: this.state.remark,
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
        return (
            
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="新增器材"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.handleClose}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.addEquipment.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.handleClose}
                autoScrollBodyContent={true}
            >
            <div style={{width: "100%", textAlign: "center"}}>
            {/*校区
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.campus}
                onChange={(e, k, v) => this.setState({campus: v})}
            >
                <MenuItem value={"mu"} primaryText="综合体育馆" />
                <MenuItem value={"zx"} primaryText="中心校区" />
                <MenuItem value={"hj"} primaryText="洪家楼校区" />
                <MenuItem value={"qf"} primaryText="千佛山校区" />
                <MenuItem value={"bt"} primaryText="趵突泉校区" />
                <MenuItem value={"xl"} primaryText="兴隆山校区" />
                <MenuItem value={"rj"} primaryText="软件园校区" />
            </DropDownMenu>*/}
            <GymSelector onChange={(g) => {
                    this.setState({campus: g.campus, type: g.type, gym: g.gym})    
            }} />
            
            </div>
                <TextField
                    floatingLabelText="器材名称"
                    value={this.state.equipment_name}
                    onChange={(e, v) => this.setState({equipment_name: v})}
                /><br />
                <DatePicker
                    style={{display: "inline-block", position: "relative", top: "10px"}}
                    hintText="购置日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({buy_date: v});
                        }}
                /><br />
                <TextField
                    floatingLabelText="购置数量"
                    value={this.state.buy_number}
                    onChange={(e, v) => this.setState({buy_number: v})}
                /><br />
                <TextField
                    floatingLabelText="规格"
                    value={this.state.unit}
                    onChange={(e, v) => this.setState({unit: v})}
                /><br />
                {/*<TextField
                    floatingLabelText="在用数量"
                    value={this.state.in_number}
                    onChange={(e, v) => this.setState({in_number: v})}
                /><br />
                <TextField
                    floatingLabelText="报废数量"
                    value={this.state.no_number}
                    onChange={(e, v) => this.setState({no_number: v})}
                /><br />*/}
                <TextField
                    floatingLabelText="采购价格"
                    value={this.state.price}
                    onChange={(e, v) => this.setState({price: v})}
                /><br />
                <TextField
                    floatingLabelText="备注"
                    value={this.state.remark}
                    onChange={(e, v) => this.setState({remark: v})}
                /><br />
                
            </Dialog>
            
        )
    }
}

class TransEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            belong_campus: 'zx',
            belong_gym: 'basketball',
            use_campus: 'xl',
            use_gym: 'basketball',
            equipment_name: '',
            number: 0,
            remark: '',
        }
    }

    transEquipment() {
        this.props.close();
        EquipmentModel.transEquipment({
            belong_campus: this.state.belong_campus,
            belong_gym: this.state.belong_gym,
            use_campus: this.state.use_campus,
            use_gym: this.state.use_gym,
            equipment_name: this.props.equipment_name,
            use_number: this.state.number,
            remark: this.state.remark,
        });
    }

    render() {
        return (
            
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="器材调动"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.close}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.transEquipment.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}
            >
            <div style={{width: "100%", textAlign: "center"}}>
            所属校区
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.belong_campus}
                onChange={(e, k, v) => this.setState({belong_campus: v})}
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
            所属场馆
            
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.belong_gym}
                    onChange={(e, k, v) => this.setState({belong_gym: v})}
                >
                    {/*{camGym[this.state.belong_campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}*/}
                    
                </DropDownMenu>
            
            </div>
            <div style={{width: "100%", textAlign: "center"}}>
            使用校区
            <DropDownMenu
                style={{position: 'relative', top: '20px'}}
                value={this.state.use_campus}
                onChange={(e, k, v) => this.setState({use_campus: v})}
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
            使用场馆
            
                <DropDownMenu
                    style={{position: 'relative', top: '20px'}}
                    value={this.state.use_gym}
                    onChange={(e, k, v) => this.setState({use_gym: v})}
                >
                    {/*{camGym[this.state.use_campus].map((e, idx) => {
                        return <MenuItem key={idx} value={e.name} primaryText={e.label} />
                    })}*/}
                    
                </DropDownMenu>
            
            </div>
            <TextField
                floatingLabelText="器材名称"
                value={this.props.equipment_name}
                disabled={true}
            /><br />
            <TextField
                floatingLabelText="调出数量"
                value={this.state.number}
                onChange={(e, v) => this.setState({number: v})}
            /><br />
            <TextField
                floatingLabelText="备注"
                value={this.state.remark}
                onChange={(e, v) => this.setState({remark: v})}
            /><br />
            
            </Dialog>
            
        )
    }
}

class EditEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    editEquipment() {
        console.log(`equip`);
    }

    render() {
        if(!this.props.id)
            return null;
        const equip = this.props.props.equipments.find(e => e.id == this.props.id);
        console.log(equip);
        return (
            
            <Dialog
                style={{width: "500px", marginLeft: "calc(50% - 250px)"}}
                title="修改器材"
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={this.props.close}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.editEquipment.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.close}
                autoScrollBodyContent={true}
            >
            <div style={{width: "100%", textAlign: "center"}}>
            
            <TextField
                floatingLabelText="体育场馆"
                value={ equip.gym}
                disabled={true}
            /><br />
            <TextField
                floatingLabelText="器材名称"
                value={ equip.equipment_name}
                disabled={true}
            /><br />
            <TextField
                floatingLabelText="购置日期"
                value={ equip.buy_date}
                disabled={true}
            /><br />
            <TextField
                floatingLabelText="购置数量"
                value={this.state.buy_number || equip.buy_number}           //buy_number or number
                onChange={(e, v) => this.setState({buy_number: v})}
            /><br />
            <TextField
                floatingLabelText="弃置数量"
                value={this.state.no_number || equip.no_number}
                onChange={(e, v) => this.setState({no_number: v})}
            /><br />
            <TextField
                floatingLabelText="在用数量（购置减去弃置）"
                value={(this.state.buy_number || equip.buy_number) - (this.state.no_number || equip.no_number)}
                disabled={true}
            /><br />
            <TextField
                floatingLabelText="采购价格"
                value={equip.price}
                onChange={(e, v) => this.setState({remark: v})}
            /><br />
            </div>
            </Dialog>
            
        );
    }
}