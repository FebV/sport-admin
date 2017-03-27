import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class headBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
            <AppBar
                style={{zIndex: 1500}}
                title="山东大学体育场馆管理平台"
                iconElementLeft={this.props.leftIcon ? null : <i></i>}
                onLeftIconButtonTouchTap={this.props.handleDrawer}
            />
            </MuiThemeProvider>
        );
    }
}