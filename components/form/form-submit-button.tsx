import { ReactNode } from "react";
import { Button } from "../ui/button";
import { useFormStore } from "@/hooks/use-form-store";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const FormSubmitButton = ({ children, className, id }: Props) => {
  const loading = useFormStore((state) => state.loading);
  return (
    <Button
      id={id}
      loading={loading}
      type="submit"
      className={cn("w-full text-md", className)}
      size="lg"
    >
      {children}
    </Button>
  );
};
