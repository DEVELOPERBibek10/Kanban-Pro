import z from "zod";

 export const formSchema = z.object({
  Project: z.string().min(5, {
    message: "Project's name must be at least 5 characters.",
  }),
  description:z.string().optional(),
  type: z.enum(
    [
      "IT Support",
      "Marketing",
      "Product Management",
      "Software Development",
      "Design",
      "Human Resource",
      "Customer Service",
      "Finance",
      "Sales",
      "Legal",
      "Data Science",
      "Other",
    ]
  ),
});

