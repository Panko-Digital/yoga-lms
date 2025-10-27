import DemoButton from "../../shared/DemoButton/DemoButton";
import FeatureCard from "../../shared/FeatureCard/FeatureCard";
import styles from "./AnatomySlide.module.css";

const AnatomySlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 3 of 7</div>
        <h1>3D Anatomy Deep Dive</h1>
        <div className={styles.instructorBadge}>
          Based on Leslie Kaminoff's work
        </div>
      </div>

      <div className={styles.contentSection}>
        <p className={styles.description}>
          Understanding muscle engagement helps you cue more effectively and
          prevent student injuries. Explore the interactive anatomy model below:
        </p>

        <div className={styles.anatomyViewer}>
          <div className={styles.anatomyContent}>
            <h3>Interactive Muscle Engagement Map</h3>
            <p>Click on muscle groups to see their role in Warrior I</p>

            <div className={styles.muscleGroup}>
              <h4>Quadriceps (Front Leg)</h4>
              <p>
                Primary stabilizer • Eccentric contraction • 70-85% activation
              </p>
            </div>

            <div className={styles.muscleGroup}>
              <h4>Gluteus Maximus (Back Leg)</h4>
              <p>
                Hip extension • Maintains neutral pelvis • 60-75% activation
              </p>
            </div>

            <div className={styles.muscleGroup}>
              <h4>Core Stabilizers</h4>
              <p>
                Transverse abdominis & obliques • Prevents lumbar hyperextension
                • 40-50% activation
              </p>
            </div>

            <div className={styles.muscleGroup}>
              <h4>Shoulder Girdle</h4>
              <p>
                Serratus anterior & trapezius • Arm elevation support • 30-40%
                activation
              </p>
            </div>

            <div className={styles.anatomyControls}>
              <DemoButton>Rotate 3D Model</DemoButton>
              <DemoButton variant="secondary">Toggle Muscle Layers</DemoButton>
            </div>
          </div>
        </div>

        <FeatureCard title="Teaching Insight" icon="">
          <p>
            Notice how the front quadriceps works eccentrically? This is why
            students often shake in Warrior I. Cue them to "press firmly through
            the outer edge of the back foot" to engage the posterior chain and
            reduce quad fatigue.
          </p>
        </FeatureCard>
      </div>
    </div>
  );
};

export default AnatomySlide;
