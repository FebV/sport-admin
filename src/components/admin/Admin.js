import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Redirect} from 'react-router-dom'
import Privilege from './Privilege';
import Auth from '../../controllers/Auth'

export default class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.list =[
            {
                label: '新闻公告管理',
                ele: <div>news</div>
            }, 
            {
                label: '场馆管理',
                ele: <div>news</div>
            },
            {
                label: '账号权限',
                ele: <Privilege />
            },
            {
                label: '留言板',
                ele: <div>news</div>
            },
            {
                label: '申请表格审核',
                ele: <div>news</div>
            },
            {
                label: '器材管理',
                ele: <div>news</div>
            },
            {
                label: "上传文件",
                ele: <div>news</div>
            }
        ]
    }

    render() {
        if(!Auth.isLogin()) {
            alert('请先登录')
            return (
                <Redirect to="/" push />
            )
        }
        return (
            <div></div>
        )
    }
}