import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styles from "./../shared/background/background.module.css";
import Navbar from "./navbar";

export default function Header({
  setOpenSiderbar,
  children,
}: {
  setOpenSiderbar: Function;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <header
        className='bg-gray-900 h-[100vh] relative overflow-hidden'
        style={{
          backgroundImage: "url('/_static/illustrations/grid.svg')",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          top: "0",
        }}
      >
        <div className={styles.main2}>
          <div className={styles.content2}></div>
        </div>
        <Navbar setOpenSiderbar={setOpenSiderbar} />
        <section className='relative z-20'>{children}</section>
      </header>
    </>
  );
}
