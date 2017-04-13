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
                <div style={{display:"inline-block",width:'100%',height:"400px",position:'relative'}}>
                    <PictureComponent />
                </div>
                <div style={{display:"inline-block",width:'45%'}}>
                    <NewsLetterComponent />
                </div>

                <div style={{display:"inline-block",width:'50%'}}><InforComponent/></div>
            </div>
        )
    }
}