"use client";

import DemoModal      from "./DemoModal";
import { useDemoModal } from "@/context/DemoModalContext";

export default function ModalController() {
  const { isOpen } = useDemoModal();
  if (!isOpen) return null;
  return <DemoModal />;
}
