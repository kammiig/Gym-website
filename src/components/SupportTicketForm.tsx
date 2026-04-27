"use client";

import { FormEvent, useState } from "react";

type SupportTicketFormProps = {
  departments: string[];
  priorities: string[];
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  department: "",
  priority: "Normal",
  subject: "",
  message: ""
};

export function SupportTicketForm({ departments, priorities }: SupportTicketFormProps) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [ticketId, setTicketId] = useState("");

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");
    setTicketId("");

    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to create ticket");
      }

      setStatus("success");
      setTicketId(result.ticketId);
      setStatusMessage(
        `Ticket ${result.ticketId} has been created. A confirmation email has been sent.`
      );
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or email support directly."
      );
    }
  }

  return (
    <form className="contact-form support-ticket-form" id="support-ticket-form" onSubmit={handleSubmit}>
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
          Department
          <select
            required
            value={form.department}
            onChange={(event) => updateField("department", event.target.value)}
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option value={department} key={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            required
            value={form.priority}
            onChange={(event) => updateField("priority", event.target.value)}
          >
            {priorities.map((priority) => (
              <option value={priority} key={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
        <label>
          Subject
          <input
            required
            type="text"
            value={form.subject}
            onChange={(event) => updateField("subject", event.target.value)}
          />
        </label>
      </div>
      <label>
        Message
        <textarea
          required
          rows={7}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
      </label>
      <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Creating Ticket..." : "Create Support Ticket"}
      </button>
      {statusMessage ? (
        <p className={`form-status ${status}`}>
          {statusMessage}
          {ticketId ? <span className="ticket-id">Reference: {ticketId}</span> : null}
        </p>
      ) : null}
    </form>
  );
}
