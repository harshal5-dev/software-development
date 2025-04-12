import PropTypes from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileDigit, Save } from "lucide-react";
import { RxReset } from "react-icons/rx";
import { FaChalkboard } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { useGetLectureByModuleIdMutation } from "@/pages/lecture/lectureApi";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { useEffect } from "react";

function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  problemNumber: z.string().min(1, { message: "Problem number is required" }),
  name: z.string().min(1, { message: "Problem name is required" }),
  description: z
    .string()
    .min(10, { message: "Problem description is required" })
    .refine((value) => extractTextFromHTML(value).trim()),
  constraints: z
    .string()
    .min(10, { message: "Problem constraints are required" })
    .refine((value) => extractTextFromHTML(value).trim()),
  problemModeId: z.string().min(1, { message: "Problem mode is required" }),
  problemTypeId: z.string().min(1, { message: "Problem type is required" }),
  lectureId: z.string().min(1, { message: "Lecture is required" }),
});

const BaseProblemForm = ({
  defaultValues,
  onSubmit,
  isLoading,
  problemModes,
  problemTypes,
  modules,
  selectedModuleId,
}) => {
  const problemForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });
  const { setValue } = problemForm;
  const [getLectureByModuleId, { data: lectures }] =
    useGetLectureByModuleIdMutation();

  function handleModuleChange(moduleId) {
    setValue("moduleId", moduleId);
    setValue("lectureId", "");
    getLectureByModuleId({ moduleId });
  }

  useEffect(() => {
    if (selectedModuleId) {
      getLectureByModuleId({ moduleId: selectedModuleId });
    }
  }, [selectedModuleId, getLectureByModuleId]);

  return (
    <Form {...problemForm}>
      <form onSubmit={problemForm.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-row gap-7">
          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={problemForm.control}
              name="problemNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter problem number"
                      icon={FileDigit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemForm.control}
              name="problemModeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Problem Mode</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select a problem mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {problemModes?.map((problemMode) => (
                        <SelectItem
                          key={problemMode.id}
                          value={`${problemMode.id}`}
                        >
                          {problemMode.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemForm.control}
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
              control={problemForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Please enter Problem Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={problemForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter problem name"
                      icon={FaChalkboard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemForm.control}
              name="problemTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Problem Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="please select a problem type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {problemTypes?.map((problemType) => (
                        <SelectItem
                          key={problemType.id}
                          value={`${problemType.id}`}
                        >
                          {problemType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={problemForm.control}
              name="lectureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Lecture</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
              control={problemForm.control}
              name="constraints"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Please enter Problem Constraints</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="accent"
            onClick={problemForm.reset}
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

BaseProblemForm.propTypes = {
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
  problemModes: PropTypes.array,
  problemTypes: PropTypes.array,
  modules: PropTypes.array,
  selectedModuleId: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default BaseProblemForm;
