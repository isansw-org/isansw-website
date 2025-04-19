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
          <Section style={styles.header}>
            <Heading style={styles.headerHeading}>ISANSW</Heading>
          </Section>

          <Section style={styles.content}>
            <Heading style={styles.subheading}>Hi {recipientName},</Heading>
            <Text style={styles.text}>
              You’ve been invited to manage the ISANSW website. Click the button
              below to get started with your registration.
            </Text>

            <Section style={styles.buttonContainer}>
              <Button style={styles.button} href={registrationLink}>
                Proceed
              </Button>
            </Section>

            <Text style={styles.smallPrint}>
              Please do not share this link with anyone.
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Need help?{" "}
              <Link
                href="mailto:webmasterisansw@gmail.com"
                style={styles.footerLink}
              >
                Contact Support
              </Link>
            </Text>
            <Text style={styles.footerText}>
              &copy; 2025 ISANSW. All rights reserved.
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
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    backgroundColor: "#F2F2F5",
    color: "#333333",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  header: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    textAlign: "center" as const,
    padding: "24px",
  },
  headerHeading: {
    margin: 0,
    fontSize: "26px",
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
  },
  content: {
    padding: "24px",
    textAlign: "left" as const,
    lineHeight: "1.6",
  },
  subheading: {
    color: "#000000",
    fontSize: "20px",
    marginBottom: "12px",
  },
  text: {
    margin: "0 0 20px 0",
    fontSize: "16px",
  },
  buttonContainer: {
    textAlign: "center" as const,
    margin: "24px 0",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#000000",
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "14px 32px",
    fontSize: "16px",
    borderRadius: "8px",
    fontWeight: "bold" as const,
  },
  smallPrint: {
    fontSize: "12px",
    color: "#777777",
    textAlign: "center" as const,
    marginTop: "16px",
  },
  footer: {
    backgroundColor: "#F9F9F9",
    textAlign: "center" as const,
    padding: "16px 24px",
  },
  footerText: {
    margin: "4px 0",
    fontSize: "14px",
    color: "#777777",
  },
  footerLink: {
    color: "#000000",
    textDecoration: "none",
    fontWeight: "bold" as const,
  },
};
