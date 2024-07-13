'use client';

import Link from 'next/link';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2048 Game</h1>
      <Link href="/game" passHref>
        <a className={styles.playButton}>Play Game</a>
      </Link>
    </div>
  );
}