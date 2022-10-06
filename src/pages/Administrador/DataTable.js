import React, { useEffect } from "react";
import {
  useGlobalFilter,
  useMountedLayoutEffect,
  useRowSelect,
  useTable
} from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  padding: 0rem;

  table {
    border-spacing: 1rem;

    tr {
      :last-child {
        td {
          border-bottom: 1;
        }
      }
    }

    th{
        color: white;
        padding: 1rem;
        backgroundColor: yellow;
        background: #042354;
    },
    td {
      margin: 0;
      font-size: 1.25rem;
      padding: 1rem;
      border-bottom: 1px solid #cbcbcd;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

const DataTable = ({
  columns,
  data,
  onChangeSelectedRowsId,
  searchKeyword
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  useMountedLayoutEffect(() => {
    onChangeSelectedRowsId && onChangeSelectedRowsId(selectedRowIds);
  }, [selectedRowIds]);

  //frontend search
  useEffect(() => {
    setGlobalFilter(searchKeyword);
  }, [searchKeyword]);

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={
                        row.isSelected ? { backgroundColor: "rgb(33, 121, 212, 0.5)" } : {}
                      }
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};

export default DataTable;
