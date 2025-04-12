import DataTable from "@/components/dataTable/DataTable";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { BookA, Box, FileDigit, FileText } from "lucide-react";
import PropTypes from "prop-types";
import { BsTrash3Fill } from "react-icons/bs";
import {
  FaCalendarDay,
  FaChalkboardTeacher,
  FaPencilAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLectureOperation, setSelectedLecture } from "../lectureSlice";
import DeleteLecture from "./DeleteLecture";

const columnHelper = createColumnHelper();

const getColumns = (handleUpdateLecture) => [
  {
    accessorKey: "moduleNumber",
    header: "Module Number",
    icon: Box,
  },
  {
    accessorKey: "lectureNumber",
    header: "Number",
    icon: FileDigit,
  },
  {
    accessorKey: "name",
    header: "Name",
    icon: FaChalkboardTeacher,
  },
  columnHelper.accessor((row) => row.description, {
    header: "Description",
    accessorKey: "description",
    icon: FileText,
    cell: (info) => (
      <p className="w-[27ch] overflow-hidden text-ellipsis whitespace-nowrap">
        {info.getValue()}
      </p>
    ),
  }),
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
          onClick={() => handleUpdateLecture(info.row.original)}
        >
          <FaPencilAlt />
        </Button>
        <DeleteLecture
          lectureId={info.row.original.id}
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
  if (filterValue === "-1") {
    return true;
  }

  const moduleId = row.original.moduleId;

  return moduleId === parseInt(filterValue);
};

const LectureList = ({ lectureResponse, globalFilter }) => {
  const { data, isLoading, isError } = lectureResponse;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUpdateLecture(selectedLecture) {
    dispatch(setLectureOperation("Update"));
    dispatch(setSelectedLecture(selectedLecture));
    navigate("/create-update-lecture");
  }

  return (
    <DataTable
      columns={getColumns(handleUpdateLecture)}
      data={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Unable to fetch lectures. Please try again later!"
      isPagination
      noResultFound="Lectures data not found. Please add a lecture."
      isFiltering
      filterConfig={{
        globalFilter,
        customerFilterFn: filterByModuleId,
      }}
    />
  );
};

LectureList.propTypes = {
  lectureResponse: PropTypes.object,
  globalFilter: PropTypes.string,
};

export default LectureList;
