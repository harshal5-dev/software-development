import DisplayFileTable from "@/components/displayFileTable/DisplayFileTable";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetLectureByModuleIdMutation } from "@/pages/lecture/lectureApi";
import { useGetProblemsByLectureIdMutation } from "@/pages/problem/problemApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileDigit, Save } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaChalkboard, FaFilePdf } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { RxReset } from "react-icons/rx";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  problemSolutionNumber: z
    .string()
    .min(1, { message: "Problem Solution number is required" }),
  name: z.string().min(1, { message: "Problem Solution name is required" }),
  description: z.string().optional(),
  timeComplexity: z.string().min(1, { message: "Time complexity is required" }),
  spaceComplexity: z
    .string()
    .min(1, { message: "Space complexity is required" }),
  problemId: z.string().min(1, { message: "Problem is required" }),
});

const BaseProblemSolutionForm = ({
  defaultValues,
  modules,
  onSubmit,
  fileInfo,
  isLoading,
  selectedModuleId,
  selectedLectureId,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileData, setFileData] = useState(() => (fileInfo ? [fileInfo] : []));

  const problemSolutionForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });
  const { setValue } = problemSolutionForm;

  const [getLectureByModuleId, { data: lectures }] =
    useGetLectureByModuleIdMutation();

  const [getProblemsByLectureId, { data: problems }] =
    useGetProblemsByLectureIdMutation();

  function handleModuleChange(moduleId) {
    setValue("moduleId", moduleId);
    setValue("lectureId", "");
    getLectureByModuleId({ moduleId });
  }

  function handleLectureChange(lectureId) {
    setValue("lectureId", lectureId);
    setValue("problemId", "");
    getProblemsByLectureId({ lectureId });
  }

  const handleFileChange = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    setIsFileUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/api/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("File uploaded successfully!");

        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        const data = await response.json();
        setFileData([data]);
      } else {
        toast.error("File upload failed!");
      }
    } catch {
      toast.error("File upload failed!");
    } finally {
      setIsFileUploading(false);
    }
  };

  const handleDeleteFile = () => {
    setFileData([]);
  };

  useEffect(() => {
    if (selectedModuleId) {
      getLectureByModuleId({ moduleId: selectedModuleId });
    }
  }, [selectedModuleId, getLectureByModuleId]);

  useEffect(() => {
    if (selectedLectureId) {
      getProblemsByLectureId({ lectureId: selectedLectureId });
    }
  }, [selectedLectureId, getProblemsByLectureId]);

  return (
    <Form {...problemSolutionForm}>
      <form
        onSubmit={problemSolutionForm.handleSubmit((values) =>
          onSubmit(values, fileData.at(0))
        )}
        className="space-y-8"
      >
        <div className="flex flex-row gap-7">
          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={problemSolutionForm.control}
              name="problemSolutionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Solution Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter problem solution number"
                      icon={FileDigit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="timeComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Complexity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter time complexity"
                      icon={FaChalkboard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Module</FormLabel>
                  <Select
                    onValueChange={handleModuleChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select a module" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modules?.map((module) => (
                        <SelectItem key={module.id} value={`${module.id}`}>
                          {module.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="problemId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Problem</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select a problem" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {problems?.map((problem) => (
                        <SelectItem key={problem.id} value={`${problem.id}`}>
                          {problem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={problemSolutionForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Solution Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter problem solution name"
                      icon={FaChalkboard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="spaceComplexity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Complexity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter space complexity"
                      icon={FaChalkboard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="lectureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Lecture</FormLabel>
                  <Select
                    onValueChange={handleLectureChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select a lecture" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lectures?.map((lecture) => (
                        <SelectItem key={lecture.id} value={`${lecture.id}`}>
                          {lecture.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemSolutionForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row w-1/2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lectureNotes">Upload Problem Solution</Label>
            <div className="flex flex-row gap-4">
              <Input
                id="lectureNotes"
                icon={FaFilePdf}
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                isLoading={isFileUploading}
              />
              <Button
                icon={MdCloudUpload}
                variant="secondary"
                onClick={handleUpload}
                type="button"
                isLoading={isFileUploading}
                disabled={isFileUploading}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
        <div>
          <DisplayFileTable data={fileData} onDelete={handleDeleteFile} />
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="accent"
            onClick={problemSolutionForm.reset}
            disabled={isLoading}
            icon={RxReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            icon={Save}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

BaseProblemSolutionForm.propTypes = {
  defaultValues: PropTypes.object,
  modules: PropTypes.array,
  fileInfo: PropTypes.object,
  isLoading: PropTypes.bool,
  selectedModuleId: PropTypes.number,
  selectedLectureId: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default BaseProblemSolutionForm;
