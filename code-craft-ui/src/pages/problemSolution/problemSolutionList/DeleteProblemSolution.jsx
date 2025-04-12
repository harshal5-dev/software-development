import { Ban, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useDeleteProblemSolutionMutation } from "../problemSolutionApi";

const DeleteProblemSolution = ({ alertTrigger, problemSolutionId }) => {
  const [open, setOpen] = useState(false);
  const [deleteProblemSolution, { isLoading }] =
    useDeleteProblemSolutionMutation();

  async function handleDeleteProblemSolution() {
    try {
      await deleteProblemSolution(problemSolutionId).unwrap();
      toast.success("Success", {
        description: "Problem solution deleted successfully",
      });
      setOpen(false);
    } catch {
      toast.error("Error", {
        description:
          "Unable to delete problem solution. Please try again later!",
      });
    }
  }

  function handleOnConfirm() {
    handleDeleteProblemSolution();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{alertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Problem Solution</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this problem solution?
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

DeleteProblemSolution.propTypes = {
  alertTrigger: PropTypes.element,
  problemSolutionId: PropTypes.string,
};

export default DeleteProblemSolution;
