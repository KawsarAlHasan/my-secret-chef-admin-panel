import { useState } from "react";
import { Table, Space, Image, Avatar } from "antd";
import { MdBlock } from "react-icons/md";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { EyeOutlined } from "@ant-design/icons";
import ViewUser from "./ViewUser";
import LiveSupportChat from "./liveSupportChat/LiveSupportChat";
import SavedRecipes from "./savedRecipes/SavedRecipes";
import PreviousScans from "./previousScans/PreviousScans";
import { useAllUser } from "../../api/api";

function UserManagement() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const [userDetailsData, setUserDetailsData] = useState(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [isChatModal, setIsChatModal] = useState(false);
  const [isPreviousScansModal, setIsPreviousScansModal] = useState(false);
  const [isSavedRecipesModal, setIsSavedRecipesModal] = useState(false);

  const { allUsers, isLoading, isError, error, refetch } = useAllUser(filter);

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleSeeChats = (userData) => {
    setUserDetailsData(userData);
    setIsChatModal(true);
  };

  const handlePreviousScans = (userData) => {
    setUserDetailsData(userData);
    setIsPreviousScansModal(true);
  };

  const handleSavedRecipes = (userData) => {
    setUserDetailsData(userData);
    setIsSavedRecipesModal(true);
  };

  const handleModalClose = () => {
    setUserDetailsData(null);

    setIsViewModalOpen(false);
    setIsChatModal(false);
    setIsPreviousScansModal(false);
    setIsSavedRecipesModal(false);
  };

  const handleTableChange = (pagination) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "id",
      key: "id",
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
            className="!w-[45px] !h-[45px] rounded-full mt-[-5px]"
          />
          <div className="mt-1">
            <h2>{record?.full_name}</h2>
            <p className="text-sm">{record?.email}</p>
          </div>
        </div>
      ),
    },
    
    {
      title: <span>Phone</span>,
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span>{phone}</span>,
    },
    {
      title: <span>Total Scan</span>,
      dataIndex: "total_scan",
      key: "total_scan",
      render: (total_scan) => <span>{total_scan}</span>,
    },
    {
      title: <span>Subscription</span>,
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => <span>{subscription}</span>,
    },
    {
      title: <span>Live Support Chat</span>,
      key: "see_chat",
      render: (_, record) => (
        <div
          onClick={() => handleSeeChats(record)}
          className="flex items-center text-black hover:text-gray-600 cursor-pointer gap-1 text-[16px]"
        >
          <span className="underline">See Chats</span>
          <EyeOutlined />
        </div>
      ),
    },
    {
      title: <span>Previous Scans</span>,
      key: "previous_scans",
      render: (_, record) => (
        <div
          onClick={() => handlePreviousScans(record)}
          className="flex items-center text-black hover:text-gray-600 cursor-pointer gap-1 text-[16px]"
        >
          <span className="underline">Previous Scans</span>
          <EyeOutlined />
        </div>
      ),
    },
    {
      title: <span>Saved Recipes</span>,
      key: "saved_recipes",
      render: (_, record) => (
        <div
          onClick={() => handleSavedRecipes(record)}
          className="flex items-center text-black hover:text-gray-600 cursor-pointer gap-1 text-[16px]"
        >
          <span className="underline">All Saved Recipes</span>
          <EyeOutlined />
        </div>
      ),
    },

    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <MdBlock
            className="text-[23px] text-red-400 hover:text-red-300 cursor-pointer"
            onClick={() => handleUserDetails(record)}
          />
        </Space>
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
        dataSource={allUsers.results}
        rowKey="id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allUsers.count,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />

      <ViewUser
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        refetch={refetch}
      />

      <LiveSupportChat
        userDetailsData={userDetailsData}
        isOpen={isChatModal}
        onClose={handleModalClose}
        userRefetch={refetch}
      />

      <PreviousScans
        userDetailsData={userDetailsData}
        isOpen={isPreviousScansModal}
        onClose={handleModalClose}
      />

      <SavedRecipes
        userDetailsData={userDetailsData}
        isOpen={isSavedRecipesModal}
        onClose={handleModalClose}
        userRefetch={refetch}
      />
    </div>
  );
}

export default UserManagement;
