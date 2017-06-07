/**
 * Created by weng on 2017/6/6.
 */


import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


let wid =document.body.clientWidth*0.92+'px';
let hei =(function () {
    // if(document.body.clientWidth>=1100){
    //     return '666px';
    // }else{
        return document.body.clientWidth*0.5+'px';
    // }

})()

export default class  PicCard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            picArr:["../images/zx1.png",
                "../images/zh1.png",
                "../images/hjl5.png",
                "../images/qfs8.png",
                "../images/btq3.png",
                "../images/xls8.png",
                "../images/xls9.png",]
        }
    }


    render(){
        return(
            <div style={{width:`${wid}`,margin:'0 auto'}}>
            <Carousel style={{width:`${wid}`}}>
                {this.state.picArr.map( (item, idx) => {

                        return (
                            <Carousel.Item key={idx}>
                                <Link to={``}>
                                    <img src={item} height={hei} style={{height:`${hei}`,width:`${wid}`}}/>

                                </Link>
                            </Carousel.Item>
                        )

                })}
            </Carousel>
        </div>)
    }

}