import React from 'react'

const UsersInfo = ({ users }) => {
  return (
    <div>
      <p className="onUsers"><span>Name:&nbsp;{users.name}</span>
      &nbsp;
          <i className="fas fa-globe icon_globe"></i>
      </p>
    </div>
  );
}

export default UsersInfo
