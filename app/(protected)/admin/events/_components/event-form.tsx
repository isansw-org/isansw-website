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

const eventFormSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase and can include hyphens"),
  date: z.string().min(1, "Event date is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"), 
});

type EventFormSchema = z.infer<typeof eventFormSchema>;

export default function EventForm() {
  const { setError, setLoading } = useFormStore();

  const form = useForm<EventFormSchema>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      date: "",
      location: "",
      description: "", 
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Form values:", value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = async (data: EventFormSchema) => {
    setError(undefined);
    setLoading(true);

    console.log("Form submitted:", data);

    setTimeout(() => {
      setLoading(false);
      toast.success("Event created");
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
            label="Event Name"
            name="name"
            placeholder="e.g. Domienator"
            control={form.control}
          /> 
          <StringField
            label="Event Date"
            name="date"
            type="date"
            placeholder="Select a date"
            control={form.control}
          />
          <StringField
            label="Location"
            name="location"
            placeholder="e.g. Darling Harbour"
            control={form.control}
          />
          <StringField
            label="Description"
            name="description"
            placeholder="Enter event description" 
            control={form.control}
          />
          <StringField
            label="Slug"
            name="slug"
            placeholder="e.g. domienator-2025"
            control={form.control}
          />
          <FormSubmitButton>Create Event</FormSubmitButton>
        </form>
      </Form>
    </>
  );
}