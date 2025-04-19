"use client";

import { ErrorAlert } from "@/components/common/alerts";
import { StringField } from "@/components/form/fields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useFormStore } from "@/hooks/use-form-store";
import {
  rateLimit_defaultErrorMessage,
  rateLimitExceeded,
} from "@/lib/security/ratelimit";
import server from "@/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required." }),
});

type FormSchema = z.infer<typeof formSchema>;

export const SignInForm = () => {
  const { error, loading, setError, setLoading } = useFormStore();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    if (rateLimitExceeded("SignIn")) {
      const rateLimitMessage = rateLimit_defaultErrorMessage("SignIn");
      setError(rateLimitMessage);
      return;
    }

    setError(undefined);
    setLoading(true);

    await server.auth.signIn();

    setLoading(false);
  };

  return (
    <>
      <ErrorAlert message={error} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-4">
            <StringField
              label="Email"
              placeholder="john.doe@example.com"
              name="email"
              control={form.control}
            />
            <StringField
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              control={form.control}
            />
          </div>
          <Button
            loading={loading}
            type="submit"
            className="w-full text-md"
            size="lg"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </>
  );
};
