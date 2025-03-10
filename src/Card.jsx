import React from 'react';
import styles from './Card.module.css';
import questionMark from './assets/questionMark.png';

function Card({ fruit, onCardClick } ) {

  function handleClick() {
    onCardClick(fruit);
  }

  return (
    <div
      className={`${styles.card} my-2 ${fruit.isFliped ? styles.fliped : ''}`}
      onClick={handleClick}
    >
      <div className={styles.cardInner}>
        {/* card front  */}
        <div className={styles.cardFront}>
          <img src={questionMark} alt="Card front image" />
        </div>
        {/* card back  */}
        <div className={styles.cardBack}>
          <img
            src={`${import.meta.env.BASE_URL}assets/fruits/${fruit.fruitName}.png`} // dynamically importing images
            alt={`${fruit.fruitName}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
