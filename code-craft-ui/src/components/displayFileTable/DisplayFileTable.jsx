import PropTypes from "prop-types";
import { createColumnHelper } from "@tanstack/react-table";
import { BookA } from "lucide-react";
import { FaFileInvoice } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { SiZettlr } from "react-icons/si";
import { FaLink } from "react-icons/fa6";

import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import DataTable from "../dataTable/DataTable";
import { Badge } from "../ui/badge";

const columnHelper = createColumnHelper();

const getColumns = (onDelete) => [
  columnHelper.accessor((row) => row.originalName, {
    header: "File Name",
    accessorKey: "originalName",
    icon: FaFileInvoice,
    cell: (info) => (
      <div className="flex flex-row">
        <Badge
          variant="accent"
          className="cursor-pointer"
          onClick={() => window.open(info.row.original.url, "_blank")}
          icon={FaLink}
        >
          {info.getValue()}
        </Badge>
      </div>
    ),
  }),
  {
    accessorKey: "contentType",
    header: "Content Type",
    icon: LuFileType,
  },
  {
    accessorKey: "size",
    header: "Size",
    icon: SiZettlr,
  },
  columnHelper.accessor((row) => row.id, {
    header: "Action",
    accessorKey: "action",
    icon: BookA,
    cell: () => (
      <div className="flex flex-row items-center justify-center">
        <Button
          variant="icon"
          className="size-7 text-destructive"
          onClick={onDelete}
        >
          <BsTrash3Fill />
        </Button>
      </div>
    ),
  }),
];

const DisplayFileTable = ({ onDelete, data }) => {
  return (
    <DataTable
      columns={getColumns(onDelete)}
      data={data}
      noResultFound="No files found. Please add a file."
      isNoData
    />
  );
};

DisplayFileTable.propTypes = {
  onDelete: PropTypes.func,
  data: PropTypes.array,
};

export default DisplayFileTable;
