import { flexRender } from "@tanstack/react-table";

import { TableHead, TableRow } from "../ui/table";
import Icon from "../ui/icon";

const DataTableHeader = ({ headerGroups }) => {
  return headerGroups.map((headerGroup) => (
    <TableRow key={headerGroup.id} className="hover:bg-primary">
      {headerGroup.headers.map((header) => {
        const column = header.column.columnDef;
        const isActionColumn = column.accessorKey === "action";
        return (
          <TableHead
            key={header.id}
            className="text-primary-foreground font-semibold first:rounded-tl-md last:rounded-tr-md"
          >
            <div
              className={`flex flex-row items-center justify-start ${
                isActionColumn && "justify-center"
              }`}
            >
              {column?.icon && (
                <Icon
                  Icon={column.icon}
                  className={`size-5 text-primary-foreground mr-2 ${column?.iconClassName}`}
                />
              )}
              {header.isPlaceholder
                ? null
                : flexRender(column.header, header.getContext())}
            </div>
          </TableHead>
        );
      })}
    </TableRow>
  ));
};

export default DataTableHeader;
