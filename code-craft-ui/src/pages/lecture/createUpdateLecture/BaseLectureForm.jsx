import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaChalkboard } from "react-icons/fa";
import { FileDigit, Save } from "lucide-react";
import { RxReset } from "react-icons/rx";
import { MdCloudUpload } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/richTextEditor/RichTextEditor";
import { Label } from "@/components/ui/label";
import DisplayFileTable from "@/components/displayFileTable/DisplayFileTable";
import { useRef, useState } from "react";
import { toast } from "sonner";

function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent?.trim() || "";
}

const formSchema = z.object({
  lectureNumber: z.string().min(1, { message: "Lecture number is required" }),
  name: z.string().min(1, { message: "Lecture name is required" }),
  description: z.string().optional(),
  moduleId: z.string().min(1, { message: "Module is required" }),
  notes: z
    .string()
    .refine((value) => extractTextFromHTML(value).trim())
    .optional(),
});

const BaseLectureForm = ({
  defaultValues,
  onSubmit,
  modules,
  isLoading,
  fileInfo,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileData, setFileData] = useState(() => (fileInfo ? [fileInfo] : []));

  const addLectureForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

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
      const response = await fetch("http://localhost:4174/api/file/upload", {
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

  return (
    <Form {...addLectureForm}>
      <form
        onSubmit={addLectureForm.handleSubmit((values) =>
          onSubmit(values, fileData.at(0))
        )}
        className="space-y-8"
      >
        <div className="flex flex-row gap-7">
          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={addLectureForm.control}
              name="lectureNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecture Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter lecture number"
                      icon={FileDigit}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addLectureForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecture Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="enter lecture description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5 w-1/2">
            <FormField
              control={addLectureForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lecture Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter lecture name"
                      icon={FaChalkboard}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={addLectureForm.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Module</FormLabel>
                  <Select
                    onValueChange={field.onChange}
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
          </div>
        </div>
        <div className="flex flex-row">
          <FormField
            control={addLectureForm.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Please enter lecture notes</FormLabel>
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
        <div className="flex flex-row w-1/2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="lectureNotes">Upload Lecture Notes</Label>
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
            onClick={addLectureForm.reset}
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

BaseLectureForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func,
  modules: PropTypes.array,
  isLoading: PropTypes.bool,
  fileInfo: PropTypes.object,
};

export default BaseLectureForm;
