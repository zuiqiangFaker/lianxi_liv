import styles from "./Button.module.css";
export default function Button({
  type = "default",
  size = "medium",
  disabled = false,
  onClick,
  icon,
  children,
}) {
  const typeClass =
    {
      default: "",
      primary: styles.primaryButton,
      danger: styles.dangerButton,
    }[type] || "";
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
  }[size];
  return (
    <button
      className={`${styles.customButton} ${typeClass} ${sizeClass} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
      onClick={(e) => !disabled && onClick && onClick(e)}
    >
      {icon && <span>{icon}</span>}
      {children && <span className={styles.buttonContent}>{children}</span>}
    </button>
  );
}
