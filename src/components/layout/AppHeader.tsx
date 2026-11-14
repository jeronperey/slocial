import { ChevronLeftIcon, MenuIcon, SearchIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

// Top bar: page title, optional back arrow, search + menu icons.

interface AppHeaderProps {
  title: string;
  back?: boolean;
}

export function AppHeader({ title, back = false }: AppHeaderProps) {
  const navigate = useNavigate();

  const goBack = () => {
    const canGoBack = (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) navigate(-1);
    else navigate("/");
  };

  return (
    <header className="flex h-[52px] shrink-0 items-center gap-2 bg-surface px-4">
      {back && (
        <button
          type="button"
          aria-label="Back"
          onClick={goBack}
          className="-ml-1.5 flex size-8 cursor-pointer items-center justify-center font-title rounded-lg text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ChevronLeftIcon size={22} />
        </button>
      )}

      <h1 className="flex-1 truncate text-[17px] font-bold tracking-tight">
        {title}
      </h1>

      {!back && (
        <div className="flex gap-1 text-muted">
          <IconButton label="Search">
            <SearchIcon size={19} />
          </IconButton>
          <IconButton label="Menu">
            <MenuIcon size={19} />
          </IconButton>
        </div>
      )}
    </header>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-8 cursor-pointer items-center justify-center rounded-lg hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
    >
      {children}
    </button>
  );
}
