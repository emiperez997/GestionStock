import { NavLink } from "react-router-dom";

function NavItem({ to, children, activeStyle, defaultStyle }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
    >
      {children}
    </NavLink>
  );
}

export { NavItem };
