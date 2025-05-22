export default function ContactForm() {
  const handleSubmit = async () => {};

  return (
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
          className="input-field w-full border placeholder:text-foreground-muted border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
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
          className="input-field w-full border placeholder:text-foreground-muted border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
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
          className="input-field w-full border placeholder:text-foreground-muted border-border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="button-primary w-full text-lg disabled:opacity-70"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
