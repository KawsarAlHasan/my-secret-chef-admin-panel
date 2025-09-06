import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";
import { usePreviousScans } from "../../../services/previousScanService";
import { MdOutlineDeleteForever } from "react-icons/md";
import SingleScan from "./SingleScan";

const { Title, Text } = Typography;
const { TextArea } = Input;

function PreviousScans({ userDetailsData, isOpen, onClose, userRefetch }) {
  const { previousScans, isLoading, isError, error, refetch } =
    usePreviousScans({
      enabled: isOpen,
    });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [singleScan, setSingleScan] = useState(null);

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

  const handleSingleScan = (id) => {
    setSingleScan(id);
    setIsViewModalOpen(true);
  };

  const handlePreviousScanDelete = (id) => {
    try {
      message.success(`${id} deleted successfully!`);
    } catch (error) {
      message.error("Failed to delete previous scan. Please try again.");
    }
  };

  return (
    <Modal
      title="Previous Scans"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <div className="max-h-[500px] overflow-y-auto">
        {previousScans.length > 0 ? (
          previousScans.map((scan) => (
            <div
              key={scan.id}
              className="flex justify-between items-center gap-2 mb-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSingleScan(scan.id)}
            >
              <img src={scan.image} alt="" className="w-[40px] h-[40px]" />
              <div>
                {new Date(scan.date).toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
              <div></div>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">
            No Previous Scans
          </div>
        )}
      </div>

      <SingleScan
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        singleScan={singleScan}
      />
    </Modal>
  );
}

export default PreviousScans;
