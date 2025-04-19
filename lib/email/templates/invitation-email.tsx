import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Link,
  Button,
} from "@react-email/components";
import { z } from "zod";

export const invitationEmailSchema = z.object({
  recipientName: z.string(),
  registrationLink: z.string().url(),
});

export const InvitationEmailTemplate = ({
  recipientName,
  registrationLink,
}: {
  recipientName: string;
  registrationLink: string;
}) => {
  return (
    <Html>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Heading style={styles.headerHeading}>
              Welcome to PPI Australia!
            </Heading>
          </Section>

          {/* Content */}
          <Section style={styles.content}>
            <Heading style={styles.subheading}>Hi {recipientName},</Heading>
            <Text style={styles.text}>
              We have invited you to become a manager of the PPI Australia
              website. Please click the following button to continue with your
              registration.
            </Text>

            <Section style={styles.buttonContainer}>
              <Button style={styles.button} href={registrationLink}>
                Join PPI Australia
              </Button>
            </Section>

            <Text style={styles.warning}>
              Please do not share this link with anybody.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Need help?{" "}
              <Link
                href="mailto:infotech@ppi-australia.org"
                style={styles.footerLink}
              >
                Contact IT Support
              </Link>
            </Text>
            <Text style={styles.footerText}>
              &copy; 2025 PPI Australia. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#ff4b5c",
    color: "#fff",
    textAlign: "center" as const,
    padding: "20px",
  },
  headerHeading: {
    margin: 0,
    fontSize: "24px",
  },
  content: {
    padding: "20px",
    textAlign: "left" as const,
    lineHeight: "1.6",
  },
  subheading: {
    color: "#333",
    fontSize: "20px",
  },
  text: {
    margin: "10px 0",
    fontSize: "16px",
  },
  buttonContainer: {
    textAlign: "center" as const,
    margin: "20px 0",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#ff4b5c",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 32px",
    fontSize: "16px",
    borderRadius: "5px",
  },
  warning: {
    textAlign: "center" as const,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#f1f1f1",
    textAlign: "center" as const,
    padding: "10px 20px",
    fontSize: "14px",
    color: "#777",
  },
  footerText: {
    margin: 0,
    color: "#777",
  },
  footerLink: {
    color: "#ff4b5c",
    textDecoration: "none",
  },
};
