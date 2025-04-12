import PropTypes from "prop-types";
import { flexRender } from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table";
import noDataImg from "@/assets/images/noData.png";
import errorImg from "@/assets/images/error.png";
import { Skeleton } from "@/components/ui/skeleton";

const Data = ({
  rows,
  colSpan,
  noResultFound = "No data found",
  isLoading = false,
  isError = false,
  errorMessage = "error",
  isNoData = false,
}) => {
  if (isLoading) {
    return Array.from({ length: 7 }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {Array.from({ length: colSpan }).map((_, cellIndex) => (
          <TableCell key={cellIndex}>
            <Skeleton className="h-2 w-full bg-slate-300" />
          </TableCell>
        ))}
      </TableRow>
    ));
  } else if (isError) {
    return (
      <TableRow>
        <TableCell
          colSpan={colSpan}
          className="bg-slate-50 rounded-br-md rounded-bl-md"
        >
          <div className="h-72 flex flex-col items-center justify-center">
            <img src={errorImg} alt="no data" className="size-60" />
            <p className="font-semibold my-4 text-destructive">
              {errorMessage}
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  } else {
    return rows?.length ? (
      rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell
          colSpan={colSpan}
          className="bg-slate-50 rounded-br-md rounded-bl-md"
        >
          {isNoData ? (
            <div className="h-10 flex flex-col items-center justify-center">
              <p className="font-semibold text-blue-500">{noResultFound}</p>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center">
              <img src={noDataImg} alt="no data" className="size-60" />
              <p className="font-semibold text-blue-500">{noResultFound}</p>
            </div>
          )}
        </TableCell>
      </TableRow>
    );
  }
};

Data.propTypes = {
  rows: PropTypes.array,
  colSpan: PropTypes.number,
  noResultFound: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  isNoData: PropTypes.bool,
};

export default Data;
