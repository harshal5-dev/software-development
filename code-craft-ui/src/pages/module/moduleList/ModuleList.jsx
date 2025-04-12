import { createColumnHelper } from "@tanstack/react-table";
import { BookA, Box, FileDigit, FileText } from "lucide-react";
import { FaCalendarDay } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";

import DataTable from "@/components/dataTable/DataTable";
import CreateUpdateModule from "../createUpdateModule/CreateUpdateModule";
import DeleteModule from "./DeleteModule";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

const columnHelper = createColumnHelper();

const columns = [
  {
    accessorKey: "moduleNumber",
    header: "Number",
    icon: FileDigit,
  },
  {
    accessorKey: "name",
    header: "Name",
    icon: Box,
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
        <CreateUpdateModule
          selectedModule={info.row.original}
          operation="Update"
          dialogTriggerButton={
            <Button
              variant="icon"
              size="icon"
              className="size-7 text-secondary"
            >
              <FaPencilAlt />
            </Button>
          }
        />
        <DeleteModule
          alertTrigger={
            <Button variant="icon" className="size-7 text-destructive">
              <BsTrash3Fill />
            </Button>
          }
          moduleId={info.row.original.id}
        />
      </div>
    ),
  }),
];

const ModuleList = ({ moduleResponse }) => {
  const { data, isLoading, isError } = moduleResponse;

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      isError={isError}
      errorMessage="Unable to fetch modules. Please try again later!"
      isPagination
      noResultFound="Modules data not found. Please add a module."
    />
  );
};

ModuleList.propTypes = {
  moduleResponse: PropTypes.object,
};

export default ModuleList;
