import { Img } from "@react-email/img";

import { logo } from "./styles";

export const imageUrl =
  "https://utfs.io/f/076d691b-eae6-45e2-8339-e6ac9ba1a5f6-1ny73k.png";

export function Logo() {
  return (
    <>
      <Img src={imageUrl} style={logo} width="600" alt="Analytix" />
    </>
  );
}
