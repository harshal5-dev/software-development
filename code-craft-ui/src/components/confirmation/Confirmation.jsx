import { useState } from "react";
import { Ban, CircleCheck } from "lucide-react";
import PropTypes from "prop-types";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const Confirmation = ({
  alertTrigger = "Open",
  title,
  description,
  onConfirm,
  cancelText = "Cancel",
  confirmText = "Confirm",
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{alertTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2 mt-2">
          <Button
            icon={Ban}
            variant="destructive"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={() => onConfirm(setOpen)}
            isLoading={isLoading}
            disabled={isLoading}
            icon={CircleCheck}
            variant="secondary"
          >
            {confirmText}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

Confirmation.propTypes = {
  alertTrigger: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  isLoading: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default Confirmation;
