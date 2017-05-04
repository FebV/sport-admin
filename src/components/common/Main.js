import React from 'react';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';

import HeaderBar from './HeadBar';
import SideBar from './SideBar';
import AlertBar from './AlertBar';
import NavBar from './NavBar';

import Home from '../home/Home';
import News from '../NewsInfo/News';
import Notice from '../Notice/Notice';
import NewsDetail from '../NewsInfo/NewsDetail.js';
import NoticeDetail from '../Notice/NoticeDetail';
import Intro from '../intro/Intro';
import File from '../File/file';
import Apply from '../apply/Apply';
import ApplyResult from '../apply/ApplyResult';
import Comment from '../comment/Comment';
import Query from '../query/Query';
import Admin from '../admin/Admin';
import Mine from '../admin/Mine';
import AdminNews from '../admin/News';
import AdminNotice from '../admin/Notice';
import Account from '../admin/Account';
import Gym from '../admin/Gym';
import AdminApply from '../admin/Apply';
import AdminEquip from '../admin/Equipment';
import AdminComment from '../admin/Comment';
//import DownLoad from '../DownLoad/DownLoad';
import Finances from '../admin/Finances';
import FileAdmin from '../admin/File';
import ReactCSSTransitionGroup from 'react-addons-transition-group';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        //const isLandscape = matchMedia('(orientation: landscape)').matches == true;
        const isLandscape = true;
        this.state = {
            isLandscape,
            drawerState: isLandscape,
            drawerDocked: isLandscape,
            alertBarState: false
        }
        // onresize = () => {
        //     if (matchMedia('(orientation: landscape)').matches != this.state.isLandscape) {
        //         this.setState({isLandscape: !this.state.isLandscape, drawerState: !this.state.isLandscape, drawerDocked: !this.state.isLandscape});
        //     }
        // }

    }

    handleDrawer() {
        this.setState({drawerState: !this.state.drawerState});
    }

    render() {
        return (
        <MuiThemeProvider>
        <div>
            {location.pathname.indexOf('admin') == -1 ?
            <div>
            <HeaderBar />
            <NavBar />
            </div>
            :
            <div>
            <HeaderBar />                
            <SideBar drawerDocked={this.state.drawerDocked} open={this.state.drawerState} handleDrawer={this.handleDrawer.bind(this)}/>
            {/*<div style={{marginLeft: this.state.isLandscape ? '256px' : '0px', height: "calc(100% - 64px)"}}></div>*/}
            </div>}

            <div style={{marginLeft: location.pathname.indexOf('admin') > -1 && this.state.isLandscape ? '256px' : '0px', height: "calc(100% - 10vh)"}}>
                <div style={{height: "100%"}}>
                <Route exact path="/" component={ Home } />
                <Route exact path="/news" component={ News } />
                <Route path="/news/:id" component={ NewsDetail } />
                <Route exact path="/notice" component={ Notice } />                
                <Route path="/notice/:id" component={ NoticeDetail } />
                <Route path="/intro" component={ Intro } />
                <Route path="/apply" component={ Apply } />
                <Route path="/result" component={ ApplyResult } />
                <Route path="/comment" component={ Comment } />
                <Route path="/query" component={ Query } />
                <Route path="/file" component={ File } />

                <Route exact path="/intro" component={ Admin } />
                    <Route path="/intro/Btq"  />
                    <Route path="/intro/Hjl"  />
                    <Route path="/intro/Qfs" />
                    <Route path="/intro/Rjy"  />
                    <Route path="/intro/Zh"  />
                    <Route path="/intro/Zx" />


                <Route path="/admin" component={ Admin } />
                    <Route path="/admin/mine" component={ Mine } />
                    <Route path="/admin/news" component={ AdminNews } />
                    <Route path="/admin/notice" component={ AdminNotice } />
                    <Route path="/admin/account" component={ Account } />
                    <Route path="/admin/gym" component={ Gym } />
                    <Route path="/admin/apply" component={ AdminApply } />
                    <Route path="/admin/equipment" component={ AdminEquip } />
                    <Route path="/admin/comment" component={ AdminComment } />
                    <Route path="/admin/file" component={ FileAdmin } />
                    <Route path="/admin/finance" component={ Finances } />
                </div>
            </div>
            <AlertBar />
        </div>
        </MuiThemeProvider>
        )
    }
}