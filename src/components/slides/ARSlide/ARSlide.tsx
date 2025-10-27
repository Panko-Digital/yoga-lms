import styles from "./ARSlide.module.css";

const ARSlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 4 of 7</div>
        <h1>AR Alignment Practice</h1>
        <div className={styles.instructorBadge}>Augmented Reality Tool</div>
      </div>
      <div className={styles.contentSection}>
        <p>AR Alignment content coming soon...</p>
      </div>
    </div>
  );
};

export default ARSlide;
