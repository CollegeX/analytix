import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

import { footerText } from "./styles";

export function FooterText() {
  return (
    <>
      <Section>
        <Text style={footerText}>
          ©2024 Analytix <br />
          Chennai Institute of Technology
          <br />
          All rights reserved. <br />
        </Text>
      </Section>
    </>
  );
}
