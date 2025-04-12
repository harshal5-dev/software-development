import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, FileDigit, Save } from "lucide-react";
import { RxReset } from "react-icons/rx";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  moduleNumber: z.string().min(1, { message: "Module number is required" }),
  name: z.string().min(1, { message: "Module name is required" }),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
});

const BaseModuleForm = ({ defaultValues, isLoading, onSubmit }) => {
  const addModuleForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <Form {...addModuleForm}>
      <form
        onSubmit={addModuleForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={addModuleForm.control}
          name="moduleNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Number</FormLabel>
              <FormControl>
                <Input
                  isLoading={isLoading}
                  placeholder="enter module number"
                  icon={FileDigit}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addModuleForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter module name"
                  icon={Box}
                  isLoading={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addModuleForm.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Short Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter module short description"
                  icon={Box}
                  isLoading={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addModuleForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="enter module description"
                  className="resize-none"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="accent"
            onClick={addModuleForm.reset}
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

BaseModuleForm.propTypes = {
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default BaseModuleForm;
