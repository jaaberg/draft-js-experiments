import React, { Component } from 'react';
import {Entity} from 'draft-js';
import MentionDropdownOption from './MentionDropdownOption.js';

class Dropdown extends Component {
  state = {
    focusedOptionIndex: 0,
    isOpen: true
  };

  onMentionSelect = (mention) => {
    //const selection = this.props.getEditorState().getSelection();
    //const newEditorState = addMention(this.props.getEditorState(), mention, selection);
    //this.props.updateEditorState(newEditorState);
    console.log('Mention ' + mention + ' selected!');
  };

  onMentionFocus = (index) => {
    this.setState({
      focusedOptionIndex: index
    });
  };

  render() {
    var mentions = this.props.userEntityIds.map((userEntityId) => Entity.get(userEntityId).getData());

    return (
      <div contenteditable={false} style={{position: 'absolute', backgroundColor: "white", border: '1px solid black'}}>
        {mentions.map((mention, index) => {
          return (
            <MentionDropdownOption
              onMentionSelect={ this.onMentionSelect }
              onMentionFocus={ this.onMentionFocus }
              mention={ mention }
              isFocused={ this.state.focusedOptionIndex === index }
              index={ index }
              />);
        })}
      </div>
    );
  }
}

export default Dropdown;
