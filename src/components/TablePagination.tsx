interface Props {
  changePageNumber: (page: number) => void;
  pages: number;
  page: number;
}
const TablePagination = ({ pages, page, changePageNumber }: Props) => {
  return (
    <div className="bg-[#dadada65] w-full flex flex-center justify-end py-2 gap-2">
      <div className="inline-flex items-center gap-1 w-fit  mx-auto">
        <span>Pages:</span>
        <div className="flex gap-1">
          {Array(pages)
            .fill(undefined)
            ?.map((_, i) => {
              const value = i + 1;
              return (
                <button
                  key={value}
                  onClick={(e) =>
                    changePageNumber(parseInt(e.currentTarget.innerHTML))
                  }
                  className={`h-6 w-6 text-lg flex-center font-bold rounded ${page === value ? "bg-[var(--primary-color)] text-white" : "bg-white text-slate-600"}`}
                >
                  {value}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
