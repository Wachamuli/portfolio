import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { env } from "cloudflare:workers";

export const server = {
  sendContactEmail: defineAction({
    accept: "form",
    input: z.object({
      subject: z
        .string({ message: "ERR_MISSING_HEADER: Subject is required." })
        .min(2, "ERR_LENGTH_MIN: Header must be >= 2 chars."),
      email: z
        .string({
          message: "ERR_MISSING_RETURN_PATH: Email is required.",
        })
        .email("ERR_INVALID_FORMAT: Return_Path must be a valid URI."),
      message: z
        .string({
          message: "ERR_EMPTY_PAYLOAD: Message body is required.",
        })
        .min(50, "ERR_BUFFER_UNDERFLOW: Message must be >= 50 chars."),
    }),
    handler: async ({ subject, email, message }) => {
      const resend = new Resend(env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "Contact Form <system@contact.richiezrijo.com>",
        to: ["hello@richiezrijo.com"],
        replyTo: [email],
        subject: subject,
        html: `
           <h2>New Contact Form Submission</h2>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message}</p>
         `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Couldn't send the request.",
          stack: error.message,
        });
      }

      return { message: "Request sent successfully!" };
    },
  }),
};
