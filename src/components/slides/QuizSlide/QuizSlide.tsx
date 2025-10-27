import { useState } from "react";
import FeatureCard from "../../shared/FeatureCard/FeatureCard";
import styles from "./QuizSlide.module.css";

const QuizSlide = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.slide}>
      <div className={styles.slideHeader}>
        <div className={styles.slideNumber}>Module 1 • Slide 5 of 7</div>
        <h1>Knowledge Check</h1>
        <div className={styles.instructorBadge}>Quick Assessment</div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.quizContainer}>
          <h3>Question 1 of 3</h3>
          <p className={styles.question}>
            A student in Warrior I has their back heel lifted and hip externally
            rotated. What's your PRIMARY verbal cue?
          </p>

          <div className={styles.optionsContainer}>
            <div
              className={`${styles.quizOption} ${
                selectedOption === "A" ? styles.selected : ""
              }`}
              onClick={() => handleOptionSelect("A")}
            >
              <strong>A)</strong> "Lift your arms higher to engage your
              shoulders"
            </div>

            <div
              className={`${styles.quizOption} ${
                selectedOption === "B" ? styles.selected : ""
              }`}
              onClick={() => handleOptionSelect("B")}
            >
              <strong>B)</strong> "Ground down through your back heel and
              internally rotate your back hip"
            </div>

            <div
              className={`${styles.quizOption} ${
                selectedOption === "C" ? styles.selected : ""
              }`}
              onClick={() => handleOptionSelect("C")}
            >
              <strong>C)</strong> "Bend your front knee deeper"
            </div>

            <div
              className={`${styles.quizOption} ${
                selectedOption === "D" ? styles.selected : ""
              }`}
              onClick={() => handleOptionSelect("D")}
            >
              <strong>D)</strong> "Narrow your stance"
            </div>
          </div>
        </div>

        <FeatureCard title="Teaching Tip" icon="">
          <p>
            When you notice multiple misalignments, address foundation first
            (feet and legs) before moving to upper body cues. This prevents
            overwhelming your students.
          </p>
        </FeatureCard>

        <div className={styles.trackingInfo}>
          <p>
            <strong>xAPI Tracking:</strong> Your answer, time spent, and
            confidence level are being recorded. This helps us identify areas
            where you might need additional practice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizSlide;
