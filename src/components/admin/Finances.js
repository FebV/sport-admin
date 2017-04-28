import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FinanceModel from '../../controllers/Finance';

export default class Finances extends React.Component{
    constructor(props){
        super(props);
        this.state={
            financeArr:[]
        };
        this.page = 1;

    }
    componentWillMount(){
        FinanceModel.getFinance(this.page)
    }
    render(){
        return(
            <MuiThemeProvider>
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}
                             adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>项目</TableHeaderColumn>
                        <TableHeaderColumn>内容</TableHeaderColumn>
                        <TableHeaderColumn>时间</TableHeaderColumn>
                        <TableHeaderColumn>费用</TableHeaderColumn>
                        <TableHeaderColumn>备注</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody  displayRowCheckbox={false}>

                    <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>

                </TableBody>
            </Table>
            </MuiThemeProvider>
        );
    }

}