import React from 'react';
import { Route, Link }from 'react-router-dom';

import HeaderBar from './HeadBar';
import SideBar from './SideBar';
import AlertBar from './AlertBar';

import Home from '../home/Home';
import Intro from '../Intro/Intro';
import Apply from '../apply/Apply';
import Comment from '../comment/Comment';
import Query from '../query/Query';
import Admin from '../admin/Admin';
import Mine from '../admin/Mine';
import Account from '../admin/Account';
import Gym from '../admin/Gym';
import AdminApply from '../admin/Apply';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const isLandscape = matchMedia('(orientation: landscape)').matches == true;
        this.state = {
            isLandscape,
            drawerState: isLandscape,
            drawerDocked: isLandscape,
            alertBarState: false
        }
        onresize = () => {
            if (matchMedia('(orientation: landscape)').matches != this.state.isLandscape) {
                this.setState({isLandscape: !this.state.isLandscape, drawerState: !this.state.isLandscape, drawerDocked: !this.state.isLandscape});
            }
        }

    }

    handleDrawer() {
        this.setState({drawerState: !this.state.drawerState});
    }

    render() {
        return (
        <div>
            <HeaderBar leftIcon={!this.state.isLandscape} handleDrawer={this.handleDrawer.bind(this)} />
            <SideBar drawerDocked={this.state.drawerDocked} open={this.state.drawerState} handleDrawer={this.handleDrawer.bind(this)}/>
            <div style={{marginLeft: this.state.isLandscape ? '256px' : '0px', height: "calc(100% - 64px)"}}>
                <div style={{height: "100%"}}>
                <Route exact path="/" component={ Home } />
                <Route path="/intro" component={ Intro } />
                <Route path="/apply" component={ Apply } />
                <Route path="/comment" component={ Comment } />
                <Route path="/query" component={ Query } />

                <Route exact path="/admin" component={ Admin } />
                <Route path="/admin/mine" component={ Mine } />
                <Route path="/admin/account" component={ Account } />
                <Route path="/admin/gym" component={ Gym } />
                <Route path="/admin/apply" component={ AdminApply } />
                </div>
            </div>
            <AlertBar />
        </div>
        )
    }
}