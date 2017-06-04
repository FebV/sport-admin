import React from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import GymSelector from '../../common/GymSelector';

export default class Exporter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: '',
            campus: '',
            campus_chinese: '',
            gym: '',
            type: '',
            open: false,
        }
    }

    export() {
        this.props.export({
            start: this.fitDate(this.state.start),
            end: this.fitDate(this.state.end),
            campus: this.state.campus,
        });
        this.setState({open: false});
    }

    fitDate(date) {
        const d = new Date(date);
        return `${this.leftPadding(d.getFullYear())}-${this.leftPadding((d.getMonth()+1))}-${this.leftPadding(d.getDate())}`;
    }

    leftPadding(date) {
        if(1*date < 10)
            date = '0' + date;
        return date;
    }

    render() {
        return (
            <div>
            <FloatingActionButton onClick={() => this.setState({open: true})} style={{position: 'fixed', right: "30px", bottom: "90px"}}>
                <i className="fa fa-cloud-download fa-lg"></i>
            </FloatingActionButton>
            <Dialog
                style={{width: "800px", marginLeft: "calc(50% - 400px)"}}
                title={this.props.title || "导出记录"}
                actions={[
                    <RaisedButton
                        label="取消"
                        onClick={() => this.setState({open: false})}
                    />,
                    <RaisedButton
                        style={{marginLeft: "20px"}}
                        label="确定"
                        onClick={this.export.bind(this)}
                    />
                    ]}
                modal={false}
                open={this.state.open}
                onRequestClose={() => this.setState({open: false})}
                autoScrollBodyContent={true}
            >
            <div style={{width: "100%", textAlign: "center"}}>
            <GymSelector 
                onChange={(g) => {
                        this.setState({campus: g.campus, type: g.type, gym: g.gym, campus_chinese: g.campus_chinese});    
                }} 
                dropType={true}
                dropGym={true}
            />
            </div>
            <div style={{textAlign: 'center'}}>
                <span style={{margin: "0 20px"}}>从：</span>
                <DatePicker
                    style={{display: "inline-block"}}
                    hintText="起始日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({start: v});
                    }}
                /><br />
                <span style={{margin: "0 20px"}}>至：</span>
                <DatePicker
                    style={{display: "inline-block"}}                
                    hintText="截止日期"
                    DateTimeFormat={Intl.DateTimeFormat}
                    locale="zh-CN"
                    cancelLabel="取消"
                    okLabel="确定"
                    onChange={(e, v) => {
                        this.setState({end: v});
                    }}
                />
            </div>
        </Dialog>
        </div>
        )
    }
}