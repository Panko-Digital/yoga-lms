import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import Navigation from "../Navigation/Navigation";
import IntroductionSlide from "../slides/IntroductionSlide/IntroductionSlide";
import VideoLessonSlide from "../slides/VideoLessonSlide/VideoLessonSlide";
import AnatomySlide from "../slides/AnatomySlide/AnatomySlide";
import ARSlide from "../slides/ARSlide/ARSlide";
import QuizSlide from "../slides/QuizSlide/QuizSlide";
import PeerTeachingSlide from "../slides/PeerTeachingSlide/PeerTeachingSlide";
import CompletionSlide from "../slides/CompletionSlide/CompletionSlide";
import styles from "./CourseContainer.module.css";

const CourseContainer = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 7;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <IntroductionSlide />;
      case 2:
        return <VideoLessonSlide />;
      case 3:
        return <AnatomySlide />;
      case 4:
        return <ARSlide />;
      case 5:
        return <QuizSlide />;
      case 6:
        return <PeerTeachingSlide />;
      case 7:
        return <CompletionSlide />;
      default:
        return <IntroductionSlide />;
    }
  };

  return (
    <div className={styles.courseContainer}>
      <ProgressBar currentSlide={currentSlide} totalSlides={totalSlides} />

      <div className={styles.slideContent}>
        {renderSlide()}

        <Navigation
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNext={nextSlide}
          onPrev={prevSlide}
        />
      </div>
    </div>
  );
};

export default CourseContainer;
