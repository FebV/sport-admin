import React from 'react';

import {Editor, EditorState} from 'draft-js';

export default class Announce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    render() {
        return (
            <div>
                asd
                <Editor editorState={this.state.editorState} onChange={(s) => this.setState({editorState: s})} />
            </div>
        )
    }
}