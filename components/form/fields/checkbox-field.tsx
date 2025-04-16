"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormStar } from "../form-star";
import { cn } from "@/lib/utils/cn";
import { Control } from "react-hook-form";

interface Props {
  label: string;
  name: string; // name of the field in the form
  // eslint-disable-next-line
  control: Control<any>; // form control from react-hook-form
  isOptional?: boolean;
  description?: string;
}

export function CheckboxField({
  label,
  name,
  control,
  isOptional = false,
  description,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                className={cn(
                  "border-black",
                  fieldState?.invalid && "border-red-500"
                )}
              />
              <FormLabel className="text-md" htmlFor={name}>
                {label} {isOptional ? "" : <FormStar />}
              </FormLabel>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
