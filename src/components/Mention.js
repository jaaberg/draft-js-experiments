import React from 'react';
import {Entity} from 'draft-js';
import MentionDropdown from './MentionDropdown';
import getSearchText from '../utils/getSearchText';

const USER_ENTITIES = [
  Entity.create('MENTION', 'SEGMENTED', {name: 'Martin Midtsund'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Osmund Maheswaran'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Brynjar Rongved'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Henrik Skifjeld'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Jørgen Aaberg'}),
  Entity.create('MENTION', 'SEGMENTED', {name: 'Marte Gjerdingen'})
];

let Mention = (props) => {
  const { word } = getSearchText(props.editorState);
  const filteredEntityIds = getMentionsForFilter(word.slice(1));

  return (
    <span style={styles.mention}>
          <span {...props}>{props.children}</span>
          <MentionDropdown
            userEntityIds={filteredEntityIds}
            editorState={props.editorState}
            updateEditorState={props.updateEditorState}/>
        </span>
  );
};

const getMentionsForFilter = (filter) => {
  return USER_ENTITIES.filter((entity) => {
    const { name } = Entity.get(entity).getData();
    return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  });
};

const styles = {
  mention: {
    position: 'relative'
  }
};

export default Mention;
