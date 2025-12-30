import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  type,
  onClick,
  typeAttr = "button",
}) {
  const base =
    "inline-block text-sm rounded-full font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 focus:outline-none focus:ringfocus:ring-offset-2 disabled:cursor-not-allowed ";

  const yellow =
    "bg-yellow-400 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring-yellow-300";

  const red = "bg-red-400 hover:bg-red-300 focus:bg-red-300 focus:ring-red-300";

  const styles = {
    primary: base + yellow + " px-4 py-3 md:px-6 md:py-4",
    small: base + yellow + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    delete: base + red + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button
        disabled={disabled}
        className={styles[type]}
        onClick={onClick}
        type={typeAttr}
      >
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]} type={typeAttr}>
      {children}
    </button>
  );
}

export default Button;
