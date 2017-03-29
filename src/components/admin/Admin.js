import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Privilege from './Privilege';

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
        return (
            <MuiThemeProvider>
                <Tabs>
                    {this.list.map( (e, idx) => <Tab style={{fontSize: "12px"}} key={idx} label={e.label}>{e.ele}</Tab>)}
                </Tabs>
            </MuiThemeProvider>
        )
    }
}