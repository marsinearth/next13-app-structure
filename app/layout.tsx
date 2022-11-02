import styles from "layout.module.css";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import utilStyles from "utils.module.css";

const name = "Mars Kim";

export default function DashboardLayout({
  children,
}: PropsWithChildren<never>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <article className={styles.header}>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="default"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </article>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
