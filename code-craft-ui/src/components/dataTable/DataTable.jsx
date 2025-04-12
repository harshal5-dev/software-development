import { useState } from "react";
import PropTypes from "prop-types";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableHeader } from "@/components/ui/table";

import Data from "./Data";

import PaginationFooter from "./PaginationFooter";
import DataTableHeader from "./DataTableHeader";

const getTableConfiguration = (data, columns, config = {}) => {
  let tableConfig = {
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {},
  };
  const { isPagination = false, paginationConfig = {} } = config;
  const { isFiltering = false, filterConfig = {} } = config;
  const { pagination = {}, setPagination = () => {} } = paginationConfig;
  const { globalFilter = "", customerFilterFn = () => {} } = filterConfig;

  if (isPagination) {
    tableConfig = {
      ...tableConfig,
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      state: {
        ...tableConfig.state,
        pagination,
      },
    };
  }

  if (isFiltering) {
    tableConfig = {
      ...tableConfig,
      globalFilterFn: customerFilterFn,
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        ...tableConfig.state,
        globalFilter,
      },
    };
  }

  return tableConfig;
};

const DataTable = ({
  columns,
  data,
  noResultFound = "No data found",
  isLoading = false,
  isError = false,
  errorMessage = "",
  isPagination = false,
  paginationConfig = {
    pageIndex: 0,
    pageSize: 7,
  },
  isNoData = false,
  isFiltering = false,
  filterConfig = {
    globalFilter: "",
    customerFilterFn: () => {},
  },
}) => {
  const [pagination, setPagination] = useState(paginationConfig);
  const { globalFilter = "", customerFilterFn = () => {} } = filterConfig;

  const table = useReactTable(
    getTableConfiguration(data, columns, {
      isPagination,
      paginationConfig: { pagination, setPagination },
      isFiltering,
      filterConfig: { globalFilter, customerFilterFn },
    })
  );

  return (
    <>
      <div className="border rounded-md border-accent">
        <Table>
          <TableHeader className="bg-primary">
            <DataTableHeader headerGroups={table.getHeaderGroups()} />
          </TableHeader>

          <TableBody>
            <Data
              rows={table.getRowModel().rows}
              noResultFound={noResultFound}
              isLoading={isLoading}
              colSpan={columns.length}
              isError={isError}
              errorMessage={errorMessage}
              isNoData={isNoData}
            />
          </TableBody>
        </Table>
      </div>
      {isPagination && (
        <PaginationFooter
          isLoading={isLoading}
          isError={isError}
          recordPerPage={table.getRowModel().rows.length}
          totalRecords={table.getRowCount()}
          onPrevious={table.previousPage}
          onNext={table.nextPage}
          isPreviousDisabled={table.getCanPreviousPage()}
          isNextDisabled={table.getCanNextPage()}
        />
      )}
    </>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  noResultFound: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  isPagination: PropTypes.bool,
  paginationConfig: PropTypes.object,
  errorMessage: PropTypes.string,
  isNoData: PropTypes.bool,
  isFiltering: PropTypes.bool,
  filterConfig: PropTypes.object,
};

export default DataTable;
