import React from 'react';
import styles from './WinnerAnnouncement.module.css';

const WinnerAnnouncement = ({ winner, timer, onClose }) => {
  if (!winner) return null; // Only render if there's a winner

  return (
    <div className={styles.overlay}>
      <div className={styles.announcement}>
        <h4>Time Taken: {timer}s</h4>
        <h1 className={styles.winnerText}>
          {winner} 
        </h1>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerAnnouncement;
