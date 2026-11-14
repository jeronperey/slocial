import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full items-center justify-center sm:p-8">
      <div className="relative flex h-dvh w-full flex-col overflow-hidden bg-bg text-ink sm:h-[844px] sm:max-h-[calc(100dvh-4rem)] sm:w-[390px] sm:rounded-[40px] sm:shadow-[0_0_0_8px_#1b1d25]">
        {children}
      </div>
    </div>
  );
}
