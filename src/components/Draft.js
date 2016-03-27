import React, { Component } from 'react';
import {Entity, CompositeDecorator, Editor, EditorState, RichUtils} from 'draft-js';
import strategies from '../strategies';
import MentionDropdown from './MentionDropdown';

const USER_ENTITIES = [
  Entity.create('MENTION', 'SEGMENTED', {name: 'Martin Midtsund'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Osmund Maheswaran'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Brynjar Rongved'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Henrik Skifjeld'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Jørgen Aaberg'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Marte Gjerdingen'})
];

class Draft extends Component {
  constructor(props) {
    super(props);

    const MentionSpan = (props) => {
      const typedText = props.children[0].props.text.substr(1);
      const filteredEntityIds = this.getMentionsForFilter(typedText);

      return (
        <span>
          <span { ...props }>{ props.children }</span>
          <MentionDropdown { ...props }
            userEntityIds={ filteredEntityIds }
            editorState={ this.state.editorState }
            updateEditorState={ this.onChange }/>
        </span>
      );
    };

    const compositeDecorator = new CompositeDecorator([
      {
        strategy: strategies.handleStrategy,
        component: MentionSpan
      }
    ]);

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
  }

  getMentionsForFilter = (filter) => {
    return USER_ENTITIES.filter((entity) => {
      const { name } = Entity.get(entity).getData();
      return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  };

  onChange = (editorState) => {
    this.setState({editorState});
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
  mention: {
    backgroundColor: 'red'
  }
};

export default Draft;
