// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable typescript-sort-keys/interface */
// /* eslint-disable sort-keys-fix/sort-keys-fix */
// "use client"

// import * as React from "react"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import type { DataTableFilterField } from "@/types/table"
// import {
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
//   type ColumnFiltersState,
//   type PaginationState,
//   type SortingState,
//   type TableOptions,
//   type TableState,
//   type VisibilityState,
// } from "@tanstack/react-table"
// import { z } from "zod"

// import { useQueryString } from "@/hooks/use-query-string"

// interface UseDataTableProps<TData>
//   extends Omit<
//       TableOptions<TData>,
//       | "pageCount"
//       | "getCoreRowModel"
//       | "manualFiltering"
//       | "manualPagination"
//       | "manualSorting"
//     >,
//     Required<Pick<TableOptions<TData>, "pageCount">> {
//   /**
//    * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
//    * - Faceted filters are rendered when `options` are provided for a filter field.
//    * - Otherwise, search filters are rendered.
//    *
//    * The indie filter field `value` represents the corresponding column name in the database table.
//    * @default []
//    * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
//    * @example
//    * ```ts
//    * // Render a search filter
//    * const filterFields = [
//    *   { label: "Title", value: "title", placeholder: "Search titles" }
//    * ];
//    * // Render a faceted filter
//    * const filterFields = [
//    *   {
//    *     label: "Status",
//    *     value: "status",
//    *     options: [
//    *       { label: "Todo", value: "todo" },
//    *       { label: "In Progress", value: "in-progress" },
//    *     ]
//    *   }
//    * ];
//    * ```
//    */
//   filterFields?: DataTableFilterField<TData>[]

//   /**
//    * Enable notion like column filters.
//    * Advanced filters and column filters cannot be used at the same time.
//    * @default false
//    * @type boolean
//    */
//   enableAdvancedFilter?: boolean

//   /**
//    * The method to use when updating the URL.
//    * - "push" - Pushes a new entry onto the history stack.
//    * - "replace" - Replaces the current entry on the history stack.
//    * @default "replace"
//    */
//   method?: "push" | "replace"

//   /**
//    * Indicates whether the page should scroll to the top when the URL changes.
//    * @default false
//    */
//   scroll?: boolean

//   /**
//    * A callback function that is called before updating the URL.
//    * Can be use to retrieve the loading state of the route transition.
//    * @see https://react.dev/reference/react/useTransition
//    *
//    */
//   startTransition?: React.TransitionStartFunction

//   // Extend to make the sorting id typesafe
//   initialState?: Omit<Partial<TableState>, "sorting"> & {
//     sorting?: {
//       id: Extract<keyof TData, string>
//       desc: boolean
//     }[]
//   }
// }

// const searchParamsSchema = z.object({
//   page: z.coerce.number().default(1),
//   per_page: z.coerce.number().optional(),
//   sort: z.string().optional(),
// })

// export function useDataTable<TData>({
//   pageCount = -1,
//   filterFields = [],
//   method = "replace",
//   scroll = false,
//   startTransition,
//   ...props
// }: UseDataTableProps<TData>) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   // Search params
//   const search = searchParamsSchema.parse(Object.fromEntries(searchParams))
//   const page = search.page
//   const perPage =
//     search.per_page ?? props.initialState?.pagination?.pageSize ?? 10
//   const sort =
//     search.sort ??
//     `${props.initialState?.sorting?.[0]?.id}.${props.initialState?.sorting?.[0]?.desc ? "desc" : "asc"}`
//   const [column, order] = sort?.split(".") ?? []

//   // Memoize computation of searchableColumns and filterableColumns
//   const { searchableColumns, filterableColumns } = React.useMemo(() => {
//     return {
//       searchableColumns: filterFields.filter((field) => !field.options),
//       filterableColumns: filterFields.filter((field) => field.options),
//     }
//   }, [filterFields])

//   // Create query string
//   const { createQueryString } = useQueryString(searchParams)

//   // Initial column filters
//   const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
//     return Array.from(searchParams.entries()).reduce<ColumnFiltersState>(
//       (filters, [key, value]) => {
//         const filterableColumn = filterableColumns.find(
//           (column) => column.value === key
//         )
//         const searchableColumn = searchableColumns.find(
//           (column) => column.value === key
//         )

//         if (filterableColumn) {
//           filters.push({
//             id: key,
//             value: value.split("."),
//           })
//         } else if (searchableColumn) {
//           filters.push({
//             id: key,
//             value: [value],
//           })
//         }

//         return filters
//       },
//       []
//     )
//   }, [filterableColumns, searchableColumns, searchParams])

//   // Table states
//   const [rowSelection, setRowSelection] = React.useState({})
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [columnFilters, setColumnFilters] =
//     React.useState<ColumnFiltersState>(initialColumnFilters)

//   // Handle server-side pagination
//   const [{ pageIndex, pageSize }, setPagination] =
//     React.useState<PaginationState>({
//       pageIndex: page - 1,
//       pageSize: perPage,
//     })

//   const pagination = React.useMemo(
//     () => ({
//       pageIndex,
//       pageSize,
//     }),
//     [pageIndex, pageSize]
//   )

//   // Handle server-side sorting
//   const [sorting, setSorting] = React.useState<SortingState>([
//     {
//       id: column ?? "",
//       desc: order === "desc",
//     },
//   ])

//   React.useEffect(() => {
//     function onUrlChange() {
//       const url = `${pathname}?${createQueryString({
//         page: pageIndex + 1,
//         per_page: pageSize,
//         sort: sorting[0]?.id
//           ? `${sorting[0]?.id}.${sorting[0]?.desc ? "desc" : "asc"}`
//           : null,
//       })}`

//       method === "push"
//         ? router.push(url, { scroll })
//         : router.replace(url, { scroll })
//     }

//     startTransition
//       ? startTransition(() => {
//           onUrlChange()
//         })
//       : onUrlChange()

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pageIndex, pageSize, sorting, method, scroll])

//   const table = useReactTable({
//     ...props,
//     pageCount,
//     state: {
//       pagination,
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onPaginationChange: setPagination,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     manualPagination: true,
//     manualSorting: true,
//     manualFiltering: true,
//   })

//   return { table }
// }
