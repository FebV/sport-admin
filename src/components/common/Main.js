import React from 'react';
import { Route, Link }from 'react-router-dom';

import HeaderBar from './HeadBar';
import SideBar from './SideBar';


import Home from '../home/Home';
import Intro from '../Intro/Intro';
import Apply from '../apply/Apply';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        const isLandscape = matchMedia('(orientation: landscape)').matches == true;
        this.state = {
            isLandscape,
            drawerState: isLandscape 
        }
        onresize = () => {
            console.log(`resize`);
            if (matchMedia('(orientation: landscape)').matches != this.state.isLandscape) {
                this.setState({isLandscape: !this.state.isLandscape, drawerState: !this.state.isLandscape});
        }
}
    }

    handleDrawer() {
        console.log(`handleDrawer`);
        this.setState({drawerState: !this.state.drawerState});
    }

    render() {
        return (
        <div>
            <HeaderBar leftIcon={!this.state.isLandscape} handleDrawer={this.handleDrawer.bind(this)} />
            <SideBar open={this.state.drawerState} />
            <div style={{marginLeft: this.state.isLandscape ? '256px' : '0px'}}>
                <Route exact path="/" component={ Home } />
                <Route path="/intro" component={ Intro } />
                <Route path="/apply" component={ Apply } />
            </div>
        </div>
        )
    }
}