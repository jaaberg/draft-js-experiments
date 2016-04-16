import React from 'react';
import {Entity} from 'draft-js';
import MentionDropdown from './MentionSearchDropdown';
import getSearchText from '../../utils/getSearchText';
import PEOPLE from '../../people';

let Mention = (props) => {
  const { word } = getSearchText(props.editorState);
  const filteredUsers = getMentionsForFilter(word.slice(1));

  return (
    <span style={styles.mention}>
          <span {...props}>{props.children}</span>
          <MentionDropdown
            filteredUsers={filteredUsers}
            editorState={props.editorState}
            updateEditorState={props.updateEditorState}/>
    </span>
  );
};

const getMentionsForFilter = (filter) => {
  return PEOPLE.filter((user) => {
    const { name } = user;
    return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  });
};

const styles = {
  mention: {
    position: 'relative'
  }
};

export default Mention;
