import "material-symbols/outlined.css";
import "./Icon.css";

export const Icon = ({
  children,
  className = "icon-base",
  fontSize = "24px",
}) => (
  <i
    className={`material-symbols-outlined notranslate ` + className}
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
    className={`material-symbols-outlined notranslate ` + className}
    style={{ color: color, fontSize: fontSize }}
  >
    {children}
  </i>
);
