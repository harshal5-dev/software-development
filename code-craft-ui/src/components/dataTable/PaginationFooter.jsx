import PropTypes from "prop-types";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Button } from "../ui/button";

const PaginationFooter = ({
  isLoading,
  isError,
  recordPerPage,
  totalRecords,
  onPrevious,
  onNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  if (isLoading || isError) {
    return null;
  }

  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Currently Showing {recordPerPage} records out of {totalRecords} row(s).
      </div>
      <div className="flex flex-row gap-2">
        <Button
          variant="accent"
          size="sm"
          onClick={handlePrevious}
          disabled={!isPreviousDisabled}
          icon={IoIosArrowDropleftCircle}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleNext}
          disabled={!isNextDisabled}
          icon={IoIosArrowDroprightCircle}
          iconPosition="end"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

PaginationFooter.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  recordPerPage: PropTypes.number,
  totalRecords: PropTypes.number,
  onPrevious: PropTypes.func,
  onNext: PropTypes.func,
  isPreviousDisabled: PropTypes.bool,
  isNextDisabled: PropTypes.bool,
};

export default PaginationFooter;
