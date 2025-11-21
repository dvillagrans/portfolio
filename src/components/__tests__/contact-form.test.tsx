import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "../contact-form";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock useI18n
vi.mock("@/contexts/i18n-context", () => ({
    useI18n: () => ({
        t: (key: string) => {
            const translations: Record<string, string> = {
                "contact.title": "Contact Me",
                "contact.description": "Send me a message",
                "contact.name": "Name",
                "contact.name.placeholder": "Your name",
                "contact.email": "Email",
                "contact.email.placeholder": "Your email",
                "contact.subject": "Subject",
                "contact.subject.placeholder": "Subject",
                "contact.message": "Message",
                "contact.message.placeholder": "Your message",
                "contact.send": "Send Message",
                "contact.sending": "Sending...",
                "contact.success": "Message sent successfully!",
                "contact.error": "Error sending message",
                "validation.name.min": "Name must be at least 2 characters",
                "validation.email.invalid": "Invalid email address",
                "validation.subject.min": "Subject must be at least 5 characters",
                "validation.message.min": "Message must be at least 10 characters",
            };
            return translations[key] || key;
        },
    }),
}));

// Mock sonner toast
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock analytics
vi.mock("@/components/analytics", () => ({
    trackContactForm: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe("ContactForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the contact form correctly", () => {
        render(<ContactForm />);

        expect(screen.getByText("Contact Me")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Your message")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
    });

    it("shows validation errors for empty fields", async () => {
        render(<ContactForm />);

        const submitButton = screen.getByRole("button", { name: /send message/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Name must be at least 2 characters")).toBeInTheDocument();
            expect(screen.getByText("Invalid email address")).toBeInTheDocument();
            expect(screen.getByText("Subject must be at least 5 characters")).toBeInTheDocument();
            expect(screen.getByText("Message must be at least 10 characters")).toBeInTheDocument();
        });
    });

    it("submits the form successfully with valid data", async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        render(<ContactForm />);

        fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByPlaceholderText("Your email"), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Test Subject" } });
        fireEvent.change(screen.getByPlaceholderText("Your message"), { target: { value: "This is a test message content" } });

        const submitButton = screen.getByRole("button", { name: /send message/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Sending...")).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/contact", expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    name: "John Doe",
                    email: "john@example.com",
                    subject: "Test Subject",
                    message: "This is a test message content",
                }),
            }));
            expect(screen.getByText("Message sent successfully!")).toBeInTheDocument();
        });
    });

    it("handles submission error", async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Server error" }),
        });

        render(<ContactForm />);

        fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByPlaceholderText("Your email"), { target: { value: "john@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Subject"), { target: { value: "Test Subject" } });
        fireEvent.change(screen.getByPlaceholderText("Your message"), { target: { value: "This is a test message content" } });

        const submitButton = screen.getByRole("button", { name: /send message/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Server error")).toBeInTheDocument();
        });
    });
});
