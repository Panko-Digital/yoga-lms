import styles from "./FeatureCard.module.css";

interface FeatureCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const FeatureCard = ({ title, icon, children, onClick }: FeatureCardProps) => {
  return (
    <div className={styles.featureCard} onClick={onClick}>
      <h3 className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        {title}
      </h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FeatureCard;
