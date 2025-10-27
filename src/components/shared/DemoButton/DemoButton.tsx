import styles from "./DemoButton.module.css";

interface DemoButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

const DemoButton = ({
  children,
  variant = "primary",
  onClick,
  className,
}: DemoButtonProps) => {
  const buttonClass =
    variant === "secondary"
      ? `${styles.demoButton} ${styles.secondary}`
      : styles.demoButton;

  return (
    <button className={`${buttonClass} ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default DemoButton;
