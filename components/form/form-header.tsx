import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

type Props = {
  className?: string;
  id?: string;
  title: string;
  description: string;
};

export const FormHeader = ({ title, description, className, id }: Props) => {
  return (
    <div className="space-y-2">
      <h2 id={id} className={cn("text-3xl font-bold", className)}>
        {title}
      </h2>
      <p className="text-lg text-muted-foreground">{description}</p>
    </div>
  );
};
