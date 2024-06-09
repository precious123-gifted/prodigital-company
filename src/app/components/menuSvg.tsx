import * as React from "react"
import { SVGProps } from "react"
const MenuSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"7vw"}
    height={"9vw"}
    fill="none"
    viewBox="0 0 382 403"
    // viewBox="0 0 1315 1773"
    {...props}
  >
    <g fill="#333D3E">
      <path d="M337.889 201.5 190.981 369.417 149.846 322.4 255.62 201.5 149.846 80.6l41.135-47.017 73.454 83.959 73.454 83.958Z" />
      <path d="M.039 0v67.167H382V0H.039Z" />
      <path d="m41.94 201.5 146.908 167.917 41.134-47.017-105.774-120.9L229.982 80.6l-41.134-47.017-73.454 83.959L41.94 201.5Z" />
      <path d="M.039 403v-67.167H382V403H.039ZM0 168.736v67.166h381.961v-67.166H0Z" />
    </g>
  </svg>
)
export default MenuSvg
