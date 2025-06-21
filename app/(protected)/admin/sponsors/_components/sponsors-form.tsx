"use client";

import { FormError, FormSubmitButton } from "@/components/form";
import { StringField } from "@/components/form/fields";
import { Form } from "@/components/ui/form";
import { useFormStore } from "@/hooks/use-form-store";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const sponsorFormSchema = z.object({
  name: z.string().min(1, "Sponsor name is required"),
  category: z.string().min(1, "Category is required"),
  discount: z.string().min(1, "Discount offer is required"),
  benefit: z.string().min(1, "Redemption instructions are required"),
  logoUrl: z.string().url("Valid URL required").optional(),
});

type SponsorFormSchema = z.infer<typeof sponsorFormSchema>;

export default function SponsorForm() {
  const { setError, setLoading } = useFormStore();

  const form = useForm<SponsorFormSchema>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      name: "",
      category: "",
      discount: "",
      benefit: "",
      logoUrl: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values:", value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: SponsorFormSchema) => {
    setError(undefined);
    setLoading(true);

    console.log("Form submitted:", data);

    setTimeout(() => {
      setLoading(false);
      toast.success("Sponsor added");
    }, 800);
  };

  return (
    <>
      <FormError />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-xl bg-muted/10 p-6 rounded-xl shadow-md"
        >
          <StringField
            label="Sponsor Name"
            name="name"
            placeholder="e.g. Warung Indo"
            control={form.control}
          />
          <StringField
            label="Category"
            name="category"
            placeholder="e.g. Travel, Food, etc."
            control={form.control}
          />
          <StringField
            label="Discount Offer"
            name="discount"
            placeholder="e.g. All foods are 10% off"
            control={form.control}
          />
          <StringField
            label="Redemption Instructions"
            name="benefit"
            placeholder="How to claim the discount"
            control={form.control}
          />
          <StringField
            label="Logo URL"
            name="logoUrl"
            placeholder="https://example.com/logo.png"
            control={form.control}
          />
          <FormSubmitButton>Add Sponsor</FormSubmitButton>
        </form>
      </Form>
    </>
  );
}