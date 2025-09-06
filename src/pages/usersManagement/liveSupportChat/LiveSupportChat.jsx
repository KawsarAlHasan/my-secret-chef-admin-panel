import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar } from "antd";
import { useUsersForMessage } from "../../../services/usersForMessage";
import { TbMessageChatbot } from "react-icons/tb";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";

const { Title, Text } = Typography;
const { TextArea } = Input;

function LiveSupportChat({ userDetailsData, isOpen, onClose, userRefetch }) {
  const { usersForMessage, isLoading, isError, refetch } = useUsersForMessage({
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  if (isError) {
    return <IsError error={isError} refetch={refetch} />;
  }

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <Modal
      title={false}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={700}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <Avatar src={userDetailsData?.profile} size={48} />
        <div style={{ marginLeft: 10 }}>
          <Title level={5} style={{ margin: 0 }}>
            {userDetailsData?.full_name}
          </Title>
          <Text type="secondary">{userDetailsData?.email}</Text>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          background: "#fafafa",
          padding: 10,
          borderRadius: 8,
        }}
      >
        {usersForMessage?.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end",
              marginBottom: 10,
            }}
          >
            <div className="flex items-center gap-1">
              {msg.sender == "bot" && (
                <Avatar
                  className="mt-4"
                  size={40}
                  src={userDetailsData?.profile}
                />
              )}

              <div className="flex flex-col max-w-72">
                <span
                  className={`text-xs text-gray-400 ${
                    msg.sender === "bot" ? "self-start" : "self-end"
                  }`}
                >
                  {new Date(msg.date).toLocaleTimeString()}
                </span>
                <div
                  className={`px-3 py-2 rounded-xl ${
                    msg.sender === "bot"
                      ? "bg-blue-50 text-black self-start"
                      : "bg-green-500 text-white self-end"
                  }`}
                >
                  {msg.message}
                </div>
              </div>

              {msg.sender !== "bot" && (
                <Avatar
                  className="mt-4"
                  size={40}
                  icon={<TbMessageChatbot />}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default LiveSupportChat;
