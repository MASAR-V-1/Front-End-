import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Security from "./components/Security/Security";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Security />
    </>
  );
};

export default page;
