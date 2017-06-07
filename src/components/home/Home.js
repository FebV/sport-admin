import React from 'react';
import CardComponent from './CardComponent';
import NewsLetterComponent from './NewsLetterComponent';
import InforComponent from './InforComponent'
import PicCard from './PicCard';
import PictureComponent from './PictureComponent';
let hei =function () {
    // if(document.body.clientWidth>=1100){
    //     return '666px';
    // }else{
        return document.body.clientWidth*0.5+'px';
    // }

}
export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{display:"inline-block",width:'100%',height:`${hei}`,position:'relative',overflow:'hidden',minWidth:'1000px'}}>

                        <PicCard  />

                </div>
                <div style={{minWidth:'1000px',marginTop:20,display:"flex",flexDirection:"row"}}>
                    <div style={{display:"inline-block",width:'45%',minWidth:'400px'}}>
                        <NewsLetterComponent />
                    </div>

                    <div style={{display:"inline-block",width:'50%',minWidth:'400px',marginTop:0}}><InforComponent/></div>
                </div>
            </div>
        )
    }
}