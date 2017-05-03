/**
 * Created by weng on 2017/4/5.
 */


import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import NoticeModel from '../../controllers/Notice';
import { Link } from 'react-router-dom';

export default class InforComponent extends React.Component{
    constructor(props){
        super(props);
        this.style = {

            width: '100%',
            margin: "10 20",

            display: 'inline-block',

        };
    }
    render(){
        return(
          <MuiThemeProvider>
              <Paper style={this.style} zDepth={2} children={<InforListComponent/>}/>
          </MuiThemeProvider>
        );
    }



}

class InforListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            noticeList: [],
        }
    }
    componentDidMount() {
        NoticeModel.getPublishedNotice(1, 5)
            .then(res => this.setState({noticeList: res.data}));
    }
    render(){
        return(
            <div  style={{textAlign:"left"}}>
                <Subheader>通知</Subheader>
                <Divider />
                <List>
                    {this.state.noticeList.map( (e, idx) => {
                        console.log(e);
                        return (
                            <Link key={idx} to={`/notice/${e.id}`} style={{textDecoration:"none"}}><ListItem primaryText={e.title} secondaryText={<p style={{float:"right"}}>{e.time}</p>} /></Link>
                        )
                    })}



                </List>

            </div>
        );
    }
}