import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BriefIntro from './BriefIntro';
import PlayGround from './PlayGround';
import Manage from './Manage';
import ActiveReview from './AcitveReview';
import OpenTime from './OpenTime';


export default class Intro extends React.Component {
    constructor(props) {
        super(props);
         this.list =[
            {
                label: '简介',
                ele: <BriefIntro />
            },
            {
                label: '场馆设施',
                ele: <PlayGround />
            },
            {
                label: "管理规定",
                ele: <Manage />
            },
            {
                label: "活动回顾",
                ele: <ActiveReview />
            },
            {
                label: "场馆开放时间表",
                ele: <OpenTime />
            }
        ]
    }

    render() {
        return (
            
                <div>
                    <Tabs>
                    {this.list.map( (e, idx) => <Tab value={idx} style={{fontSize: "12px"}} key={idx} label={e.label}>{e.ele}</Tab>)}
                    </Tabs>
                </div>
            
        )
    }
}