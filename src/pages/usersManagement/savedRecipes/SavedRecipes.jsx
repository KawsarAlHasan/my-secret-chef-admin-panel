import { useState } from "react";
import { Modal } from "antd";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";
import StepsViewModal from "./StepsViewModal";
import { useUserSavedRecipes } from "../../../api/api";

function SavedRecipes({ userDetailsData, isOpen, onClose, userRefetch }) {
  const { savedRecipes, isLoading, isError, error, refetch } =
    useUserSavedRecipes({ userID: userDetailsData?.id }, { enabled: isOpen });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState(null);

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  if (isLoading) {
    return <IsLoading />;
  }

  const handleSingleRecipe = (steps) => {
    setSingleRecipe(steps);
    setIsViewModalOpen(true);
  };

  return (
    <Modal
      title="Saved Recipes"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <div className="max-h-[500px] overflow-y-auto">
        {savedRecipes.length > 0 ? (
          savedRecipes.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center gap-2 mb-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSingleRecipe(scan.steps)}
            >
              <img
                src={scan.image}
                alt={scan.name}
                className="w-[40px] h-[40px]"
              />
              <p className="text-[16px] font-semibold">{scan.name}</p>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">
            No Saved Recipes
          </div>
        )}
      </div>

      <StepsViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        singleRecipe={singleRecipe}
      />
    </Modal>
  );
}

export default SavedRecipes;
