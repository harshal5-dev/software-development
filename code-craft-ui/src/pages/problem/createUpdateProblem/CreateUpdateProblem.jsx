import { toast } from "sonner";

import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { BsDatabaseFillDown } from "react-icons/bs";
import { useSelector } from "react-redux";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import Icon from "@/components/ui/icon.jsx";
import {
  useCreateProblemMutation,
  useGetProblemModeQuery,
  useGetProblemTypeQuery,
  useUpdateProblemMutation,
} from "@/pages/problem/problemApi.js";
import BaseProblemForm from "@/pages/problem/createUpdateProblem/BaseProblemForm.jsx";
import { useGetModuleQuery } from "@/pages/module/moduleApi.js";

const CreateUpdateProblem = () => {
  const navigate = useNavigate();
  const operation = useSelector((state) => state.problem.problemOperation);
  const selectedProblem = useSelector((state) => state.problem.selectedProblem);
  const { data: problemModes } = useGetProblemModeQuery();
  const { data: problemTypes } = useGetProblemTypeQuery();
  const { data: modules } = useGetModuleQuery();
  const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation();
  const [updateProblem, { isLoading: isUpdating }] = useUpdateProblemMutation();

  let title = "Create Problem";
  let description = "Create a new problem to the database.";
  let headerIcon = BsDatabaseFillAdd;
  let defaultValues = {
    problemNumber: "",
    name: "",
    description: "",
    constraints: "",
    problemModeId: "",
    problemTypeId: "",
    lectureId: "",
    moduleId: "",
  };

  if (operation === "Update") {
    title = "Update Problem";
    description = "Update an existing problem in the database.";
    headerIcon = BsDatabaseFillDown;
    defaultValues = {
      problemNumber: selectedProblem.problemNumber,
      name: selectedProblem.name,
      description: selectedProblem.description,
      constraints: selectedProblem.constraints,
      problemModeId: `${selectedProblem.problemModeId}`,
      problemTypeId: `${selectedProblem.problemTypeId}`,
      lectureId: `${selectedProblem.lectureId}`,
      moduleId: `${selectedProblem.moduleId}`,
    };
  }

  async function handleSubmit(data) {
    const payload = {
      ...data,
    };
    if (operation === "Create") {
      try {
        await createProblem(payload).unwrap();
        toast.success("Success", {
          description: "Problem created successfully!",
        });
        navigate("/problem");
      } catch {
        toast.error("Error", {
          description: "Unable to create problem. Please try again later!",
        });
      }
    } else {
      try {
        await updateProblem({ ...payload, id: selectedProblem.id }).unwrap();
        toast.success("Success", {
          description: "Problem updated successfully!",
        });
        navigate("/problem");
      } catch {
        toast.error("Error", {
          description: "Unable to update problem. Please try again later!",
        });
      }
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0">
        <div className="flex aspect-square size-12 mr-3 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon Icon={headerIcon} className="size-7" />
        </div>
        <div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        <Button
          className="ml-auto"
          onClick={() => navigate("/problem")}
          icon={IoChevronBackCircleSharp}
        >
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <BaseProblemForm
          defaultValues={defaultValues}
          problemModes={problemModes}
          problemTypes={problemTypes}
          modules={modules}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          selectedModuleId={selectedProblem?.moduleId}
        />
      </CardContent>
    </Card>
  );
};

export default CreateUpdateProblem;
