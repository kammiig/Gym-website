"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type SupportTicketFormProps = {
  departments: string[];
  priorities: string[];
};

type PortalUser = {
  fullName: string;
  email: string;
  phone: string;
};

type RecentTicket = {
  ticketId: string;
  subject: string;
  department: string;
  createdAt: string;
};

const initialLogin = {
  fullName: "",
  email: "",
  phone: ""
};

const initialTicket = {
  department: "",
  priority: "Normal",
  serviceReference: "",
  subject: "",
  message: ""
};

const maxFiles = 5;
const maxFileSize = 5 * 1024 * 1024;
const maxTotalSize = 15 * 1024 * 1024;

function formatSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.ceil(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function SupportTicketForm({ departments, priorities }: SupportTicketFormProps) {
  const [authReady, setAuthReady] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "verify" | "portal">("login");
  const [login, setLogin] = useState(initialLogin);
  const [code, setCode] = useState("");
  const [user, setUser] = useState<PortalUser | null>(null);
  const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [authMessage, setAuthMessage] = useState("");
  const [ticket, setTicket] = useState(initialTicket);
  const [files, setFiles] = useState<File[]>([]);
  const [ticketStatus, setTicketStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [ticketMessage, setTicketMessage] = useState("");
  const [recentTickets, setRecentTickets] = useState<RecentTicket[]>([]);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/support/auth/session");
        const result = await response.json();

        if (result.authenticated) {
          setUser(result.user);
          setAuthMode("portal");
        }
      } catch {
        setAuthMode("login");
      } finally {
        setAuthReady(true);
      }
    }

    try {
      const savedTickets = window.localStorage.getItem("planetic-support-tickets");

      if (savedTickets) {
        setRecentTickets(JSON.parse(savedTickets));
      }
    } catch {
      window.localStorage.removeItem("planetic-support-tickets");
    }

    loadSession();
  }, []);

  function updateLogin(field: keyof typeof initialLogin, value: string) {
    setLogin((current) => ({ ...current, [field]: value }));
  }

  function updateTicket(field: keyof typeof initialTicket, value: string) {
    setTicket((current) => ({ ...current, [field]: value }));
  }

  async function requestLoginCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("");

    try {
      const response = await fetch("/api/support/auth/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send login code.");
      }

      setAuthStatus("success");
      setAuthMessage("A secure login code has been sent to your email.");
      setAuthMode("verify");
    } catch (error) {
      setAuthStatus("error");
      setAuthMessage(error instanceof Error ? error.message : "Unable to send login code.");
    }
  }

  async function verifyLoginCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthStatus("loading");
    setAuthMessage("");

    try {
      const response = await fetch("/api/support/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to verify login code.");
      }

      setUser(result.user);
      setAuthMode("portal");
      setAuthStatus("success");
      setAuthMessage("");
      setCode("");
    } catch (error) {
      setAuthStatus("error");
      setAuthMessage(error instanceof Error ? error.message : "Unable to verify login code.");
    }
  }

  async function logout() {
    await fetch("/api/support/auth/session", {
      method: "DELETE"
    });

    setUser(null);
    setAuthMode("login");
    setAuthStatus("idle");
    setTicketStatus("idle");
    setAuthMessage("");
  }

  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);
    const totalSize = selectedFiles.reduce((total, file) => total + file.size, 0);

    if (selectedFiles.length > maxFiles) {
      setTicketStatus("error");
      setTicketMessage(`Upload up to ${maxFiles} attachments only.`);
      event.target.value = "";
      return;
    }

    if (totalSize > maxTotalSize) {
      setTicketStatus("error");
      setTicketMessage("Total attachment size must be 15 MB or less.");
      event.target.value = "";
      return;
    }

    const oversizedFile = selectedFiles.find((file) => file.size > maxFileSize);

    if (oversizedFile) {
      setTicketStatus("error");
      setTicketMessage(`${oversizedFile.name} is too large. Each file must be 5 MB or less.`);
      event.target.value = "";
      return;
    }

    setFiles(selectedFiles);
    setTicketStatus("idle");
    setTicketMessage("");
  }

  async function submitTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTicketStatus("loading");
    setTicketMessage("");

    try {
      const payload = new FormData();

      Object.entries(ticket).forEach(([key, value]) => {
        payload.append(key, value);
      });

      files.forEach((file) => {
        payload.append("attachments", file);
      });

      const response = await fetch("/api/tickets", {
        method: "POST",
        body: payload
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to create ticket.");
      }

      const recentTicket = {
        ticketId: result.ticketId,
        subject: ticket.subject,
        department: ticket.department,
        createdAt: new Date().toISOString()
      };
      const nextTickets = [recentTicket, ...recentTickets].slice(0, 5);

      window.localStorage.setItem("planetic-support-tickets", JSON.stringify(nextTickets));
      setRecentTickets(nextTickets);
      setTicketStatus("success");
      setTicketMessage(`Ticket ${result.ticketId} has been created and emailed to support.`);
      setTicket(initialTicket);
      setFiles([]);
    } catch (error) {
      setTicketStatus("error");
      setTicketMessage(error instanceof Error ? error.message : "Unable to create ticket.");
    }
  }

  if (!authReady) {
    return (
      <div className="support-portal-card">
        <div className="support-loading">
          <span />
          <strong>Checking support session</strong>
        </div>
      </div>
    );
  }

  if (authMode !== "portal") {
    return (
      <div className="support-auth-grid" id="support-ticket-form">
        <div className="support-auth-copy">
          <span className="eyebrow">Secure support portal</span>
          <h2>Login Before Opening a Ticket</h2>
          <p>
            Access the ticket desk with a one-time email code, then submit support requests with
            screenshots, invoices, and service details attached.
          </p>
          <div className="portal-benefits">
            <div>
              <strong>Verified email</strong>
              <span>Ticket replies go to the signed-in address.</span>
            </div>
            <div>
              <strong>Attachments</strong>
              <span>Screenshots and documents are sent with the ticket.</span>
            </div>
            <div>
              <strong>Ticket reference</strong>
              <span>Each request receives a Planetic ticket ID.</span>
            </div>
          </div>
        </div>

        {authMode === "login" ? (
          <form className="support-auth-form" onSubmit={requestLoginCode}>
            <h3>Customer Login</h3>
            <label>
              Full Name
              <input
                required
                type="text"
                value={login.fullName}
                onChange={(event) => updateLogin("fullName", event.target.value)}
              />
            </label>
            <label>
              Email Address
              <input
                required
                type="email"
                value={login.email}
                onChange={(event) => updateLogin("email", event.target.value)}
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                value={login.phone}
                onChange={(event) => updateLogin("phone", event.target.value)}
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={authStatus === "loading"}>
              {authStatus === "loading" ? "Sending Code..." : "Email Login Code"}
            </button>
            {authMessage ? <p className={`form-status ${authStatus}`}>{authMessage}</p> : null}
          </form>
        ) : (
          <form className="support-auth-form" onSubmit={verifyLoginCode}>
            <h3>Enter Login Code</h3>
            <p className="auth-note">We sent a 6-digit code to {login.email}.</p>
            <label>
              Login Code
              <input
                required
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </label>
            <button className="btn btn-primary" type="submit" disabled={authStatus === "loading"}>
              {authStatus === "loading" ? "Verifying..." : "Login to Support"}
            </button>
            <button className="portal-text-button" type="button" onClick={() => setAuthMode("login")}>
              Use a different email
            </button>
            {authMessage ? <p className={`form-status ${authStatus}`}>{authMessage}</p> : null}
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="support-portal" id="support-ticket-form">
      <aside className="support-sidebar">
        <div className="support-account">
          <span>Signed in as</span>
          <strong>{user?.fullName}</strong>
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </div>
        <div className="support-nav-list">
          <span className="active">New Ticket</span>
          <span>Recent Activity</span>
          <span>Email Replies</span>
        </div>
        <div className="support-response-box">
          <strong>Support desk</strong>
          <span>Tickets are delivered to Planetic Solutions with your verified email attached.</span>
        </div>
        <button className="portal-text-button" type="button" onClick={logout}>
          Logout
        </button>
      </aside>

      <div className="ticket-workspace">
        <div className="ticket-workspace-header">
          <div>
            <span className="eyebrow">New ticket</span>
            <h2>Create Support Ticket</h2>
          </div>
          <span className="ticket-secure-pill">Verified session</span>
        </div>

        <form className="ticket-form" onSubmit={submitTicket}>
          <div className="form-grid">
            <label>
              Department
              <select
                required
                value={ticket.department}
                onChange={(event) => updateTicket("department", event.target.value)}
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
                value={ticket.priority}
                onChange={(event) => updateTicket("priority", event.target.value)}
              >
                {priorities.map((priority) => (
                  <option value={priority} key={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Service Reference
              <input
                type="text"
                placeholder="Domain, invoice, or hosting plan"
                value={ticket.serviceReference}
                onChange={(event) => updateTicket("serviceReference", event.target.value)}
              />
            </label>
            <label>
              Subject
              <input
                required
                type="text"
                value={ticket.subject}
                onChange={(event) => updateTicket("subject", event.target.value)}
              />
            </label>
          </div>

          <label>
            Message
            <textarea
              required
              rows={7}
              value={ticket.message}
              onChange={(event) => updateTicket("message", event.target.value)}
            />
          </label>

          <label className="attachment-drop">
            <span>Upload screenshots or attachments</span>
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,text/plain,application/zip,.doc,.docx"
              onChange={handleFiles}
            />
            <small>PNG, JPG, WebP, GIF, PDF, TXT, ZIP, DOC, DOCX. Up to 5 files, 15 MB total.</small>
          </label>

          {files.length ? (
            <div className="attachment-list">
              {files.map((file) => (
                <span key={`${file.name}-${file.size}`}>
                  {file.name} <small>{formatSize(file.size)}</small>
                </span>
              ))}
            </div>
          ) : null}

          <button className="btn btn-primary" type="submit" disabled={ticketStatus === "loading"}>
            {ticketStatus === "loading" ? "Submitting Ticket..." : "Submit Ticket"}
          </button>

          {ticketMessage ? (
            <p className={`form-status ${ticketStatus}`}>{ticketMessage}</p>
          ) : null}
        </form>

        {recentTickets.length ? (
          <div className="recent-ticket-list">
            <h3>Recent Tickets</h3>
            {recentTickets.map((item) => (
              <div className="recent-ticket" key={item.ticketId}>
                <strong>{item.ticketId}</strong>
                <span>{item.subject}</span>
                <small>{item.department}</small>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
