import React from 'react';
import {Entity, CompositeDecorator, Editor, EditorState, RichUtils} from 'draft-js';
import strategies from './strategies';
import MentionDropdown from './MentionDropdown';

const USER_ENTITIES = [
  Entity.create('MENTION', 'MUTABLE', {name: 'martin', title: 'Mr.'}),
  Entity.create('MENTION', 'MUTABLE', {name: 'osmund', title: 'Mr.'}),
  Entity.create('MENTION', 'MUTABLE', {name: 'brynjar', title: 'Mr.'}),
  Entity.create('MENTION', 'MUTABLE', {name: 'henrik', title: 'Mr.'}),
  Entity.create('MENTION', 'MUTABLE', {name: 'jørgen', title: 'Mr.'}),
  Entity.create('MENTION', 'MUTABLE', {name: 'marte', title: 'Ms.'})
];

var Enhance = (ComposedComponent) => class extends React.Component {
  render() {
    var typedText = this.props.children[0].props.text.substr(1);
    var filteredEntityIds = USER_ENTITIES.filter((entity) => Entity.get(entity).getData().name.startsWith(typedText));

    return (
      <span>
        <ComposedComponent {...this.props} />
        <MentionDropdown userEntityIds={filteredEntityIds} />
      </span>
    );
  }
};

const HandleSpan = (props) => {
  return <span {...props}>{props.children}</span>;
};

import getSearchText from './getSearchText.js';
const compositeDecorator = new CompositeDecorator([
  {
    strategy: strategies.handleStrategy,
    component: Enhance(HandleSpan)
  }
]);

class Draft extends React.Component {
  state = {
    editorState: EditorState.createEmpty(compositeDecorator)
  };

  onChange = (editorState) => {
    this.setState({editorState});
  };

  render() {
    const {editorState} = this.state;

    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <h1 >Draft.js editor</h1>
        </div>
        <div style={{margin: '50px auto 100px auto', width: '400px'}}>
          <div>
            <Editor editorState={editorState}
                    onChange={this.onChange}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Draft;
