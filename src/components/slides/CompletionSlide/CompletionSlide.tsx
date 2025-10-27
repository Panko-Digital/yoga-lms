import DemoButton from "../../shared/DemoButton/DemoButton";
import FeatureCard from "../../shared/FeatureCard/FeatureCard";
import styles from "./CompletionSlide.module.css";

const CompletionSlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 7 of 7</div>
        <h1>Module Complete!</h1>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.completionCelebration}>
          <div className={styles.confetti}></div>
          <h2>Congratulations!</h2>
          <p>
            You've completed "Mastering the Warrior Sequence" and earned 2.5
            teaching hours toward your RYT-500 certification.
          </p>
        </div>

        <div className={styles.achievementCard}>
          <div className={styles.achievementIcon}></div>
          <h3>Badge Unlocked!</h3>
          <h2>Warrior Sequence Specialist</h2>
          <p>Endorsed by Shiva Rea</p>
          <DemoButton className={styles.shareButton}>
            Share on LinkedIn
          </DemoButton>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>95%</div>
            <div className={styles.statLabel}>Quiz Score</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4.8/5</div>
            <div className={styles.statLabel}>Peer Rating</div>
          </div>
        </div>

        <FeatureCard title="Your Learning Data (xAPI Tracked)" icon="">
          <ul className={styles.learningData}>
            <li>Watched 45 minutes of video content</li>
            <li>Downloaded 3 audio practice files</li>
            <li>Completed 2 AR alignment assessments</li>
            <li>Submitted 1 peer teaching video</li>
            <li>Provided feedback to 2 peers</li>
            <li>Spent 12 minutes in 3D anatomy exploration</li>
          </ul>
        </FeatureCard>

        <div className={styles.nextSteps}>
          <h3>Ready for More?</h3>
          <p>Continue your journey with these recommended modules:</p>
          <div className={styles.buttonGroup}>
            <DemoButton>Warrior II & III Progressions</DemoButton>
            <DemoButton variant="secondary">
              Advanced Cueing Techniques
            </DemoButton>
          </div>
        </div>

        <div className={styles.feedback}>
          <h4>Help Us Improve</h4>
          <p>How would you rate this module?</p>
          <div className={styles.rating}></div>
          <DemoButton variant="secondary" className={styles.feedbackButton}>
            Leave Detailed Feedback
          </DemoButton>
        </div>
      </div>
    </div>
  );
};

export default CompletionSlide;
