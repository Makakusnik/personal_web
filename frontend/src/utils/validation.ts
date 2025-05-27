import type { ValidationErrors } from "@/types/validation";

export const validateForm = (
  formData: FormData,
  deltaSeconds: number,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const fullName = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!fullName || fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters long";
  }

  if (!email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (!message || message.length < 10) {
    errors.message = "Message must be at least 10 characters long";
  }

  if (typeof deltaSeconds !== "number" || isNaN(deltaSeconds)) {
    errors.message = errors.message || "Invalid submission timing";
  }

  return errors;
};
