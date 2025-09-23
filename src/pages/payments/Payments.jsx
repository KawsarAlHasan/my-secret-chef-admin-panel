import { useState } from "react";
import { Table } from "antd";
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
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="">{email}</span>,
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
