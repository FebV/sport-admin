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

            width: '95%',
            margin: "10 20",

            display: 'inline-block',

        };
    }
    render(){
        return(
          
              <Paper style={this.style} zDepth={2} children={<InforListComponent/>}/>
          
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
                <Subheader style={{color:'red',fontSize:'20px'}}>通知</Subheader>
                <Divider style={{backgroundColor:'red'}}/>
                <List>
                    {this.state.noticeList.map( (e, idx) => {
                        console.log(e);
                        return (
                            <Link key={idx} to={`/notice/${e.id}`} style={{textDecoration:"none"}}><ListItem primaryText={e.title} secondaryText={<span style={{float:"right",fontSize:'8px',marginTop:'0px'}}>{e.time}</span>} /></Link>
                        )
                    })}



                </List>

            </div>
        );
    }
}