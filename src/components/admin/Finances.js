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
        this.isLoading = false;
        window.onscroll =  e => {
            if(this.isLoading)
                return;
            //let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if((document.body.scrollTop + innerHeight) == document.body.scrollHeight) {
                this.page++;
                this.query();
            }
        }

        addEventListener('post finance ok', () => {
            this.componentDidMount();
        })
        addEventListener('delete finance ok', () => {
            this.componentDidMount();
        })
        addEventListener('put finance ok', () => {
            this.componentDidMount();
        })


    }

    componentDidMount(){
        this.isLoading = true;
        FinanceModel.getFinance(this.page)
        console.log(1)
            // .then(
            //     res=>{
            //         this.isLoading =false;
            //         console.log(res);
            //         // this.setState({
            //         //     financeArr:[...this.state.financeArr,...res.data]
            //         // })
            //     }
            // )
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