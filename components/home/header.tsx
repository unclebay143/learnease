import React from "react";
import Hero from "./hero";
import Navbar from "./navbar";

type Props = {};

export default function Header({}: Props) {
  return (
    <header
      className='bg-gray-800 z-20'
      style={{
        backgroundImage: "url('/_static/illustrations/grid.svg')",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        top: "0",
      }}
    >
      <Navbar />
      <Hero />
    </header>
  );
}
