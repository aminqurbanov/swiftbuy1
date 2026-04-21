"use client";

import { useDemoModal } from "@/context/DemoModalContext";
import { LeadIntent, LeadRole } from "@/types/lead";

interface Props {
  label?:     string;
  className?: string;
  intent?:    LeadIntent;
  role?:      LeadRole;
}

export default function DemoButton({
  label     = "Demo istə",
  className = "",
  intent    = "demo",
  role      = "general",
}: Props) {
  const { open } = useDemoModal();

  return (
    <button
      onClick={() => open({ intent, role })}
      className={className}
    >
      {label}
    </button>
  );
}
