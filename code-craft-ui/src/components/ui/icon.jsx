import { forwardRef } from "react";
import PropTypes from "prop-types";

const Icon = forwardRef(({ Icon, ...props }, ref) => {
  return <Icon ref={ref} {...props} />;
});

Icon.displayName = "Icon";

Icon.propTypes = {
  Icon: PropTypes.elementType,
};

export default Icon;
