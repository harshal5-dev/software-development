import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { BsDatabaseFillAdd, BsDatabaseFillDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BaseProblemSolutionForm from "./BaseProblemSolutionForm";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { useGetModuleQuery } from "@/pages/module/moduleApi";
import { toast } from "sonner";
import {
  useCreateProblemSolutionMutation,
  useUpdateProblemSolutionMutation,
} from "../problemSolutionApi";

const CreateUpdateProblemSolution = () => {
  const operation = useSelector(
    (state) => state.problemSolution.problemSolutionOperation
  );
  const selectedProblemSolution = useSelector(
    (state) => state.problemSolution.selectedProblemSolution
  );
  const navigate = useNavigate();

  let title = "Create Problem Solution";
  let description = "Create a new problem solution to the database.";
  let headerIcon = BsDatabaseFillAdd;
  let defaultValues = {
    problemSolutionNumber: "",
    name: "",
    description: "",
    timeComplexity: "",
    spaceComplexity: "",
    problemId: "",
    moduleId: "",
    lectureId: "",
  };

  if (operation === "Update") {
    title = "Update Problem Solution";
    description = "Update an existing problem solution in the database.";
    headerIcon = BsDatabaseFillDown;
    defaultValues = {
      problemSolutionNumber: selectedProblemSolution.problemSolutionNumber,
      name: selectedProblemSolution.name,
      description: selectedProblemSolution.description,
      timeComplexity: selectedProblemSolution.timeComplexity,
      spaceComplexity: selectedProblemSolution.spaceComplexity,
      problemId: `${selectedProblemSolution.problemId}`,
      moduleId: `${selectedProblemSolution.moduleId}`,
      lectureId: `${selectedProblemSolution.lectureId}`,
    };
  }

  const { data: modules } = useGetModuleQuery();
  const [createProblemSolution, { isLoading: isCreating }] =
    useCreateProblemSolutionMutation();
  const [updateProblemSolution, { isLoading: isUpdating }] =
    useUpdateProblemSolutionMutation();

  async function handleSubmit(values, fileInfo) {
    if (!fileInfo) {
      return toast.error("Error", {
        description: "Please upload a file for the problem solution.",
      });
    }

    const payload = {
      ...values,
      fileName: fileInfo.name,
      fileOriginalName: fileInfo.originalName,
      contentType: fileInfo.contentType,
      size: fileInfo.size,
      url: fileInfo.url,
    };

    if (operation === "Create") {
      try {
        await createProblemSolution(payload).unwrap();
        toast.success("Success", {
          description: "Problem Solution created successfully!",
        });
        navigate("/problem-solution");
      } catch {
        toast.error("Error", {
          description:
            "Unable to create problem solution. Please try again later!",
        });
      }
    } else {
      try {
        await updateProblemSolution({
          ...payload,
          id: selectedProblemSolution.id,
        }).unwrap();
        toast.success("Success", {
          description: "Problem Solution updated successfully!",
        });
        navigate("/problem-solution");
      } catch {
        toast.error("Error", {
          description:
            "Unable to update problem solution. Please try again later!",
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
          onClick={() => navigate("/problem-solution")}
          icon={IoChevronBackCircleSharp}
        >
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <BaseProblemSolutionForm
          defaultValues={defaultValues}
          modules={modules}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          selectedModuleId={selectedProblemSolution?.moduleId}
          selectedLectureId={selectedProblemSolution?.lectureId}
          fileInfo={selectedProblemSolution?.fileInfo}
        />
      </CardContent>
    </Card>
  );
};

export default CreateUpdateProblemSolution;
