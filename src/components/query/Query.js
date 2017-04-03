import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Query extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
                <span>从</span>
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="起始日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                />
                <span>至</span>                
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                />
            </div>
            </MuiThemeProvider>
        )
    }
}