import { cn } from "@/lib/utils/cn";

type CenterProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const Center = ({ children, className, id }: CenterProps) => {
  return (
    <div
      id={id}
      className={cn("flex justify-center items-center min-h-screen", className)}
    >
      {children}
    </div>
  );
};
