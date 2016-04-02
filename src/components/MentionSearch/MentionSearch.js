import React from 'react';
import {Entity} from 'draft-js';
import MentionDropdown from './MentionSearchDropdown';
import getSearchText from '../../utils/getSearchText';

const USERS = [
  {name: 'Martin Midtsund'},
  {name: 'Osmund Maheswaran'},
  {name: 'Brynjar Rongved'},
  {name: 'Henrik Skifjeld'},
  {name: 'Jørgen Aaberg'},
  {name: 'Marte Gjerdingen'}
];

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
  return USERS.filter((user) => {
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
