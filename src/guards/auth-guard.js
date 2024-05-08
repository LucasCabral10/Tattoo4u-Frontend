import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SessionExpiredModal from "src/sections/auth-guard/modal-session";
import axios from "axios";

const AuthGuard = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSessionExpiredModalOpen, setSessionExpiredModalOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (
      // Rotas liberadas fora de sessão
      !session &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/register" &&
      router.pathname !== "/shared/[id]"
    ) {
      //se não existir sessão ele redirecina para login
      router.replace("/auth/login");
    } else if (session) {
      //Verifica se o token está expirado ou não
      const VerifyTokenExp = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          };
          const response = await axios.get(
            `https://backend-backend.fwhe6r.easypanel.host/users/token`,
            config
          );
          if (response.status === 200) {
            return;
          }
        } catch (error) {
          setSessionExpiredModalOpen(true);
        }
      };
      VerifyTokenExp();
    }
  }, [session, status, router]);

  const handleSessionExpiredModalClose = () => {
    // Faz logout e redireciona para a página de login quando o modal é fechado
    signOut();
    router.replace("/auth/login");
  };

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

  return (
    <>
      {children}
      <SessionExpiredModal
        isOpen={isSessionExpiredModalOpen}
        onClose={handleSessionExpiredModalClose}
      />
    </>
  );
};

export default AuthGuard;
