import { cn } from "@/lib/utils";
import type { Contact } from "@/types";
import type { ValidationErrors } from "@/types/validation";
import { validateForm } from "@/utils/validation";
import { useState } from "react";

export default function ContactForm({
  contactData,
}: {
  contactData: Contact[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTime = Date.now();
    const deltaSeconds = Math.floor((currentTime - lastSubmitTime) / 1000);

    if (deltaSeconds < 5 && lastSubmitTime > 0) {
      setMessage({
        type: "error",
        text: `Please wait ${5 - deltaSeconds} more seconds before submitting again.`,
      });
      return;
    }

    const formData = new FormData(e.currentTarget);

    const errors = validateForm(formData, deltaSeconds);

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);
    setMessage(null);

    formData.append("deltaSeconds", deltaSeconds.toString());

    const fullName = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const workerFormData = new FormData();
    workerFormData.append("fullName", fullName as string);
    workerFormData.append("email", email as string);
    workerFormData.append("message", message as string);
    workerFormData.append("deltaSeconds", deltaSeconds.toString());

    try {
      const response = await fetch(
        import.meta.env.PUBLIC_CLOUDFLARE_WORKER_URL,
        {
          method: "POST",
          body: workerFormData,
        },
      );

      if (response.ok) {
        setMessage({ type: "success", text: "Message sent successfully!" });
        setLastSubmitTime(currentTime);
        (e.target as HTMLFormElement).reset();
      } else {
        const errorText = await response.text();
        console.log("Response error:", errorText);
        setMessage({
          type: "error",
          text: errorText || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something happened. I am very sorry, I will check it as soon as I'll get report from server automatically.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <h2 className="text-4xl font-bold text-center mb-12">
        Let's Get In Touch
      </h2>
      <div className="max-w-lg mx-auto card hover:transform-none! !shadow-none border border-border bg-background-secondary! p-6 md:p-8 relative">
        {message && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center p-4">
            <div
              className={cn(
                "p-6 rounded-lg shadow-lg max-w-md w-full text-center",
                message.type === "success"
                  ? "bg-background-secondary text-foreground"
                  : "bg-background-secondary text-red-400",
              )}
            >
              <p className="text-lg font-medium mb-4">{message.text}</p>
              <button
                onClick={() => setMessage(null)}
                className="button-secondary px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                data-umami-event="contact-form-close-message"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <p className="text-center text-foreground mb-8">
          Have a project in mind, a question, or just want to say hi? Fill out
          the form below or reach out via my socials.
        </p>

        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Your Name"
                className={cn(
                  "w-full border bg-background text-foreground placeholder:text-foreground-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition",
                  validationErrors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-primary",
                )}
              />
              {validationErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.fullName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="you@example.com"
                className={cn(
                  "w-full border bg-background text-foreground placeholder:text-foreground-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition",
                  validationErrors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-primary",
                )}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                placeholder="Your message..."
                className={cn(
                  "w-full border bg-background text-foreground placeholder:text-foreground-muted rounded-md px-4 py-2 focus:outline-none focus:ring-2 transition",
                  validationErrors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-border focus:ring-primary",
                )}
              ></textarea>
              {validationErrors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.message}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary justify-center w-full text-lg disabled:opacity-70"
                data-umami-event="contact-form-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-10 text-center">
          <p className="text-foreground-muted mb-2">Or find me on:</p>
          <div className="flex justify-center space-x-4">
            {contactData &&
              contactData.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.hrefValue}
                  className="text-primary hover:text-primary-hover transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event={`contact-link-${contact.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {contact.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
