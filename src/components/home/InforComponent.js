/**
 * Created by weng on 2017/4/5.
 */


import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

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

    }
    render(){
        return(
            <div  style={{textAlign:"left"}}>
                <Subheader>Selectable Contacts</Subheader>
                <Divider />
                <List>
                    <ListItem primaryText="News" secondaryText="hhhh"/>
                    <ListItem primaryText="News" secondaryText="hhhh"/>
                    <ListItem primaryText="News" secondaryText="hhhh"/>
                    <ListItem primaryText="News"/>
                    <ListItem primaryText="News"/>


                </List>

            </div>
        );
    }
}