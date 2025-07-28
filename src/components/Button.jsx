import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/Button.css";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon, // optional: "arrow" | "close" | etc.
  ...props
}) {
  const classes = [
    "btn",
    icon ? `btn--icon-${icon}` : "",
    disabled ? "btn--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {icon === "arrow" && <span className="btn__arrow">→</span>}
      {icon === "close" && <span className="btn__close">×</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.oneOf(["arrow", "close"]),
};
