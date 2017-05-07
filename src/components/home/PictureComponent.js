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


        this.picList=[
            "../images/zx1.png",
            "../images/zh1.png",
            "../images/hjl5.png",
            "../images/qfs8.png",
            "../images/btq3.png",
            "../images/xls8.png",
            "../images/xls9.png",
        ]
        this.classList=[['style1'],['style2'],['style3'],['style4_1','style4_2','style4_3']];
        this.aniList =["goLeftVanish","goSmallLeft","goBigLeft","goShow"];
        this.aniRightList =["goBigRight","goSmallRight","goRightVanish","goRightShow"];
        window.picInterval=setInterval(()=>this.handleNext(),3000);
    }
    handleNext(){
        if(this.state.isChange){

        }else{
            clearInterval(picInterval);
            let sec = this.refs.sec;
            sec.className=`${this.classList[1].length==3?this.classList[1][1]:this.classList[1][0]} ${this.aniList[1]} `;
            let third = this.refs.third;
            third.className=`${this.classList[2].length==3?this.classList[2][1]:this.classList[2][0]} ${this.aniList[2]} `;
            let first = this.refs.first;
            first.className=`${this.classList[0].length==3?this.classList[0][1]:this.classList[0][0]} ${this.aniList[0]} `;
            this.setState({

                isChange:!this.state.isChange,
                zIndex1:10000,
            });
            let forth = this.refs.forth;
            forth.className=`${this.aniList[3]} ${this.classList[3].length==3?this.classList[3][1]:this.classList[3][0]}`;
            setTimeout(
                ()=>{


                     let lastList = this.classList;
                     this.classList =[lastList[3],lastList[0],lastList[1],lastList[2]];


                    sec.className = this.classList[1][0];
                    first.className = this.classList[0][0];
                    third.className = this.classList[2][0];
                    forth.className = this.classList[3][0];
                    let lastAniList = this.aniList;
                    this.aniList =[lastAniList[3],lastAniList[0],lastAniList[1],lastAniList[2]];
                    let lastAniList1 = this.aniRightList;
                    this.aniRightList =[lastAniList1[3],lastAniList1[0],lastAniList1[1],lastAniList1[2]];

                    this.setState({


                    isChange:!this.state.isChange,

                });
                }
                ,300);

            picInterval=setInterval(()=>this.handleNext(),3000);


        }



    }
    handlePre(){
        if(this.state.isChange){

        }else {

            clearInterval(picInterval);
            let sec = ReactDOM.findDOMNode(this.refs.sec);
            sec.className=`${this.classList[1].length==3?this.classList[1][2]:this.classList[1][0]} ${this.aniRightList[1]} `;
            let third = ReactDOM.findDOMNode(this.refs.third);
            third.className=`${this.classList[2].length==3?this.classList[2][2]:this.classList[2][0]} ${this.aniRightList[2]} `;
            let first = ReactDOM.findDOMNode(this.refs.first);
            first.className=`${this.classList[0].length==3?this.classList[0][2]:this.classList[0][0]} ${this.aniRightList[0]} `;
            this.setState({

                isChange: !this.state.isChange
            });
            let forth = ReactDOM.findDOMNode(this.refs.forth);
            forth.className=`${this.aniRightList[3]} ${this.classList[3].length==3?this.classList[3][2]:this.classList[3][0]}`;
            setTimeout(
                ()=> {


                    let lastList = this.classList;
                    this.classList =[lastList[1],lastList[2],lastList[3],lastList[0]];
                    sec.className = this.classList[1][0];
                    first.className = this.classList[0][0];
                    third.className = this.classList[2][0];
                    forth.className = this.classList[3][0];
                    let lastAniList = this.aniRightList;
                    this.aniRightList =[lastAniList[1],lastAniList[2],lastAniList[3],lastAniList[0]];
                    let lastAniList1 = this.aniList;
                    this.aniList =[lastAniList1[1],lastAniList1[2],lastAniList1[3],lastAniList1[0]];
                    this.setState({


                        isChange: !this.state.isChange,


                    });

                }
                , 300);

            picInterval=setInterval(()=>this.handleNext(),3000);
        }


    }

    componentWillUnmount(){
        clearInterval(picInterval);
    }





    render(){
        return(

                <div style={{display:"block",margin:"0 auto",width:"90%",height:"400px",position:"relative",maxWidth:1000,minWidth:1000,overflow:"hidden"}}>


                        <img src={this.picList[0]}  className="style1" ref="first" onClick={()=>this.handlePre()}/>
                        <img src={this.picList[1]} className="style2" ref="sec"/>
                        <img src={this.picList[2]} className="style3" ref="third" onClick={()=>this.handleNext()}/>
                        <img src={this.picList[3]} className="style4_1" ref="forth"/>


                </div>

        );
    }



}


