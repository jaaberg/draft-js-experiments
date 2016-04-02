import React, { Component } from 'react';

const Mention = (props) => {
  return (
    <span {...props} style={styles.root}>{props.children}</span>
  );
};

const styles = {
  root: {
    backgroundColor: '#def0f7'
  }
};

export default Mention;
