import React from "react";
import { Pagination as AntPagination } from "antd";

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = true,
  pageSizeOptions = ["10", "20", "50"],
}) => {
  return (
    <div className="flex justify-center my-6">
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        pageSizeOptions={pageSizeOptions}
        showTotal={(total) => `Total ${total} items`}
      />
    </div>
  );
};

export default Pagination;
