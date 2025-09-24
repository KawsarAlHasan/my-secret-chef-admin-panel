import { useState } from "react";
import { Avatar, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { usePayouts } from "../../api/api";

function Payments() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { payouts, isLoading, isError, error, refetch } = usePayouts(filter);

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span>SL No.</span>,
      dataIndex: "date",
      key: "date",
      render: (text, record, index) => (
        <span className="">
          #{index + 1 + (filter.page - 1) * filter.limit}
        </span>
      ),
    },
    {
      title: <span>User</span>,
      dataIndex: "id",
      key: "id",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Avatar
            src={record?.profile}
            alt={record?.full_name}
            className="!w-[40px] !h-[40px] rounded-full mt-[-5px]"
          />

          <div className="mt-1">
            <h2>{record?.full_name}</h2>
            <p className="text-sm">{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: <span>Payments</span>,
      dataIndex: "pay_amout",
      key: "pay_amout",
      render: (pay_amout) => <span className="">${pay_amout}</span>,
    },
    {
      title: <span>date</span>,
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <span className="">{new Date(date).toLocaleString()}</span>
      ),
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={payouts?.results}
        rowKey="date"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: payouts.count,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />
    </div>
  );
}

export default Payments;
