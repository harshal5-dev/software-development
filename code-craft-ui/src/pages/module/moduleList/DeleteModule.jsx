import { useState } from "react";
import { Ban, CircleCheck } from "lucide-react";
import PropTypes from "prop-types";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteModuleMutation } from "../moduleApi";

const DeleteModule = ({ moduleId, alertTrigger }) => {
  const [open, setOpen] = useState(false);
  const [deleteModule, { isLoading }] = useDeleteModuleMutation();

  const handleDeleteModule = async () => {
    try {
      await deleteModule(moduleId).unwrap();
      toast.success("Success", {
        description: "Module deleted successfully",
      });
      setOpen(false);
    } catch {
      toast.error("Error", {
        description: "Unable to delete module. Please try again later!",
      });
    }
  };

  function handleOnConfirm() {
    handleDeleteModule();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{alertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Module</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this module?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            icon={Ban}
            variant="destructive"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleOnConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            icon={CircleCheck}
            variant="success"
          >
            Confirm
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

DeleteModule.propTypes = {
  moduleId: PropTypes.number,
  alertTrigger: PropTypes.element,
};

export default DeleteModule;
