import { Entity, Modifier, EditorState } from 'draft-js';
import getSearchText from '../utils/getSearchText';

const addEmoji = (editorState, emojiShortName) => {
  const { begin, end } = getSearchText(editorState);

  const emojiTextSelection = editorState.getSelection().merge({
    anchorOffset: begin,
    focusOffset: end
  });

  const unicode = emojioneList[emojiShortName][0];
  const emoji = convertShortNameToUnicode(unicode);
  let emojiReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    emojiTextSelection,
    emoji
  );

  const blockKey = emojiTextSelection.getAnchorKey();
  const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (blockSize === end) {
    emojiReplacedContent = Modifier.insertText(
      emojiReplacedContent,
      emojiReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    emojiReplacedContent,
    'insert-emoji'
  );
  return EditorState.forceSelection(newEditorState, emojiReplacedContent.getSelectionAfter());
};

export default addEmoji;
