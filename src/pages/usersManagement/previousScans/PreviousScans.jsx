import { useEffect, useState } from "react";
import { Modal } from "antd";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";
import SingleScan from "./SingleScan";
import { useUserScanHistory } from "../../../api/api";

function PreviousScans({ userDetailsData, isOpen, onClose, userRefetch }) {
  const { scanHistory, isLoading, isError, error, refetch } =
    useUserScanHistory({ userID: userDetailsData?.id }, { enabled: isOpen });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [singleScan, setSingleScan] = useState(null);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen]);

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  if (isLoading) {
    return <IsLoading />;
  }

  const handleSingleScan = (data) => {
    setSingleScan(data);
    setIsViewModalOpen(true);
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
        {scanHistory.length > 0 ? (
          scanHistory.map((scan) => (
            <div
              key={scan.id}
              className="flex justify-between items-center gap-2 mb-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSingleScan(scan?.scans_history)}
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
