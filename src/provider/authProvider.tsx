import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  role: string | null;
  setRole: (newRole: string | null) => void;
  profile: any | null;
  setProfile: (newProfile: any | null) => void;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<any> = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [role, setRole_] = useState<string | null>(
    localStorage.getItem("role")
  );

  const [profile, setProfile_] = useState<any | null>(
    localStorage.getItem("profile")
  );


  // Function to set the authentication token
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const setRole = (newRole: string | null) => {
    setRole_(newRole);
  };

  const setProfile = (newProfile: any | null) => {
    setProfile_(newProfile);
  };

  useEffect(() => {
    if (token && role) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("profile", profile);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profile");

    }
  }, [token, role, profile]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      role,
      setRole,
      profile,
      setProfile,
      logOut: () => {
        setToken(null);
        setRole(null);
        setProfile(null);
      }
    }),
    [token, profile]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export default AuthProvider;
