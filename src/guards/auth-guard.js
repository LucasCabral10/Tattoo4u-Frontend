// components/AuthGuard.js
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SessionExpiredModal from "src/sections/auth-guard/modal-session";

const AuthGuard = ({ children }) => {
  const { data: session, status, error } = useSession();
  const router = useRouter();
  const [isSessionExpired, setSessionExpired] = useState(false); // Estado de simulação de sessão expirada
  const [isSessionExpiredModalOpen, setSessionExpiredModalOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    // Simulação de sessão expirada
    if (isSessionExpired) {
      setSessionExpiredModalOpen(true);
      return;
    }
    //Com token de sessão expirado
    if (error) {
      // Sinaliza que a sessão expirou e abre o modal
      setSessionExpiredModalOpen(true);
      return;
    }

    if (
      // Rotas liberadas fora de sessão
      !session &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/register" &&
      router.pathname !== "/shared/[id]"
    ) {
      //se não existir sessão ele redirecina para login
      router.replace("/auth/login");
    }
  }, [session, status, router, error, isSessionExpired]);

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
