import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { BsDatabaseFillDown } from "react-icons/bs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pick } from "@/lib/utils";
import Icon from "@/components/ui/icon";

import BaseModuleForm from "./BaseModuleForm";
import { useCreateModuleMutation, useUpdateModuleMutation } from "../moduleApi";

function CreateUpdateModule({
  dialogTriggerButton,
  operation = "Create",
  selectedModule,
}) {
  const [open, setOpen] = useState(false);
  const [createModule, { isLoading: isCreating }] = useCreateModuleMutation();
  const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation();

  let title = "Create Module";
  let description = "Create a new module to the database.";
  let headerIcon = BsDatabaseFillAdd;
  let defaultValues = {
    moduleNumber: "",
    name: "",
    description: "",
    shortDescription: "",
  };

  if (operation === "Update") {
    title = "Update Module";
    description = "Update an existing module in the database.";
    defaultValues = pick(selectedModule, [
      "name",
      "description",
      "moduleNumber",
      "shortDescription",
    ]);
    headerIcon = BsDatabaseFillDown;
  }

  const handleSubmit = async (values) => {
    if (operation === "Create") {
      try {
        await createModule(values).unwrap();
        toast.success("Success", {
          description: "Module created successfully!",
        });
        setOpen(false);
      } catch {
        toast.error("Error", {
          description: "Unable to create module. Please try again later!",
        });
      }
    } else {
      try {
        await updateModule({ id: selectedModule.id, ...values }).unwrap();
        toast.success("Success", {
          description: "Module updated successfully!",
        });
        setOpen(false);
      } catch {
        toast.error("Error", {
          description: "Unable to update module. Please try again later!",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{dialogTriggerButton}</DialogTrigger>
      <DialogContent className="max-w-[40%]">
        <DialogHeader className="flex flex-row">
          <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Icon Icon={headerIcon} className="size-7" />
          </div>
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <div>
          <BaseModuleForm
            defaultValues={defaultValues}
            isLoading={isCreating || isUpdating}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

CreateUpdateModule.propTypes = {
  dialogTriggerButton: PropTypes.element,
  operation: PropTypes.string,
  selectedModule: PropTypes.object,
  getAllModules: PropTypes.func,
};

export default CreateUpdateModule;
