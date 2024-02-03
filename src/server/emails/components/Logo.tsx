import { Img } from "@react-email/img";

import { logo } from "./styles";

export const imageUrl =
  "https://utfs.io/f/6d2bfc4d-8a0d-48f0-88c4-1adf3b69c60f-wsbo7g.png";

export function Logo() {
  return (
    <>
      <Img src={imageUrl} style={logo} width="600" alt="Analytix" />
    </>
  );
}
