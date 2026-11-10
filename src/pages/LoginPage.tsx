import { MapIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { TextInput } from "../components/ui/TextInput";

// Sign up / log in form. Both buttons go to the map.
export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <form
      onSubmit={createAccount}
      className="flex flex-1 flex-col overflow-y-auto px-6 pt-12 pb-6"
    >
      <div className="flex size-16 items-center justify-center rounded-[20px] bg-primary text-on-primary shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_14%,transparent),0_10px_30px_color-mix(in_srgb,var(--primary)_30%,transparent)]">
        <MapIcon size={36} strokeWidth={1.6} />
      </div>

      <h1 className="mt-6 mb-1.5 text-[28px] leading-tight font-bold tracking-tight">
        Events Around You
      </h1>
      <p className="mb-6 text-[13.5px] text-muted">
        See what's happening near you tonight.
      </p>

      <div className="flex flex-col gap-3">
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="sheldon.c"
          autoComplete="username"
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@calpoly.edu"
          autoComplete="email"
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" fullWidth glow className="mt-6">
        Create account
      </Button>

      <p className="mt-4 text-center text-[13px] text-muted">
        Have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cursor-pointer font-bold text-primary focus-visible:outline-2 focus-visible:outline-primary"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
