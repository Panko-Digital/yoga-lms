import DemoButton from "../../shared/DemoButton/DemoButton";
import AudioPlayer from "../../shared/AudioPlayer/AudioPlayer";
import styles from "./VideoLessonSlide.module.css";

const VideoLessonSlide = () => {
  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 2 of 7</div>
        <h1>Foundational Teaching Video</h1>
        <div className={styles.instructorBadge}>Shiva Rea demonstrates</div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.interactiveDemo}>
          <h3>Watch: Warrior I Breakdown</h3>
          <div className={styles.videoPlayer}>
            <p className={styles.playIcon}>▶</p>
            <p>12:34 minute teaching demonstration</p>
            <p className={styles.videoDescription}>
              Warrior I: Alignment, Energy Flow & Common Mistakes
            </p>
          </div>
          <div className={styles.videoControls}>
            <DemoButton variant="secondary">Skip Back 10s</DemoButton>
            <DemoButton>Play</DemoButton>
            <DemoButton variant="secondary">Skip Forward 10s</DemoButton>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Practice Your Cueing</h3>
        <p className={styles.sectionDescription}>
          Download these professionally-recorded audio cues to practice teaching
          along with them:
        </p>

        <AudioPlayer
          title="Warrior I Entry Cue Sequence"
          instructor="Shiva Rea"
          duration="2:15"
          description="Beginner-friendly"
        />

        <AudioPlayer
          title="Breath-Integrated Warrior Flow"
          instructor="Shiva Rea"
          duration="3:42"
          description="Advanced students"
        />

        <AudioPlayer
          title="Modification Cues for Limited Mobility"
          instructor="Shiva Rea"
          duration="1:58"
          description="Accessibility-focused"
        />
      </div>
    </div>
  );
};

export default VideoLessonSlide;
