import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { BookA, Box, FileDigit } from "lucide-react";
import {
  FaCalendarDay,
  FaChalkboardTeacher,
  FaPencilAlt,
} from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import DeleteProblemSolution from "./DeleteProblemSolution";
import { BsTrash3Fill } from "react-icons/bs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setProblemSolutionOperation,
  setSelectedProblemSolution,
} from "../problemSolutionSlice";
import DataTable from "@/components/dataTable/DataTable";

const columnHelper = createColumnHelper();

const getColumns = (handleUpdateProblemSolution) => [
  {
    accessorKey: "problemNumber",
    header: "Problem Number",
    icon: Box,
  },
  {
    accessorKey: "problemSolutionNumber",
    header: "Number",
    icon: FileDigit,
  },
  {
    accessorKey: "name",
    header: "Name",
    icon: FaChalkboardTeacher,
  },
  {
    accessorKey: "timeComplexity",
    header: "Time Complexity",
    icon: LuFileType,
  },
  {
    accessorKey: "spaceComplexity",
    header: "Space Complexity",
    icon: FaCalendarDay,
    iconClassName: "size-[16px]",
  },
  columnHelper.accessor((row) => row.id, {
    header: "Action",
    accessorKey: "action",
    icon: BookA,
    cell: (info) => (
      <div className="flex flex-row items-center justify-center">
        <Button
          variant="icon"
          size="icon"
          className="size-7 text-secondary"
          onClick={() => handleUpdateProblemSolution(info.row.original)}
        >
          <FaPencilAlt />
        </Button>
        <DeleteProblemSolution
          problemId={info.row.original.id}
          alertTrigger={
            <Button variant="icon" className="size-7 text-destructive">
              <BsTrash3Fill />
            </Button>
          }
        />
      </div>
    ),
  }),
];

const filterProblemSolution = (row, columnId, filterValue) => {
  const { moduleId, lectureId, problemId } = row.original;
  const [moduleIdFilter, lectureIdFilter, problemIdFilter] = filterValue;

  if (moduleIdFilter) {
    if (lectureIdFilter) {
      if (problemIdFilter) {
        return (
          parseInt(moduleIdFilter, 10) === moduleId &&
          parseInt(lectureIdFilter, 10) === lectureId &&
          parseInt(problemIdFilter, 10) === problemId
        );
      }
      return (
        parseInt(moduleIdFilter, 10) === moduleId &&
        parseInt(lectureIdFilter, 10) === lectureId
      );
    } else {
      return parseInt(moduleIdFilter, 10) === moduleId;
    }
  } else {
    return true;
  }
};

const ProblemSolutionList = ({ problemSolutionResponse, globalFilter }) => {
  const { data, isLoading, isError } = problemSolutionResponse;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUpdateProblemSolution(problemSolution) {
    dispatch(setProblemSolutionOperation("Update"));
    dispatch(setSelectedProblemSolution(problemSolution));
    navigate("/create-update-problem-solution");
  }

  return (
    <DataTable
      columns={getColumns(handleUpdateProblemSolution)}
      data={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Unable to fetch problem solutions. Please try again later!"
      isPagination
      noResultFound="Problem solution data not found. Please add a problem solution."
      isFiltering
      filterConfig={{
        globalFilter,
        customerFilterFn: filterProblemSolution,
      }}
    />
  );
};

ProblemSolutionList.propTypes = {
  problemSolutionResponse: PropTypes.object,
  globalFilter: PropTypes.array,
};

export default ProblemSolutionList;
