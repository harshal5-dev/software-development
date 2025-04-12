import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BookA, Box, FileDigit } from "lucide-react";
import { BsTrash3Fill } from "react-icons/bs";
import {
  FaCalendarDay,
  FaChalkboardTeacher,
  FaPencilAlt,
} from "react-icons/fa";
import { LuFileType } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "@/components/dataTable/DataTable";

import { setProblemOperation, setSelectedProblem } from "../problemSlice";
import DeleteProblem from "./DeleteProblem";

const columnHelper = createColumnHelper();

const getColumns = (handleUpdateProblem) => [
  {
    accessorKey: "lectureNumber",
    header: "Lecture Number",
    icon: Box,
  },
  {
    accessorKey: "problemNumber",
    header: "Number",
    icon: FileDigit,
  },
  {
    accessorKey: "name",
    header: "Name",
    icon: FaChalkboardTeacher,
  },
  {
    accessorKey: "problemType",
    header: "Type",
    icon: LuFileType,
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
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
          onClick={() => handleUpdateProblem(info.row.original)}
        >
          <FaPencilAlt />
        </Button>
        <DeleteProblem
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

const filterByModuleId = (row, columnId, filterValue) => {
  const { moduleId, lectureId } = row.original;
  const [moduleIdFilter, lectureIdFilter] = filterValue;

  if (moduleIdFilter) {
    if (lectureIdFilter) {
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

const ProblemList = ({ problemResponse, globalFilter }) => {
  const { data, isLoading, isError } = problemResponse;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUpdateProblem(problem) {
    dispatch(setProblemOperation("Update"));
    dispatch(setSelectedProblem(problem));
    navigate("/create-update-problem");
  }

  return (
    <DataTable
      columns={getColumns(handleUpdateProblem)}
      data={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Unable to fetch problems. Please try again later!"
      isPagination
      noResultFound="Problem data not found. Please add a problem."
      isFiltering
      filterConfig={{
        globalFilter,
        customerFilterFn: filterByModuleId,
      }}
    />
  );
};

ProblemList.propTypes = {
  problemResponse: PropTypes.object,
  globalFilter: PropTypes.array,
};

export default ProblemList;
