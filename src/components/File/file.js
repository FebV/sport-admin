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
import TextField from 'material-ui/TextField';

import FileModel from '../../controllers/File';
import API from '../../controllers/API';

export default class File extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        }
        this.page = 1;
        this.hasMore = true;
        this.isLoading = false;
    }

    componentDidMount() {
        window.onscroll =  e => {
            if(location.pathname != '/admin/file')
                return;
            if(this.isLoading)
                return;
            if((document.body.scrollTop + innerHeight) == document.body.scrollHeight) {
                this.page++;
                this.query();
            }
        }
        addEventListener('delete file ok', () => {
            this.page = 1;
            this.query();
        });
        addEventListener('post file ok', () => {
            this.page = 1;
            this.query()
        });
        this.query();
    }

    query() {
        if(!this.hasMore)
            return;
        FileModel.getFile({page: this.page})
            .then(res => {
                if(!res)
                    return this.hasMore = false;
                this.setState({fileList: res.data})
            })

    }


    render() {
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                
                <div style={{width: "100%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <div style={{width: "80%", padding: "20px"}}>
                    <div style={{width: "100%", textAlign: "center"}}><h2>文件下载</h2></div>
                <hr />
                </div>
                <div style={{width: "60%"}}>
                    {this.state.fileList.map((e, idx) => {
                        return (
                            <div key={e.id}>
                                <a download={e.title} href={`${API.base}documents/id/${e.id}`}><span>{e.title}</span></a>
                                <span style={{float: "right"}}>{e.created_at}</span>
                                <hr />
                            </div>
                        )
                    })}
                </div>
                </div>
                
            </div>
        )
    }
}
