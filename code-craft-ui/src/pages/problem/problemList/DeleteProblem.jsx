import { useState } from "react";
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
import { Ban, CircleCheck } from "lucide-react";
import { useDeleteProblemMutation } from "../problemApi";

const DeleteProblem = ({ alertTrigger, problemId }) => {
  const [open, setOpen] = useState(false);
  const [deleteProblem, { isLoading }] = useDeleteProblemMutation();

  const handleDeleteProblem = async () => {
    try {
      await deleteProblem(problemId).unwrap();
      toast.success("Success", {
        description: "Problem deleted successfully",
      });
      setOpen(false);
    } catch {
      toast.error("Error", {
        description: "Unable to delete problem. Please try again later!",
      });
    }
  };

  function handleOnConfirm() {
    handleDeleteProblem();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{alertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Problem</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this problem?
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

DeleteProblem.propTypes = {
  problemId: PropTypes.number,
  alertTrigger: PropTypes.element,
};

export default DeleteProblem;
