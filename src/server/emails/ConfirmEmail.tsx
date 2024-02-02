import * as React from "react";
import { Body } from "@react-email/body";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Row } from "@react-email/row";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";
import { env } from "@/env";

import { Logo } from "./components/Logo";

interface EmailProps {
  userFirstname: string;
  confirmEmailLink: string;
}

export default function ConfirmEmail({
  userFirstname = "User",
  confirmEmailLink = `${env.BASE_URL}`,
}: EmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body className="bg-[#f6f9fc] px-4">
          <Container className="mx-auto max-w-[600px] rounded-lg border bg-white p-8 font-sans shadow-lg">
            <Section className="">
              <Row>
                <Logo />
              </Row>
            </Section>
            <Section>
              <Text className="text-lg leading-6 text-black">
                Hi {userFirstname},
              </Text>
              <Text className="text-4xl font-bold text-black">
                Verify your email address
              </Text>
            </Section>
            <Section>
              <Text className="text-black">
                Thanks for registering for an account on Analytix. Please click
                the button below to verify your email address. You will have
                full access to your Analytix account after verification.
              </Text>
              <Button
                className="mt-4 rounded-lg bg-[#001b7a] p-4 text-white "
                href={confirmEmailLink}
              >
                Verify Email
              </Button>
              <Text className="mt-4 text-black">
                If you did not sign up for Analytix, please ignore this email.
              </Text>
              <Text className="text-black">
                Chennai Institute of Technology
              </Text>
              <Hr />
              <Text className="mt-4 w-[600px] text-xs text-gray-400">
                © Analytix 2024. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
