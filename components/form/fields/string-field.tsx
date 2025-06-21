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
import { Lock } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  name: string; 
  control: Control<any>; 
  isReadOnly?: boolean;
  isOptional?: boolean;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
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
            {label} {isReadOnly ? <Lock className="w-4 h-4 inline" /> : ""}{" "}
            {isOptional ? "" : <FormStar />}
          </FormLabel>
          <FormControl>
            <Input
              className={cn(fieldState?.invalid && "border-red-500")}
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
