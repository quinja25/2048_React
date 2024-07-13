import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>2048 Game</h1>
      <Link href="/game" legacyBehavior>
        <a>Play Game</a>
      </Link>
    </div>
  );
};

export default Home;