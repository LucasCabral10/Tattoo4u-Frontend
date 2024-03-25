// components/AuthGuard.js
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthGuard = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (
      !session &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/register" &&
      router.pathname !== "/shared/[id]"
    ) {
      router.replace("/auth/login");
    }
  }, [session, status, router]);

  // Renderiza os filhos somente se a sessão estiver carregada e autenticada
  if (
    status === "loading" ||
    (!session &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/register" &&
      router.pathname !== "/shared/[id]")
  ) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
