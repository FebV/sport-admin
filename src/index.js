import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router }from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/common/Main';
injectTapEventPlugin();


ReactDom.render(
    <Router>
        <Main />
    </Router>,
    document.getElementById('root')
);