import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import adminStore from "@/store/admin/adminProfile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const globalFilterFn = (row, columnId, filterValue) => {
  const value = row.getValue(columnId);
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value)
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());
  }
  return String(value)
    .toLowerCase()
    .includes(String(filterValue).toLowerCase());
};

const TodayEntryTable = ({ entries, handleAddDiscount }) => {
  const [sorting, setSorting] = useState([]);
  const { admin } = adminStore();
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [clientID, setClientID] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [discount, setDiscount] = useState("");
  const [remark, setRemark] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="font-medium">
            {truncateString(row?.getValue("name"), 8)}
          </div>
        ),
      },
      {
        accessorKey: "mobileNumber",
        header: () => <div className="">Mobile Number</div>,
        cell: ({ row }) => {
          return (
            <div className=" font-medium">{row.getValue("mobileNumber")}</div>
          );
        },
      },
      {
        accessorKey: "visitCount",
        header: () => <div className="">Visit Count</div>,
        cell: ({ row }) => {
          return (
            <div className=" font-medium">{row.getValue("visitCount")}</div>
          );
        },
      },
      {
        accessorKey: "notes",
        header: () => <div className="">Notes</div>,
        cell: ({ row }) => {
          return <div className=" font-medium">{row.getValue("notes")}</div>;
        },
      },
      {
        accessorKey: "cashPaid",
        header: () => <div className="">Cash</div>,
        cell: ({ row }) => {
          return <div className=" font-medium">{row.getValue("cashPaid")}</div>;
        },
      },
      {
        accessorKey: "onlinePaid",
        header: () => <div className="">Online</div>,
        cell: ({ row }) => {
          return (
            <div className=" font-medium">{row.getValue("onlinePaid")}</div>
          );
        },
      },
      {
        accessorKey: "discount",
        header: () => <div className="">Discount</div>,
        cell: ({ row }) => {
          return <div className=" font-medium">{row.getValue("discount")}</div>;
        },
      },
      {
        accessorKey: "visitDate",
        header: () => <div className="">Visit Date</div>,
        cell: ({ row }) => {
          return (
            <div className="font-medium">
              {format(new Date(row.getValue("visitDate")), "PPpp")}
            </div>
          );
        },
      },
    ],
    []
  );

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (selectedRow) {
      let data = JSON.stringify({
        patientID: selectedRow?.original?._id,
        visitInformationID: selectedRow?.original?.visitInformationID,
        discount: discount,
        remark: remark,
      });
      handleAddDiscount(data);
      setIsModalOpen(false);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
  });

  const calculateTotals = (data) => {
    let totalCash = 0;
    let totalOnline = 0;
    let totalDiscount = 0;
    let overallTotal = 0;
  
    data.forEach((entry) => {
      totalCash += entry.cashPaid || 0;
      totalOnline += entry.onlinePaid || 0;
      totalDiscount += entry.discount || 0;
      overallTotal += (entry.cashPaid || 0) + (entry.onlinePaid || 0);
    });
  
    overallTotal -= totalDiscount;
  
    return { totalCash, totalOnline, totalDiscount, overallTotal };
  };
  
  const { totalCash, totalOnline, totalDiscount, overallTotal } = useMemo(() => {
    return calculateTotals(
      table.getFilteredRowModel().rows.map((row) => row.original)
    );
  }, [table.getFilteredRowModel().rows]);

  useEffect(() => {
    setData(entries);
  }, [entries]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border p-2">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        onClick={() => header.column.toggleSorting()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted()
                          ? header.column.getIsSorted() === "desc"
                            ? " 🔽"
                            : " 🔼"
                          : null}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-gray-200/60"
                    onClick={() => handleRowClick(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No Clients Found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
        <div className="py-4">
          <div className="text-sm w-full flex items-center justify-between">
            <strong>Total Cash:</strong>  <p className="font-medium">{totalCash}</p>
          </div>
          <div className="text-sm w-full flex items-center justify-between">
            <strong>Total Online:</strong> <p p className="font-medium">{totalOnline}</p>
          </div>
          <div className="text-sm w-full flex items-center justify-between text-red-500">
            <strong>Total Discount:</strong> <strong>- {totalDiscount}</strong>
          </div>
          <div className="text-sm w-full flex items-center justify-between">
            <strong>Overall Total:</strong> <p  className="font-medium">{overallTotal}</p>
          </div>
        </div>
      </div>

      <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="my-2">Entry Details</SheetTitle>
            <SheetDescription className="text-sm my-5">
              Add discount and remark for the selected entry.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 my-2">
            <Input
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <Input
              placeholder="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <SheetFooter className="my-5">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodayEntryTable;
