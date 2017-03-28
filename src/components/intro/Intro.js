import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ZhTab from './ZhTab';
import ZxTab from './ZxTab';
import HjlTab from './HjlTab';
import QfsTab from './QfsTab';
import BtqTab from './BtqTab';
import XlsTab from './XlsTab';
import RjyTab from './RjyTab';

export default class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.list =[
            {
                label: '综合体育馆',
                ele: <ZhTab />
            }, 
            {
                label: '中心校区',
                ele: <ZxTab />
            },
            {
                label: "洪家楼校区",
                ele: <HjlTab />
            },
            {
                label: "千佛山校区",
                ele: <QfsTab />
            },
            {
                label: "趵突泉校区",
                ele: <BtqTab />
            },
            {
                label: "兴隆山校区",
                ele: <XlsTab />
            },
            {
                label: "软件园校区",
                ele: <RjyTab />
            }
        ]
    }

    render() {
        return (
            <MuiThemeProvider>
                <Tabs>
                    {this.list.map( (e, idx) => <Tab style={{fontSize: "2vw"}} key={idx} label={e.label}>{e.ele}</Tab>)}
                </Tabs>
            </MuiThemeProvider>
        )
    }
}