import { Modal } from "antd";

function StepsViewModal({ isOpen, onClose, singleRecipe }) {
  return (
    <Modal
      title="Cooking Steps"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={450}
    >
      <div className="max-h-[400px] overflow-y-auto">
        {singleRecipe?.length > 0 ? (
          singleRecipe.map((recipe, index) => (
            <div
              key={index}
              className=" gap-2 mb-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <h1 className="text-lg">{recipe.step}</h1>
              <p>{recipe.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">
            No Cooking Steps
          </div>
        )}
      </div>
    </Modal>
  );
}

export default StepsViewModal;
