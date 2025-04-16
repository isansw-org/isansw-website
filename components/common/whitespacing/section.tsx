import { cn } from "@/lib/utils/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const Section = ({ children, className, id }: SectionProps) => {
  return (
    <section className={cn("py-6 md:py-10", className)} id={id}>
      {children}
    </section>
  );
};
