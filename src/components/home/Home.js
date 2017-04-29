import React from 'react';
import CardComponent from './CardComponent';
import NewsLetterComponent from './NewsLetterComponent';
import InforComponent from './InforComponent'
import PictureComponent from './PictureComponent';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{display:"inline-block",width:'100%',height:"400px",position:'relative',overflow:'hidden',minWidth:'1000px'}}>

                        <PictureComponent />

                </div>
                <div style={{minWidth:'1000px',marginTop:20}}>
                    <div style={{display:"inline-block",width:'45%',minWidth:'400px'}}>
                        <NewsLetterComponent />
                    </div>

                    <div style={{display:"inline-block",width:'50%',minWidth:'400px'}}><InforComponent/></div>
                </div>
            </div>
        )
    }
}