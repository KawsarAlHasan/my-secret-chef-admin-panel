import { Modal } from "antd";

function SingleScan({ isOpen, onClose, singleScan }) {
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
        {singleScan?.length > 0 ? (
          singleScan?.map((scan) => (
            <div
              key={scan.id}
              className="flex  items-center gap-2 mb-2 border p-2 rounded-md hover:bg-gray-100"
            >
              <img src={scan.image} alt="" className="w-[40px] h-[40px]" />
              <div>{scan.name}</div>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">No Scans</div>
        )}
      </div>
    </Modal>
  );
}

export default SingleScan;
