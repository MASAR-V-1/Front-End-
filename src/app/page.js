import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Security from "./components/Security/Security";
import RegistrationCompp from "./components/reg/RegistrationCompp";
import ModulesSection from "./components/ModulesSection/ModulesSection";
import CompareSection from "./components/Compare/CompareSection";
import Footer from "./components/Footer/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ModulesSection />
      <Security />
      <RegistrationCompp />
      <CompareSection />
      <Footer />
    </>
  );
};

export default page;
