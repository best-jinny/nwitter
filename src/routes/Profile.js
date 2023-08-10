import { authService, storageService } from "fbase";
import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

//const Profile = () => <span>profile</span>;

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  let [newPhotoURL, setNewPhotoURL] = useState(userObj.photoURL);

  const onLogOutClick = () => {
    authService.signOut();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setNewPhotoURL(result);
    };

    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.photoURL !== newPhotoURL) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/profileImg/${uuidv4()}`);
      const response = await attachmentRef.putString(newPhotoURL, "data_url");

      newPhotoURL = await response.ref.getDownloadURL();
    }

    if (
      userObj.displayName !== newDisplayName ||
      userObj.photoURL !== newPhotoURL
    ) {
      await userObj.updateProfile({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
