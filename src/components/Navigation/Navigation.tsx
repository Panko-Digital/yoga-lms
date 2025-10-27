import styles from "./Navigation.module.css";

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

const Navigation = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
}: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <button
        className={styles.navBtn}
        onClick={onPrev}
        disabled={currentSlide === 1}
      >
        ← Previous
      </button>
      <button
        className={styles.navBtn}
        onClick={onNext}
        disabled={currentSlide === totalSlides}
      >
        Next →
      </button>
    </div>
  );
};

export default Navigation;
