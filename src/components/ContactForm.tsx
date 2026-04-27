"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  serviceOptions: string[];
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  serviceRequired: "",
  budget: "",
  message: ""
};

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Unable to submit enquiry");
      }

      setStatus("success");
      setStatusMessage("Thanks. Your enquiry has been received.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again or use the client area.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input
            required
            type="text"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
          />
        </label>
        <label>
          Email Address
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
        </label>
        <label>
          Service Required
          <select
            required
            value={form.serviceRequired}
            onChange={(event) => updateField("serviceRequired", event.target.value)}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Budget
          <input
            type="text"
            placeholder="Example: £200"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
          />
        </label>
      </div>
      <label>
        Message
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {statusMessage ? <p className={`form-status ${status}`}>{statusMessage}</p> : null}
    </form>
  );
}
