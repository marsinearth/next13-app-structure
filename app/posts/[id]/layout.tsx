import styles from "layout.module.css";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export default function PostsLayout({ children }: PropsWithChildren<never>) {
  return (
    <>
      {children}
      <div className={styles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    </>
  );
}
