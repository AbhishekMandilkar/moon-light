"use client";
import React, { useContext } from "react";
import { getTaskFilterFields } from "../utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TasksDispatchContext } from "../context/TasksContext";
import { TaskDispatchAction } from "../useTaskDashboard";

const FormSchema = z.object({
  status: z.string().optional(),
  priority: z.string().optional(),
});

function TaskFilters() {
  const dispatch = useContext(TasksDispatchContext);
  const taskFilters = getTaskFilterFields();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onChange = (field: keyof z.infer<typeof FormSchema>, value: string) => {
    form.setValue(field, value);
    dispatch?.({
        type: TaskDispatchAction.UPDATE_FILTERS,
        payload: {
            [field]: value,
        },
    });
  };

  return (
    <Form {...form}>
      <form
      //   onSubmit={form.handleSubmit(onSubmit)}
      // className="w-2/3 space-y-6"
      >
        <div className="flex">
          {taskFilters.map((filter) => (
            <FormItem key={filter.key} className="ml-2">
              <FormLabel>{filter.label}</FormLabel>
              <Select onValueChange={(value) => onChange(filter.key, value)}>
                <FormControl>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue
                      placeholder={`Filter by ${filter.label} `}
                      className="placeholder:text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          ))}
        </div>
      </form>
    </Form>
  );
}

export default TaskFilters;

