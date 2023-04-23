import { SUPPORTED_LANGUAGES, SUPPORTED_LEVELS } from "@/lib/constants";
import { getProfile } from "@/lib/services";
import { useSession } from "next-auth/react";
import {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react";

export interface UserType {
  credits: number;
  freeCredits: number;
}

export interface UserLanguagePairType {
  label: string | null;
  value: string | null;
}
export interface UserLevelPairType {
  label: string | null;
  value: string | null;
}

export interface UserCtx {
  isLoading: boolean;
  user: UserType | null;
  userLanguage: UserLanguagePairType;
  userLevel: UserLevelPairType;
  setUserLanguage: Function;
  setUserLevel: Function;
}

const UserContext = createContext<UserCtx>({
  isLoading: true,
  user: null,
  userLanguage: { label: null, value: null },
  userLevel: { label: null, value: null },
  setUserLanguage: () => {},
  setUserLevel: () => {},
});

export function useUserContext(): UserCtx {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return userContext;
}

export function UserProvider({ children }: { children: ReactElement }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [userLanguage, setUserLanguage] = useState<{
    value: string;
    label: string;
  }>(SUPPORTED_LANGUAGES[0]);

  const [userLevel, setUserLevel] = useState<{ value: string; label: string }>(
    SUPPORTED_LEVELS[0]
  );

  useEffect(() => {
    if (session) {
      getProfile().then((profile) => {
        setUser(profile);
        setUserLanguage(
          profile?.language
            ? { label: profile.language, value: profile.language }
            : SUPPORTED_LANGUAGES[0]
        );
        setUserLevel(
          profile?.level
            ? { label: profile.level, value: profile.level }
            : SUPPORTED_LEVELS[0]
        );
        setIsLoading(false);
      });
    }
  }, [session]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        user,
        userLanguage,
        setUserLanguage,
        userLevel,
        setUserLevel,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
