import Image from "next/image";
import styles from "./page.module.css";
import LoanSimulator from "@/components/LoanSimulator/LoanSimulator";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

export default function Home() {
  return (
    <div>

      <LoanSimulator />
    </div>
  );
}