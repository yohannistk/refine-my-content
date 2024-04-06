import { z } from "zod";

export const signUpSchema = z
  .object({
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            val
          ),
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
        }
      ),
    email: z
      .string()
      .min(1, { message: "Please enter your email" })
      .email({
        message: "Please enter a valid email address to proceed.",
      })
      .trim(),
    user_name: z
      .string()
      .min(1, {
        message: "Please enter username",
      })
      .trim(),
    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export const signInSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 8 characters long",
    })
    .trim(),
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({
      message: "Please enter a valid email address to proceed.",
    })
    .trim(),
});
export const contactUsSchema = z.object({
  subject: z
    .string()
    .min(1, {
      message: "Please enter your subject",
    })
    .trim(),
  message: z
    .string()
    .min(1, {
      message: "Please enter your message",
    })
    .trim(),
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({
      message: "Please enter a valid email address to proceed.",
    })
    .trim(),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({
      message: "Please enter a valid email address to proceed.",
    })
    .trim(),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .refine(
        (val) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            val
          ),
        {
          message:
            "Password must be at least 8 characters long and contain at least one uppercase character, one lowercase character, and one special symbol",
        }
      ),

    confirmPassword: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SignInDto = z.infer<typeof signInSchema>;
export type UpdatePasswordDto = z.infer<typeof updatePasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
export type ContactUsDto = z.infer<typeof contactUsSchema>;
export type SignUnDto = z.infer<typeof signUpSchema>;
