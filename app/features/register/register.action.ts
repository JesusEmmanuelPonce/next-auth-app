"use server";

import db from "@/db/drizzle";
import { hash } from "bcryptjs";
import { formSchema, RegisterFormValues } from "./register.schema";
import { users } from "@/db/userSchema";

export const registerAction = async (data: RegisterFormValues) => {
  const userValidation = formSchema.safeParse(data);

  if (!userValidation.success) {
    return {
      error: true,
      message: userValidation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  const hashPassword = await hash(data.password, 10);

  await db.insert(users).values({
    email: data.email,
    password: hashPassword,
  });
};
