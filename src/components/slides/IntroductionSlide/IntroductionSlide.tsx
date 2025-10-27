import FeatureCard from "../../shared/FeatureCard/FeatureCard";
import styles from "./IntroductionSlide.module.css";

const IntroductionSlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 1 of 7</div>
        <h1>Mastering the Warrior Sequence</h1>
        <div className={styles.instructorBadge}>Taught by Shiva Rea</div>
      </div>

      <div className={styles.contentSection}>
        <p className={styles.introText}>
          Welcome to this comprehensive module on teaching Warrior poses. You'll
          learn proper alignment, cueing techniques, and how to guide students
          safely through this foundational sequence.
        </p>

        <FeatureCard title="What You'll Master" icon="">
          <p>
            Verbal cueing for all three Warrior variations, common misalignments
            and corrections, breath integration techniques, and modifications
            for different body types.
          </p>
        </FeatureCard>

        <FeatureCard title="Time Commitment" icon="">
          <p>
            45 minutes of video content, 3 audio practice cues, 1 AR alignment
            demonstration, plus peer teaching practice.
          </p>
        </FeatureCard>

        <div className={styles.achievementCard}>
          <div className={styles.achievementIcon}></div>
          <h3>Your Current Streak</h3>
          <div className={styles.streakCounter}>
            <div className={`${styles.streakDay} ${styles.completed}`}>M</div>
            <div className={`${styles.streakDay} ${styles.completed}`}>T</div>
            <div className={`${styles.streakDay} ${styles.completed}`}>W</div>
            <div className={styles.streakDay}>T</div>
            <div className={styles.streakDay}>F</div>
            <div className={styles.streakDay}>S</div>
            <div className={styles.streakDay}>S</div>
          </div>
          <p>
            3 days straight! Keep going to unlock your first badge from Shiva
            Rea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSlide;
