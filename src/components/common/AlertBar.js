import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AlertBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: 'test'
        }
        addEventListener('alert', (e) => {
            this.setState({open: true, message: e.msg});
        })
    }
    
    render() {
        return (
            <MuiThemeProvider>
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={3000}
                onRequestClose={() => this.setState({open: false})}
            />
            </MuiThemeProvider>
        )
    }
}