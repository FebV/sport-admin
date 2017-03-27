import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link }from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import HeaderBar from './components/common/HeadBar';
import SideBar from './components/common/SideBar';

import Home from './components/home/Home';
import Intro from './components/Intro/Intro';
import Apply from './components/apply/Apply';
injectTapEventPlugin();

ReactDom.render(
    <Router>
        <div>
            <HeaderBar />
            <SideBar />
            <div style={{marginLeft: "256px"}}>
                <Route exact path="/" component={ Home } />
                <Route path="/intro" component={ Intro } />
                <Route path="/apply" component={ Apply } />
            </div>
        </div>
    </Router>,
    document.getElementById('root')
);