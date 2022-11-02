import styles from "./alert.module.css";
import cn from "classnames";
import { PropsWithChildren } from "react";

type AlertProps = PropsWithChildren<{
  type?: string;
}>;

export default function Alert({ children, type }: AlertProps) {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  );
}
