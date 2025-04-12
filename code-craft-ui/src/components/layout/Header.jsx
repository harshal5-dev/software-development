import { NavLink } from "react-router-dom";

import { ROUTES } from "@/constant/routes";

import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import Icon from "../ui/icon";

const Header = () => {
  const getNavLinkClassName = ({ isActive }) => {
    const className =
      "flex flex-row justify-center items-center font-semibold text-sm hover:text-muted py-1 px-2 rounded-md";
    return isActive
      ? `text-muted ${className}`
      : `text-secondary-foreground ${className}`;
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b bg-secondary text-secondary-foreground">
      <div className="flex items-center gap-1 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4 bg-accent" />
        <div className="flex flex-row gap-1">
          {ROUTES.map((route) => (
            <NavLink
              key={route.id}
              to={route.path}
              className={getNavLinkClassName}
            >
              <Icon Icon={route.icon} className="size-4 mr-1" />
              <span>{route.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
