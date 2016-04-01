import React, { Component } from 'react';
import {CompositeDecorator, Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import strategies from '../strategies';
import Hashtag from './Hashtag';
import Mention from './Mention';

class Draft extends Component {
  constructor(props) {
    super(props);

    const MentionComponent = (props) => (
      <Mention {...props} editorState={this.state.editorState} updateEditorState={this.onChange}/>
    );

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: strategies.handleStrategy,
        component: MentionComponent
      }, {
        strategy: strategies.hashtagStrategy,
        component: Hashtag
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
  }

  onChange = (editorState) => {
    this.setState({editorState});
  };

  logStateToConsole = () => {
    console.log(this.state.editorState.getCurrentContent().toJS());
  };

  logRawStateToConsole = () => {
    console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <div style={styles.header}>
          <h1>Draft.js editor</h1>
        </div>
        <div style={styles.editor}>
          <div>
            <Editor editorState={ editorState }
                    onChange={ this.onChange }/>
          </div>
          <div style={styles.logButtonRow}>
            <button onClick={this.logStateToConsole}>Log state to console</button>
            <button onClick={this.logRawStateToConsole}>Log RAW state to console</button>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    textAlign: 'center'
  },
  editor: {
    margin: '50px auto 100px auto',
    width: '400px'
  },
  logButtonRow: {
    marginTop: '20px'
  }
};

export default Draft;
