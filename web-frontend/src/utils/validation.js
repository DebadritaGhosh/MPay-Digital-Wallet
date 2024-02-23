import * as Yup from "yup";

const passwordValidation = Yup.string().min(8, "Password must be at least 8 characters");
const emailValidation = Yup.string().email("Invalid email");

export const registrationSchema = Yup.object({
  name: Yup.string(),
  email: emailValidation,
  phone: Yup.string(),
  password: passwordValidation
});

export const loginSchema = Yup.object({
  email: emailValidation,
  password: passwordValidation
});
