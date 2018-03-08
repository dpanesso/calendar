// @flow
import React from 'react';
import '../../styles/home.css';


type Props = {
  loggedIn: boolean,
};

const Home = (props: Props) => {
  const { loggedIn } = props;
  return (
    loggedIn === true ? (
      <div id="home">
        <h1>Welcome to the meeting calendar</h1>
      </div>
    ) : (
      <div id="home">
        <h1>Welcome to the meeting calendar</h1>
        <h1>Please Log In!</h1>
      </div>
    )
  );
};

export default Home;
