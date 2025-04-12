import { BsDatabaseFillAdd } from "react-icons/bs";
import { BsDatabaseFillDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IoChevronBackCircleSharp } from "react-icons/io5";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import BaseLectureForm from "./BaseLectureForm";
import { useGetModuleQuery } from "@/pages/module/moduleApi";
import {
  useCreateLectureMutation,
  useUpdateLectureMutation,
} from "../lectureApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreateUpdateLecture = () => {
  const moduleResponse = useGetModuleQuery();
  const [createLecture, { isLoading: isCreating }] = useCreateLectureMutation();
  const [updateLecture, { isLoading: isUpdating }] = useUpdateLectureMutation();
  const { data: modules } = moduleResponse;
  const operation = useSelector((state) => state.lecture.lectureOperation);
  const navigate = useNavigate();
  const selectedLecture = useSelector((state) => state.lecture.selectedLecture);

  let title = "Create Lecture";
  let description = "Create a new lecture to the database.";
  let headerIcon = BsDatabaseFillAdd;
  let defaultValues = {
    lectureNumber: "",
    name: "",
    description: "",
    moduleId: "",
    notes: "",
  };

  if (operation === "Update") {
    title = "Update Lecture";
    description = "Update an existing lecture in the database.";
    headerIcon = BsDatabaseFillDown;
    defaultValues = {
      lectureNumber: selectedLecture.lectureNumber,
      name: selectedLecture.name,
      description: selectedLecture.description,
      moduleId: `${selectedLecture.moduleId}`,
      notes: selectedLecture.notes,
    };
  }

  const handleSubmit = async (values, fileInfo) => {
    if (!fileInfo) {
      return toast.error("Error", {
        description: "Please upload a file for the lecture.",
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
        await createLecture(payload).unwrap();
        toast.success("Success", {
          description: "Lecture created successfully!",
        });
        navigate("/lecture");
      } catch {
        toast.error("Error", {
          description: "Unable to create lecture. Please try again later!",
        });
      }
    } else {
      try {
        await updateLecture({ ...payload, id: selectedLecture.id }).unwrap();
        toast.success("Success", {
          description: "Lecture updated successfully!",
        });
        navigate("/lecture");
      } catch {
        toast.error("Error", {
          description: "Unable to update lecture. Please try again later!",
        });
      }
    }
  };

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
          onClick={() => navigate("/lecture")}
          icon={IoChevronBackCircleSharp}
        >
          Back
        </Button>
      </CardHeader>
      <CardContent>
        <BaseLectureForm
          defaultValues={defaultValues}
          modules={modules}
          onSubmit={handleSubmit}
          isLoading={isCreating || isUpdating}
          fileInfo={selectedLecture?.fileInfo}
        />
      </CardContent>
    </Card>
  );
};

export default CreateUpdateLecture;
