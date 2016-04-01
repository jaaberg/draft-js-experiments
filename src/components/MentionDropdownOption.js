import React, { Component } from 'react';

class MentionOption extends Component {

  constructor(props) {
    super(props);
    this.mouseDown = false;
  }

  componentDidUpdate() {
    this.mouseDown = false;
  }

  onMouseUp = () => {
    if (this.mouseDown) {
      this.mouseDown = false;
      this.props.onMentionSelect(this.props.mention);
    }
  };

  onMouseDown = (event) => {
    event.preventDefault();

    this.mouseDown = true;
  };

  onMouseEnter = () => {
    this.props.onMentionFocus(this.props.index);
  };

  render() {
    const style = this.props.isFocused ? styles.selected : styles.notSelected;
    const { name } = this.props.mention;

    return (
      <div
        onMouseDown={ this.onMouseDown }
        onMouseUp={ this.onMouseUp }
        onMouseEnter={ this.onMouseEnter }
        role="option"
        style={ style }
        >
        <span>{ name }</span>
      </div>
    );
  }
}

const styles = {
  notSelected: {
    padding: '5px'
  },
  selected: {
    padding: '5px',
    backgroundColor: '#def0f7'
  }
};

export default MentionOption;
