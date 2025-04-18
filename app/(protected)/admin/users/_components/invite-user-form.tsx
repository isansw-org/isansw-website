"use client";

import { ErrorAlert } from "@/components/common/alerts";
import { FormSubmitButton } from "@/components/form";
import { StringField } from "@/components/form/fields";
import { FormError } from "@/components/form/form-error";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormStore } from "@/hooks/use-form-store";
import { useOpenCloseStore } from "@/hooks/use-openclose-store";
import {
  rateLimit_defaultErrorMessage,
  rateLimitExceeded,
} from "@/lib/security/ratelimit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email(),
});

type FormSchema = z.infer<typeof formSchema>;

export function InviteUserForm() {
  const { setError, setLoading } = useFormStore();
  const closeDialog = useOpenCloseStore((state) => state.close);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (rateLimitExceeded("InviteUser")) {
      const rateLimitMessage = rateLimit_defaultErrorMessage("InviteUser");
      setError(rateLimitMessage);
      return;
    }

    setError(undefined);
    setLoading(true);

    // action

    setLoading(false);
    closeDialog();
  };

  return (
    <>
      <FormError />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-4">
            <StringField
              label="Full name"
              placeholder="John Doe"
              name="fullName"
              control={form.control}
            />
            <StringField
              label="Email"
              placeholder="john.doe@example.com"
              name="email"
              control={form.control}
            />
          </div>
          <FormSubmitButton>Send Invitation</FormSubmitButton>
        </form>
      </Form>
    </>
  );
}
