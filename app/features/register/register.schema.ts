import z from "zod";

export const formSchema = z
  .object({
    email: z.email(),
    password: z.string().min(5, "Password must contain at least 5 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

export type RegisterFormValues = z.infer<typeof formSchema>;
