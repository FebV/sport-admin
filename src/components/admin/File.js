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

export default class File extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                <MuiThemeProvider>
                <div>
                <div style={{width: "60%", padding: "20px"}}>
                <UploadFile />
                </div>
                <div>
                    sada
                </div>
                </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

class UploadFile extends React.Component {
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
            fileName: '',
        };
    }

    handleCampusChange(e, k, v) {
        this.setState({campus: v});
    }
    
    handleGymChange(e, k, v) {
        this.setState({gym: v});
    }

    upload() {
        FileModel.uploadFile({
            file: this.state.file,
            document_name: this.fileName,
        })
        //Schedule.postSchedules({campus: this.state.campus, gym: this.state.gym, file: this.state.file});
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
            <div
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
            </div>
            <TextField
                floatingLabelText="文件描述"
                value={this.state.fileName}
                onChange={(e, v) => this.setState({fileName: v})}    
            />
            <RaisedButton
                style={{float: "right", marginLeft: "20px", marginTop: "30px"}}
                label="上传"
                onClick={this.upload.bind(this)}
            />
            </div>
            </MuiThemeProvider>
        )
    }
}