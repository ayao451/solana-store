import { FC } from "react";

type Props = {
  noText?: boolean;
  text?: string;
};
export const Loader: FC<Props> = ({ text = "Loading...", noText = false }) => {
  return (
    <div className="flex flex-col justify-center items-center text-xl font-light">
      <svg
        className="animate-spin h-8 w-8 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
      >
      </svg>{" "}
      {!noText ? <div className="opacity-50 mt-4">{text}</div> : null}
    </div>
  );
};
