import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";
import { useSingleScans } from "../../../services/singleScanServices";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";

const { Title, Text } = Typography;
const { TextArea } = Input;

function SingleScan({ isOpen, onClose, singleScan }) {
  const { singleScans, isLoading, isError, error, refetch } = useSingleScans({
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
      title="Scans History"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={450}
    >
      <div className="max-h-[400px] overflow-y-auto">
        {singleScans.length > 0 ? (
          singleScans.map((scan) => (
            <div
              key={scan.id}
              className="flex  items-center gap-2 mb-2 border p-2 rounded-md hover:bg-gray-100"
            >
              <img src={scan.image} alt="" className="w-[40px] h-[40px]" />
              <div>
                {scan.name}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">
            No Scans
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SingleScan;
