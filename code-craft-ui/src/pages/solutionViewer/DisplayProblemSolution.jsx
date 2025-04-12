import PropTypes from "prop-types";
import { TbMessage2Question } from "react-icons/tb";
import { useState } from "react";
import DisplaySolution from "./DisplaySolution";
import DisplayProblem from "./DisplayProblem";

const DisplayProblemSolution = ({
  title,
  description,
  problems,
  problemIcon = TbMessage2Question,
  noDataText = "No data found",
}) => {
  const [selectedProblem, setSelectedProblem] = useState(null);

  function handleSelectProblem(problem) {
    setSelectedProblem(problem);
  }

  function handleClearProblem() {
    setSelectedProblem(null);
  }

  return selectedProblem ? (
    <DisplaySolution
      problem={selectedProblem}
      onClearProblem={handleClearProblem}
    />
  ) : (
    <DisplayProblem
      title={title}
      description={description}
      problems={problems}
      problemIcon={problemIcon}
      noDataText={noDataText}
      onSelectProblem={handleSelectProblem}
    />
  );
};

DisplayProblemSolution.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  problems: PropTypes.array,
  noDataText: PropTypes.string,
  problemIcon: PropTypes.func,
};

export default DisplayProblemSolution;
