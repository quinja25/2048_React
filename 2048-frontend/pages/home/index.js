import Link from 'next/link';
import React from 'react';
import styles from './home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2048 </h1>
      <Link href="/game" className={styles.playButton}>
        Play 2048!
      </Link>
    </div>
  );
}