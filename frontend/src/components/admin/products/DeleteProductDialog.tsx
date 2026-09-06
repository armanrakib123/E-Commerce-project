import React from "react";
import { Dialog } from "@/components/ui/dialog";

interface DeleteProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
  isLoading?: boolean;
}

export function DeleteProductDialog({
  isOpen,
  onClose,
  onConfirm,
  productName,
  isLoading,
}: DeleteProductDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete Product"
      description={`Are you sure you want to delete "${productName}"? This action cannot be undone.`}
      confirmText="Delete Product"
      variant="danger"
      isLoading={isLoading}
    />
  );
}
