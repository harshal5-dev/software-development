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
import { useDeleteLectureMutation } from "../lectureApi";

const DeleteLecture = ({ lectureId, alertTrigger }) => {
  const [open, setOpen] = useState(false);
  const [deleteLecture, { isLoading }] = useDeleteLectureMutation();

  const handleDeleteModule = async () => {
    try {
      await deleteLecture(lectureId).unwrap();
      toast.success("Success", {
        description: "Lecture deleted successfully",
      });
      setOpen(false);
    } catch {
      toast.error("Error", {
        description: "Unable to delete lecture. Please try again later!",
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
          <AlertDialogTitle>Delete Lecture</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this lecture?
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

DeleteLecture.propTypes = {
  lectureId: PropTypes.number,
  alertTrigger: PropTypes.element,
};

export default DeleteLecture;
