import React, { Component } from 'react';
import {CompositeDecorator, Editor, EditorState, RichUtils, convertToRaw} from 'draft-js';
import strategies from '../strategies';
import MentionSearch from './MentionSearch/MentionSearch';
import Hashtag from './Hashtag';
import Mention from './Mention';
import stateToMarkdown from '../utils/stateToMarkdown';

class Draft extends Component {
  constructor(props) {
    super(props);

    const MentionSearchComponent = (props) => (
      <MentionSearch {...props} editorState={this.state.editorState} updateEditorState={this.onChange}/>
    );

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: strategies.handleStrategy,
        component: MentionSearchComponent
      }, {
        strategy: strategies.findMentionEntityStrategy,
        component: Mention
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
    console.log(this.state.editorState.toJS());
  };

  logMarkdown = () => {
    console.log(stateToMarkdown(this.state.editorState.getCurrentContent()));
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
            <button onClick={this.logMarkdown}>Log markdown</button>
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
