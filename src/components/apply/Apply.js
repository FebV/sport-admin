import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

export default class Apply extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
            <Tabs>
                <Tab label="校内申请">
                <MuiThemeProvider>
                <div style={{margin: "40px 0", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "40%", padding: "20px"}}>
                 <SelectField
                    floatingLabelText="选择校区"
                    value="123"
                    >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField><br />
                <SelectField
                    floatingLabelText="选择场馆"
                    value="123"
                    >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                /><br />
                <TextField 
                    floatingLabelText="使用学院"
                /><br />
                <TextField 
                    floatingLabelText="活动内容"
                /><br />
                <TextField 
                    floatingLabelText="参加人数"
                /><br />
                <TextField 
                    floatingLabelText="负责人姓名"
                /><br />
                <TextField 
                    floatingLabelText="联系方式"
                /><br />
                <TextField 
                    floatingLabelText="备注"
                /><br />
                <RaisedButton
                    label="提交"
                />
                </Paper>
                </div>
                </MuiThemeProvider>
                </Tab>
                <Tab label="校外申请" >
                <MuiThemeProvider>
                <div style={{margin: "40px 0", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Paper style={{width: "40%", padding: "20px"}}>
                 <SelectField
                    floatingLabelText="选择校区"
                    value="123"
                    >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField><br />
                <SelectField
                    floatingLabelText="选择场馆"
                    value="123"
                    >
                    <MenuItem value={1} primaryText="Never" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="使用日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                /><br />
                <TextField 
                    floatingLabelText="使用单位"
                /><br />
                <TextField 
                    floatingLabelText="活动内容"
                /><br />
                <TextField 
                    floatingLabelText="负责人姓名"
                /><br />
                <TextField 
                    floatingLabelText="联系方式"
                /><br />
                <TextField 
                    floatingLabelText="备注"
                /><br />
                <RaisedButton
                    label="提交"
                />
                </Paper>
                </div>
                </MuiThemeProvider>
                </Tab>
            </Tabs>
            </MuiThemeProvider>
        )
    }
}