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
            <MuiThemeProvider>
                <NewsPaperComponent/>



            </MuiThemeProvider>
        );
    }


}

 class NewsPaperComponent extends React.Component{
    constructor(props){
        super(props);
        this.style = {
            width: '90%',
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
                <Subheader>近期新闻</Subheader>
                <Divider />
                <List>
                    {this.state.newsList.map( (e, idx) => {
                        console.log(e);
                        return (
                            <Link key={idx} to={`/news/${e.id}`}><ListItem primaryText={e.title} secondaryText={e.time} /></Link>
                        )
                    })}

                </List>

            </div>
        );
    }
}