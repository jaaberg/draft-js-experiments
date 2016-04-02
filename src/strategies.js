import { Entity } from 'draft-js';

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const EMOJI_REGEX = /:[\w]*/g;

const handleStrategy = (contentBlock, callback) => {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
};

const emojiSearchStrategy = (contentBlock, callback) => {
  findWithRegex(EMOJI_REGEX, contentBlock, callback);
};

const hashtagStrategy = (contentBlock, callback) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const findMentionEntity = (character) => {
  const entityKey = character.getEntity();
  return (entityKey !== null && Entity.get(entityKey).getType() === 'MENTION');
};

const findMentionEntityStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(findMentionEntity, callback);
};

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export default {
  handleStrategy,
  hashtagStrategy,
  findMentionEntityStrategy
};
