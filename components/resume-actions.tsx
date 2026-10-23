"use client";

import { Download } from "lucide-react";

export function ResumeActions() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 print:hidden"
    >
      <Download className="size-4" /> Imprimir ou salvar em PDF
    </button>
  );
}
