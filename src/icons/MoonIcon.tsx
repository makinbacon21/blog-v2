import type { IconProps } from "./icons";

export default function MoonIcon(props: IconProps) {
  return (
    <svg
      fill={props.fill}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke={props.stroke}
      className={props.className}
      onClick={props.onClick}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <g>
          {" "}
          <g>
            {" "}
            <path d="M256,0C114.842,0,0,114.84,0,256s114.842,256,256,256s256-114.84,256-256S397.158,0,256,0z M322.225,451.558 c-20.797,7.062-43.071,10.894-66.225,10.894c-113.837,0-206.452-92.614-206.452-206.452S142.163,49.548,256,49.548 c23.154,0,45.429,3.832,66.226,10.894C266.612,107.439,231.226,177.657,231.226,256S266.612,404.561,322.225,451.558z" />{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
