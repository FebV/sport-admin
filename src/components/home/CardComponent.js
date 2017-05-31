/**
 * Created by weng on 2017/3/27.
 */

import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let img=["../images/cardbg1.png","../images/cardbg.png"];
let currentIndex=0;

export default class CardComponent extends React.Component {
    constructor(props){
        super(props);

        // this.state={
        //     imgSrc:"../images/cardbg1.png",
        // };
        this.initArr = [
                {
                    posX: 0,
                    src: "../images/cardbg1.png"
                },
                {
                    posX: 100,
                    src: "../images/cardbg2.jpg"
                },{
                    posX: 200,
                    src: "../images/cardbg1.png"
                },{
                posX: 300,
                src: "../images/cardbg2.jpg"
            }
            ];

        this.state = {
            picsArr: [
                {
                    posX: 0,
                    src: "../images/cardbg1.png"
                },
                {
                    posX: 100,
                    src: "../images/cardbg2.jpg"
                },{
                    posX: 200,
                    src: "../images/cardbg1.png"
                },{
                    posX: 300,
                    src: "../images/cardbg2.jpg"
                }
            ],
            delay: 1

        };
        setInterval (() => {
            let newArr = null;
            let delay = 1;
            if(this.state.picsArr[this.state.picsArr.length-1].posX == 0) {
                newArr = this.initArr;
                delay: 0;
                this.setState({delay: 0});
            }
            else {
                newArr = this.state.picsArr.map(e => {
                    return {posX: e.posX - 100, src: e.src};
                });
                this.setState({delay: 1});
            }
            this.setState({picsArr: newArr});
        }, 2000);



    }



    render(){
        // var timeOut =setTimeout(()=>this.handleAddClick(),3000);
        // timeOut();

        return(
            
            <Card
                style={{overflow: "hidden", width: "100%"}}
            >
                {/*<CardHeader*/}
                    {/*title="URL Avatar"*/}
                    {/*subtitle="Subtitle"*/}
                    {/*avatar="../images/cardbg1.png"*/}
                {/*/>*/}
                <div style={{height: "300px",overflow: "hidden"}}>
                {this.state.picsArr.map( (e, idx) => {
                    const y = idx * 100;
                        const vis = e.posX == 0 ? {display: "none"} : null;
                        return (
                            <CardMedia
                                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle"/>}
                                style={{
                                    transition: `all ${this.state.delay}s`,
                                    position: "relative",
                                    transform: `translateX(${e.posX}%) translateY(-${y}%)`,
                                    width:"700px",
                                }}
                                key={idx}
                            >
                                <img src={e.src} height="300px" />

                            </CardMedia>
                        )
                    }
                )}
                </div>

            </Card>
            
        );
    }
}

class Pic extends  React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     posX: 0,
        //     src: `../images/cardbg1.png`
        // }
    }

    render() {
        return null
    }

}