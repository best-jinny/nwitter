import { dbService } from "fbase";
import React from "react";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value }, // event 안에 있는 target 안에 있는 value 를 달라..
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
