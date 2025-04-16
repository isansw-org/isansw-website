"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { Control } from "react-hook-form";
import { FormStar } from "../form-star";

interface Props {
  label: string;
  placeholder: string;
  name: string; // name of the field in the form
  // eslint-disable-next-line
  control: Control<any>; // form control from react-hook-form
  isReadOnly?: boolean;
  isOptional?: boolean;
  description?: string;
  type?: "text" | "password";
}

export function StringField({
  label,
  placeholder,
  name,
  control,
  isReadOnly = false,
  isOptional = false,
  description,
  type = "text",
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-md">
            {label} {isOptional ? "" : <FormStar />}
          </FormLabel>
          <FormControl>
            <Input
              className={cn(
                "border-black",
                fieldState?.invalid && "border-red-500"
              )}
              placeholder={placeholder}
              readOnly={isReadOnly}
              type={type}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
