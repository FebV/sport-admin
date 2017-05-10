import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router }from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/common/Main';
injectTapEventPlugin();

window.printTable = function() {
    localStorage.setItem('printDiv', document.getElementById('printDiv').outerHTML);
    let newWin = window.open('', '_blank', 'fullscreen=yes,directories=no,location=no,menubar=no,resizable=no,status=no,titlebar=no,width=300px');
    newWin.document.body.innerHTML = localStorage.printDiv;
    newWin.print();
    newWin.close();
}

ReactDom.render(
    <Router>
        <Main />
    </Router>,
    document.getElementById('root')
);