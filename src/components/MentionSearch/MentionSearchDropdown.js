import React, { Component } from 'react';
import { Entity } from 'draft-js';
import MentionDropdownOption from './MentionSearchDropdownOption';
import addMention from '../../modifiers/addMention';

class MentionDropdown extends Component {
  state = {
    focusedOptionIndex: 0,
    isOpen: true
  };

  onMentionSelect = (mention) => {
    const newEditorState = addMention(this.props.editorState, mention);
    this.props.updateEditorState(newEditorState);
  };

  onMentionFocus = (index) => {
    this.setState({
      focusedOptionIndex: index
    });
  };

  render() {
    return (
      <div contentEditable={false} style={styles.dropDown}>
        {this.props.filteredUsers.map((user, index) => {
          return (
            <MentionDropdownOption
              key={user.name}
              onMentionSelect={this.onMentionSelect}
              onMentionFocus={this.onMentionFocus}
              user={user}
              isFocused={this.state.focusedOptionIndex === index}
              index={index}
              />);
        })}
      </div>
    );
  }
}

const styles = {
  root: {
    position: 'relative'
  },
  dropDown: {
    border: '1px solid grey',
    display: 'inline-block',
    position: 'absolute',
    minWidth: '180px',
    borderRadius: '4px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 30px 0px rgba(220,220,220,1)',
    top: '25px',
    left: '0'
  }
};

export default MentionDropdown;
