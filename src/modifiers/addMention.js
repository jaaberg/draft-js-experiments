import { Entity, Modifier, EditorState } from 'draft-js';
import getSearchText from '../utils/getSearchText';

const addMention = (editorState, mention) => {
  const entityKey = Entity.create('MENTION', 'SEGMENTED', {name: mention.name, url: mention.url});
  const { begin, end } = getSearchText(editorState);

  const mentionTextSelection = editorState.getSelection().merge({
    anchorOffset: begin,
    focusOffset: end
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    mention.name,
    null,
    entityKey
  );

  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-mention'
  );
  return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};

export default addMention;
