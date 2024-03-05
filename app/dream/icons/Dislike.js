import * as React from "react";

function Dislike(props) {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      transform="scale(-1 1)"
      {...props}
    >
      <g >
        <path d="M20.27 8.485l.705 4.08a1.666 1.666 0 01-1.64 1.95h-5.181a.833.833 0 00-.822.969l.663 4.045c.108.657.077 1.329-.09 1.974-.139.533-.55.962-1.092 1.136l-.145.047c-.328.105-.685.08-.994-.068a1.264 1.264 0 01-.68-.818l-.476-1.834a7.627 7.627 0 00-.656-1.679c-.415-.777-1.057-1.4-1.725-1.975l-1.439-1.24a1.668 1.668 0 01-.572-1.406l.812-9.393A1.666 1.666 0 018.597 2.75h4.648c3.482 0 6.453 2.426 7.025 5.735z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.968 15.265a.75.75 0 00.78-.685l.97-11.236a1.237 1.237 0 10-2.468-.107v11.279a.75.75 0 00.718.75z"
        />
      </g>
    </svg>
  );
}

const MemoDislike = React.memo(Dislike);
export default MemoDislike;
