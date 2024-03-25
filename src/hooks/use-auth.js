import { useContext } from 'react';
import { AuthContextProvider } from 'src/contexts/auth-context';

const useAuth = () => useContext(AuthContextProvider);

export default useAuth;
