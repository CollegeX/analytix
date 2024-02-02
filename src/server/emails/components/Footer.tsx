import { Hr } from "@react-email/hr";
import { Link } from "@react-email/link";
import { Text } from "@react-email/text";

import { footer, footerAnchor, hr } from "./styles";

export function Footer() {
  return (
    <>
      <Hr style={hr} />
      <Text style={footer}>
        <Link style={footerAnchor} href="https://analytix.com">
          Analytix
        </Link>
        . Chennai Institute of Technology{" "}
      </Text>
    </>
  );
}
