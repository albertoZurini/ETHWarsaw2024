import * as React from "react";
import { SVGProps } from "react";
const BurgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="#0BB489" strokeLinecap="round" strokeWidth={2}>
      <path d="M4 18h16M4 12h16M4 6h16" />
    </g>
  </svg>
);
export default BurgerMenu;
