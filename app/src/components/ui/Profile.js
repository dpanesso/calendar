// @flow
import React from 'react';
import '../../styles/profile.css';
import profilePicPlaceholder from '../../images/silhouette.jpg';

type Props = {
  openModal: Function,
  user: Object,
}


const Profile = (props: Props) => {
  const { openModal, user } = props;
  return user.username ? (
    <div className="profile">
      <img src={profilePicPlaceholder} alt="profile-pic" />
      <p id="username" className="navbarLink">{user.username}</p>
    </div>) :
    <p id="loginButton" onClick={openModal}>Login</p>;
};

export default Profile;
