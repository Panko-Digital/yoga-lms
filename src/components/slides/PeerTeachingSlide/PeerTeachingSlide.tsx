import styles from "./PeerTeachingSlide.module.css";

const PeerTeachingSlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 6 of 7</div>
        <h1>Peer Teaching Practice</h1>
        <div className={styles.instructorBadge}>Community Learning</div>
      </div>
      <div className={styles.contentSection}>
        <p>Peer Teaching content coming soon...</p>
      </div>
    </div>
  );
};

export default PeerTeachingSlide;
