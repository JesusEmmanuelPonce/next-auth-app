"use server";

import { formSchema, RegisterFormValues } from "./register.schema";

export const registerAction = async (data: RegisterFormValues) => {
  const userValidation = formSchema.safeParse(data);

  if (!userValidation.success) {
    return {
      error: true,
      message: userValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }
};
