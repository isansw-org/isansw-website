import { render } from "@react-email/components";
import {
  invitationEmailSchema,
  InvitationEmailTemplate,
} from "./templates/invitation-email";

export const enum EmailTemplates {
  InvitationEmailTemplate = "InvitationEmailTemplate",
}

/**
 * Gets the HTML content of the specified email template with placeholders replaced.
 *
 * @param templateName - The name of the email template.
 * @param data - An object containing key-value pairs to replace placeholders in the template.
 * @returns The HTML content of the email template with placeholders replaced.
 */
export const getEmailTemplate = async (
  templateName: EmailTemplates,
  data: Record<string, string>
) => {
  switch (templateName) {
    case EmailTemplates.InvitationEmailTemplate:
      const invitationEmailProps = invitationEmailSchema.parse(data);

      return await render(
        <InvitationEmailTemplate
          recipientName={invitationEmailProps.recipientName}
          registrationLink={invitationEmailProps.registrationLink}
        />
      );

    default:
      throw new Error(`Unsupported email template: ${templateName}`);
  }
};
