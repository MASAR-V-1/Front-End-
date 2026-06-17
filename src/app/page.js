import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Security from "./components/Security/Security";
import RegistrationCompp from "./components/reg/RegistrationCompp";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Security />
      <RegistrationCompp />
    </>
  );
};

export default page;
