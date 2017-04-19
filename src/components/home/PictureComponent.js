/**
 * Created by weng on 2017/4/9.
 */
/**
 * Created by weng on 2017/4/5.
 */


import React from 'react';
import ReactDOM from 'react-dom';




export default class PictureComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isChange:false,
            zIndex1:1
        };
        this.style2 = {

            width: '500px',
            height:'300px',
            margin:10,

            display: 'inline-block',
            bottom:"0",
            left:"250px",
            zIndex:1000,
            boxShadow:"5px 5px 5px grey",
            position:"absolute",

        };
        this.style1 = {

            width: '300px',
            height:'180px',
            margin:10,

            bottom:"50px",
            left:"0",
            display: 'inline-block',
            zIndex:this.state.zIndex1,
            boxShadow:"5px 5px 5px grey",
            position:"absolute"

        };this.style3 = {

            width: '300px',
            height:'180px',
            margin:10,
            bottom:"50px",
            left:"700px",
            display: 'inline-block',
            zIndex:this.state.zIndex1,
            boxShadow:"5px 5px 5px grey",
            position:"absolute"

        };
        this.state.style4 = {

            width: '300px',
            height:'180px',
            margin:10,

            bottom:"50px",
            left:"1000px",
            display: 'none',

            boxShadow:"5px 5px 5px grey",
            position:"absolute"

                };

        this.state.picList=[
            "../images/cardbg1.png",
            "../images/cardbg2.jpg",
            "../images/cardbg1.png",
            "../images/cardbg2.jpg"
        ]


    }
    handleNext(){
        if(this.state.isChange){

        }else{

            let sec = this.refs.sec;
            sec.className="goSmallLeft";
            let third = this.refs.third;
            third.className="goBigLeft";
            let first = this.refs.first;
            first.className="goLeftVanish";
            this.setState({
                style4:{

                    width: '300px',
                    height:'180px',
                    margin:10,

                    bottom:"50px",
                    left:"1000px",
                    display: "inline-block",

                    boxShadow:"5px 5px 5px grey",
                    position:"absolute"

                },
                isChange:!this.state.isChange,
                zIndex1:10000,
            });
            let forth = this.refs.forth;
            forth.className="goShow";
            setTimeout(
                ()=>{
                    let lastList = this.state.picList;
                    this.setState({
                        picList:[lastList[1],lastList[2],lastList[3],lastList[0]],
                        style4:{

                            width: '300px',
                            height:'180px',
                            margin:10,

                            bottom:"50px",
                            left:"1000px",
                            display: "none",

                            boxShadow:"5px 5px 5px grey",
                            position:"absolute"

                        },
                        isChange:!this.state.isChange,

                    });
                    sec.className="";
                    first.className="";
                    third.className="";
                    forth.className="";
                }
                ,300);



        }



    }
    handlePre(){
        if(this.state.isChange){

        }else {


            let sec = ReactDOM.findDOMNode(this.refs.sec);
            sec.className = "goSmallRight";
            let third = ReactDOM.findDOMNode(this.refs.third);
            third.className = "goRightVanish";
            let first = ReactDOM.findDOMNode(this.refs.first);
            first.className = "goBigRight";
            this.setState({
                style4: {

                    width: '300px',
                    height: '180px',
                    margin: 10,

                    bottom: "50px",
                    left: "-180px",
                    display: "inline-block",

                    boxShadow: "5px 5px 5px grey",
                    position: "absolute"

                },
                isChange: !this.state.isChange
            });
            let forth = ReactDOM.findDOMNode(this.refs.forth);
            forth.className = "goRightShow";
            setTimeout(
                ()=> {
                    let lastList = this.state.picList;
                    this.setState({
                        picList: [lastList[3], lastList[0], lastList[1], lastList[2]],
                        style4: {

                            width: '300px',
                            height: '180px',
                            margin: 10,

                            bottom: "50px",
                            left: "1000px",
                            display: "none",

                            boxShadow: "5px 5px 5px grey",
                            position: "absolute"

                        },
                        isChange: !this.state.isChange,


                    });
                    sec.className = "";
                    first.className = "";
                    third.className = "";
                    forth.className = "";
                }
                , 300);
        }
        setInterval(()=>this.handleNext(),3000);

    }





    render(){
        return(

                <div style={{display:"block",margin:"0 auto",width:"100%",height:"500px",position:"relative",}}>


                        <img src={this.state.picList[0]} style={this.style1} ref="first" onClick={()=>this.handlePre()}/>
                        <img src={this.state.picList[1]} style={this.style2} ref="sec"/>
                        <img src={this.state.picList[2]} style={this.style3} ref="third" onClick={()=>this.handleNext()}/>
                        <img src={this.state.picList[3]} style={this.state.style4} ref="forth"/>


                </div>

        );
    }



}


