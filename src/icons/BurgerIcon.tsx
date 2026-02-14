import type { IconProps } from "./icons";

export default function BurgerIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={props.fill}
      className={props.className}
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 18L20 18"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 12L20 12"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 6L20 6"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
