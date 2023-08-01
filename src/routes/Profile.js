import { authService } from "fbase";
import React from "react";

//const Profile = () => <span>profile</span>;
//export default Profile;

export default () => {
  const onLogOutClick = () => authService.signOut();

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
