import React, { Component } from 'react';
import {Entity} from 'draft-js';

class Dropdown extends Component {
  render() {
    var users = this.props.userEntityIds.map((userEntityId) => Entity.get(userEntityId).getData());
    var userList = (
      <ul>
        {users.map((user) => <li style={{cursor: 'none'}}>{user.title} {user.name}</li>)}
      </ul>
    );

    return (
      <div contenteditable={false} style={{position: 'absolute', backgroundColor: "green", border: '1px solid black'}}>
        {userList}
      </div>
    );
  }
}

export default Dropdown;
