import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

export default class Query extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
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
                /><br />
                <span style={{margin: "0 20px"}}>至：</span><br />
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                />
            </div>
            </MuiThemeProvider>

            <div style={{marginTop: "20px", display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <MuiThemeProvider>
            <Paper style={{width: "80%"}}>
            <Table>
            <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
            >
                <TableRow>
                <TableHeaderColumn>返</TableHeaderColumn>
                <TableHeaderColumn>回</TableHeaderColumn>
                <TableHeaderColumn>结</TableHeaderColumn>
                <TableHeaderColumn>果</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
            </TableBody>
            </Table>
            </Paper>
            </MuiThemeProvider>
            </div>
            </div>
        )
    }
}