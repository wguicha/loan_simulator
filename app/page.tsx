import Image from "next/image";
import styles from "./page.module.css";
import LoanSimulator from "@/components/LoanSimulator";

export default function Home() {
  return (
    <div>
      <LoanSimulator />
    </div>
  );
}
