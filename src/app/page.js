import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default page;
