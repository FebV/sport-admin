import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ZhTab from './ZhTab';
import ZxTab from './ZxTab';

export default class Intro extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
             <Tabs>
                <Tab label="综合体育馆">
                <ZhTab />
                </Tab>
    <Tab label="中心校区" >
      <ZxTab />
    </Tab>
    <Tab label="洪家楼校区">
        <ZxTab />
    </Tab>
    <Tab label="千佛山校区">
        <ZxTab />
    </Tab>
    <Tab label="趵突泉校区">
        <ZxTab />
    </Tab>
    <Tab label="兴隆山校区">
        <ZxTab />
    </Tab>
    <Tab label="软件园校区">
        <ZxTab />
    </Tab>
  </Tabs>
  </MuiThemeProvider>
        )
    }
}