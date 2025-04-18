import { useFormStore } from "@/hooks/use-form-store";
import { ErrorAlert } from "../common/alerts";

export const FormError = () => {
  const error = useFormStore((state) => state.error);
  return <ErrorAlert message={error} />;
};
