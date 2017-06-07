/**
 * Created by weng on 2017/3/29.
 */
import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

import NewsModel from '../../controllers/NewsInfo';

export default class NewsLetterComponent extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            
                <NewsPaperComponent/>



            
        );
    }


}

 class NewsPaperComponent extends React.Component{
    constructor(props){
        super(props);
        this.style = {
            width: '95%',
            margin: "10 20",
            textAlign: 'center',
            display: 'inline-block',

        };
    }




    render(){
        return(
            <Paper style={this.style} zDepth={2} children={<NewsListComponent/>}/>
        );
    }


}

class NewsListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newsList: [],
        }
    }

    componentDidMount() {
        NewsModel.getPublishedNews(1, 5)
            .then(res => this.setState({newsList: res.data}));
    }
    
    render(){
        return(
            <div style={{textAlign:"left"}}>
                <Subheader style={{color:'red',fontSize:'20px'}}>近期新闻</Subheader>
                <Divider style={{backgroundColor:'red'}} />
                <List>
                    {this.state.newsList.map( (e, idx) => {
                        console.log(e);
                        return (
                            <Link key={idx} to={`/news/${e.id}`} style={{textDecoration:"none"}}><ListItem primaryText={e.title} secondaryText={<span style={{float:"right",fontSize:'8px',marginTop:'0px'}}>{e.time}</span>} /></Link>
                        )
                    })}

                </List>

            </div>
        );
    }
}