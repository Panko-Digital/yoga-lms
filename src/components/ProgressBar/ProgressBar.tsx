import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  currentSlide: number;
  totalSlides: number;
}

const ProgressBar = ({ currentSlide, totalSlides }: ProgressBarProps) => {
  const progress = (currentSlide / totalSlides) * 100;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
