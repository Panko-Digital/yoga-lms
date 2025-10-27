import DemoButton from "../DemoButton/DemoButton";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  title: string;
  instructor: string;
  duration: string;
  description: string;
}

const AudioPlayer = ({
  title,
  instructor,
  duration,
  description,
}: AudioPlayerProps) => {
  return (
    <div className={styles.audioPlayer}>
      <button className={styles.playBtn}>▶</button>
      <div className={styles.audioInfo}>
        <div className={styles.audioTitle}>{title}</div>
        <div className={styles.audioDuration}>
          {instructor} • {duration} • {description}
        </div>
      </div>
      <DemoButton variant="secondary" className={styles.downloadBtn}>
        Download
      </DemoButton>
    </div>
  );
};

export default AudioPlayer;
