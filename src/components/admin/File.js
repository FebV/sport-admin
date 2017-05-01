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

    deleteFile(id) {
        const re = confirm('确定删除文件吗')
        if(re)
            FileModel.deleteFile(id);
    }

    render() {
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px"}}>
                <MuiThemeProvider>
                <div style={{width: "100%", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <div style={{width: "80%", padding: "20px"}}>
                <UploadFile />
                <hr />
                </div>
                <div style={{width: "60%"}}>
                    {this.state.fileList.map((e, idx) => {
                        console.log(e);
                        return (
                            <div key={e.id}>
                                <a download={e.title} href={`${API.base}documents/id/${e.id}`}><span>{e.title}</span></a>
                                <RaisedButton label="删除" onClick={() => this.deleteFile(e.id)} style={{position: "relative", float: "right", marginLeft: "20px", bottom: "8px"}} />
                                <span style={{float: "right"}}>{e.created_at}</span>
                                <hr />
                            </div>
                        )
                    })}
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
        this.setState({file: null, fileName: ''})
        FileModel.uploadFile({
            file: this.state.file,
            document_name: this.state.fileName,
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
                floatingLabelText="文件描述（必填）"
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