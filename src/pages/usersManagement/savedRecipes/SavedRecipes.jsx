import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";
import { useSavedRecipes } from "../../../services/recipesService";
import IsError from "../../../components/IsError";
import IsLoading from "../../../components/IsLoading";
import { MdOutlineDeleteForever } from "react-icons/md";
import StepsViewModal from "./StepsViewModal";

function SavedRecipes({ userDetailsData, isOpen, onClose, userRefetch }) {
  const { savedRecipesData, isLoading, isError, error, refetch } =
    useSavedRecipes({
      enabled: isOpen,
    });

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [singleRecipe, setSingleRecipe] = useState(null);

  if (isError) {
    return <IsError error={isError} refetch={refetch} />;
  }

  if (isLoading) {
    return <IsLoading />;
  }

  const handleSingleRecipe = (steps) => {
    setSingleRecipe(steps);
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
      title="Saved Recipes"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
    >
      <div className="max-h-[500px] overflow-y-auto">
        {savedRecipesData.length > 0 ? (
          savedRecipesData.map((scan) => (
            <div
              key={scan.id}
              className="flex items-center gap-2 mb-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => handleSingleRecipe(scan.steps)}
            >
              <img src={scan.image} alt="" className="w-[40px] h-[40px]" />
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
