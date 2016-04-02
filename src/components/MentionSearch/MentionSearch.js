import React from 'react';
import {Entity} from 'draft-js';
import MentionDropdown from './MentionSearchDropdown';
import getSearchText from '../../utils/getSearchText';

const USERS = [
  {name: 'Martin Midtsund', url: 'http://iterate.no/people#martin'},
  {name: 'Osmund Maheswaran', url: 'http://iterate.no/people#osmund'},
  {name: 'Brynjar Rongved', url: 'http://iterate.no/people#brynjar'},
  {name: 'Henrik Skifjeld', url: 'http://iterate.no/people#henrik'},
  {name: 'Jørgen Aaberg', url: 'http://iterate.no/people#jorgen'},
  {name: 'Marte Gjerdingen', url: 'http://iterate.no/people#marte'}
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
