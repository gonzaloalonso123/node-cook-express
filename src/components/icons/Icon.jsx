import "material-symbols/outlined.css";
import "./Icon.css";

export const Icon = ({
  children,
  className = "icon-base",
  fontSize = "24px",
}) => (
  <i
    className={`material-symbols-outlined notranslate select-none ` + className}
    style={{ fontSize: fontSize }}
  >
    {children}
  </i>
);

export const ColorIcon = ({
  children,
  className = "icon-base",
  color = "black",
  fontSize = "24px",
}) => (
  <i
    className={`material-symbols-outlined notranslate select-none ` + className}
    style={{ color: color, fontSize: fontSize }}
  >
    {children}
  </i>
);

export const BoldIcon = ({
  children,
  className = "icon-base",
  fontSize = "24px",
  color = "black",
}) => (
  <i
    className={
      `material-symbols-outlined bold notranslate select-none ` + className
    }
    style={{ fontSize: fontSize, color: color }}
  >
    {children}
  </i>
);
