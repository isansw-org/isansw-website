import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export const FormSection = ({ children, className, id }: Props) => {
  return (
    <section
      id={id}
      className={cn("p-8 border-2 shadow-lg rounded-lg", className)}
    >
      {children}
    </section>
  );
};
