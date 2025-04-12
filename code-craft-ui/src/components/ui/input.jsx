import { forwardRef } from "react";
import PropTypes from "prop-types";
import { PiSpinnerFill } from "react-icons/pi";

import { cn } from "@/lib/utils";
import Icon from "./icon";

const Input = forwardRef(
  (
    {
      className,
      type,
      icon = null,
      iconClassName = "",
      isLoading = false,
      ...props
    },
    ref
  ) => {
    if (icon) {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-12 text-md",
              className
            )}
            ref={ref}
            {...props}
          />
          <div
            className={`absolute inset-y-0 left-0 pl-3 h-10 w-11 flex items-center pointer-events-none bg-primary rounded-l-md ${
              isLoading && "opacity-50"
            }`}
          >
            <Icon
              Icon={isLoading ? PiSpinnerFill : icon}
              className={`size-5 text-primary-foreground ${iconClassName} ${
                isLoading && "animate-spin"
              }`}
            />
          </div>
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.elementType,
  iconClassName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export { Input };
