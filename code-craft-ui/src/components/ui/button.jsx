import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { ImSpinner9 } from "react-icons/im";

import { cn } from "@/lib/utils";
import Icon from "./icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-0.5",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-transparent hover:opacity-80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-8 rounded-md px-2.5",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children = null,
      isLoading = false,
      icon = null,
      iconClassName = "",
      iconPosition = "start",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const buttonIconInfo = {
      icon,
      className: iconClassName,
    };

    if (isLoading) {
      buttonIconInfo.className = `animate-spin ${iconClassName}`;
      buttonIconInfo.icon = ImSpinner9;
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {buttonIconInfo.icon && iconPosition === "start" && (
          <Icon
            Icon={buttonIconInfo.icon}
            className={buttonIconInfo.className}
          />
        )}
        {children}
        {buttonIconInfo.icon && iconPosition === "end" && (
          <Icon
            Icon={buttonIconInfo.icon}
            className={buttonIconInfo.className}
          />
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  asChild: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  icon: PropTypes.elementType,
  iconClassName: PropTypes.string,
  iconPosition: PropTypes.string,
};

export { Button, buttonVariants };
