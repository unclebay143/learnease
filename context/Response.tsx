import ToastNotification from "@/components/shared/alert";
import {
  appUsageCount,
  deleteResponse,
  fetchSavedPromptResponses,
  generateResponse,
  getProfile,
  saveResponse,
} from "@/lib/services";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  useContext,
  useState,
  useEffect,
  ReactElement,
  createContext,
} from "react";
import {
  UserLanguagePairType,
  UserLevelPairType,
  useUserContext,
} from "./User";
import { handleInsufficientCredits, handleStreamResponse } from "../lib";
import useLocalStorage from "@/lib/hooks/use-local-storage";

export interface ResponseType {
  responseId?: string;
  hasGivenFeedback?: boolean;
  isDeleted?: boolean;
  isFavorite?: boolean;
  isUseful?: boolean;
  language?: UserLanguagePairType | null;
  level?: UserLevelPairType;
  markdown?: string;
  title?: string;
  updatedAt?: string;
  user?: string;
}

export interface PromptResponseCtx {
  fetchUserSavedResponses?: () => void;
  userSavedPromptResponses: ResponseType[];
  isLoading: boolean;
  isErrorWhileFetching?: boolean;
  errorMessage?: string;
  deletePromptResponse?: (responseId: string) => void;
  isDeletingResponse?: boolean;
  deleted?: boolean;
  setDeleted?: Function;
  responseIdToBeDeleted?: string | null;
  toggleFavorite?: (responseId: string) => Promise<void>;
  favoriteStatusUpdated?: boolean;
  isUpdatingFavoriteStatus?: boolean;
  fetchResponse?: (responseId: string) => void;
  response?: ResponseType | null;
  responseNotFound?: boolean;
  isRetrievingResponse?: boolean;
  isErrorWhileRetrievingResponse?: boolean;
  promptInputValue?: string;
  setPromptInputValue: Function;
  isGeneratingResponse: boolean;
  isErrorWhileResponding?: boolean;
  hasLowCredit?: boolean;
  lowCreditMsg?: string;
  handleGenerateResponse: Function;
  setHasLowCredit?: Function;
  showSharer?: boolean;
  currentResponseLanguage: UserLanguagePairType;
}

const PromptResponseContext = createContext<PromptResponseCtx>({
  userSavedPromptResponses: [],
  isLoading: true,
  handleGenerateResponse: () => {},
  setPromptInputValue: () => {},
  isGeneratingResponse: false,
  currentResponseLanguage: { value: "", label: "" },
});

export function usePromptResponseContext(): PromptResponseCtx {
  const promptResponseContext = useContext(PromptResponseContext);
  if (!promptResponseContext) {
    throw new Error(
      "usePromptResponseContext must be used within a PromptResponseProvider"
    );
  }
  return promptResponseContext;
}

export function PromptResponseProvider({
  children,
}: {
  children: ReactElement;
}) {
  const { data: session } = useSession();
  const { user } = useUserContext();

  const [userSavedPromptResponses, setUserSavedPromptResponses] = useState<
    ResponseType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isErrorWhileFetching, setIsErrorWhileFetching] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Deletion
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isDeletingResponse, setIsDeletingResponse] = useState<boolean>(false);
  const [responseIdToBeDeleted, setResponseIdToBeDeleted] = useState<
    string | null
  >(null);

  // favorite
  const [favoriteStatusUpdated, setFavoriteStatusUpdated] = useState(false);
  const [isUpdatingFavoriteStatus, setIsUpdatingFavoriteStatus] =
    useState(false);

  //response by id
  const router = useRouter();
  const responseId = router.query?.responseId as string;
  const [response, setResponse] = useState<ResponseType | null>(null);
  const [responseNotFound, setResponseNotFound] = useState<boolean>(false);
  const [isRetrievingResponse, setIsRetrievingResponse] =
    useState<boolean>(false);
  const [isErrorWhileRetrievingResponse, setIsErrorWhileRetrievingResponse] =
    useState<boolean>(false);

  //
  const [currentResponseLanguage, setCurrentResponseLanguage] =
    useState<UserLanguagePairType>({ value: "", label: "" });
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);
  // const resultDivRef = useRef<null | HTMLDivElement>(null);
  const [isErrorWhileResponding, setIsErrorWhileResponding] =
    useState<boolean>(false);
  const [doneGenerating, setDoneGenerating] = useState<boolean>(false);
  const [hasLowCredit, setHasLowCredit] = useState<boolean>(false);
  const [lowCreditMsg, setLowCreditMsg] = useState<string>("");
  const [showSharer, setShowSharer] = useLocalStorage("show-sharer", false);
  const [usedAppCount, setUsedAppCount] = useLocalStorage("used-app-count", 0); // consider tracking with db
  // const [openSidebar, setOpenSiderbar] = useState<boolean>(false);

  const handleGenerateResponse = async (params: {
    prompt?: string;
    language: { value: string; label: string };
    level: { value: string; label: string };
  }) => {
    const { prompt, language, level } = params;
    setCurrentResponseLanguage(language);

    setDoneGenerating(false);
    const { hasSufficientCredits, message } = handleInsufficientCredits({
      usedAppCount,
      user,
    });

    if (!hasSufficientCredits) {
      setHasLowCredit(true);
      setLowCreditMsg(message);
      return;
    }

    setResponse((prevResponse) => ({ ...prevResponse, markdown: "" }));

    // Adding settimeout to allow scrollToResult work
    setTimeout(async () => {
      setIsGeneratingResponse(true);
      setResponse((prevResponse) => ({
        ...prevResponse,
        title: prompt || promptInputValue,
        language,
        level,
      }));

      const generateRes = await generateResponse({
        prompt: prompt || promptInputValue,
        language: language?.value,
        level: level?.value,
      });

      if (!generateRes.ok) {
        setIsErrorWhileResponding(true);
        setIsGeneratingResponse(false);
        return;
      }

      appUsageCount();

      const done = await handleStreamResponse({
        data: generateRes.body,
        setResponse,
      });

      if (done) {
        setDoneGenerating(true);
        setIsGeneratingResponse(false);
        setUsedAppCount(usedAppCount + 1);
        // setResponse({});
        setIsErrorWhileResponding(false);

        if (user) {
          getProfile();
        }

        // show sharer for first time users
        if (!showSharer && usedAppCount + 1 === 1) {
          setShowSharer(true);
        }
      }
    }, 1000);
  };

  const fetchUserSavedResponses = () => {
    fetchSavedPromptResponses()
      .then((responses) => {
        setUserSavedPromptResponses(responses);
        setIsLoading(false);
        return responses;
      })
      .catch((error) => {
        setIsErrorWhileFetching(true);
        setErrorMessage(error);
        return error;
      });
  };

  const fetchResponse = async (responseId: string) => {
    setIsRetrievingResponse(true);
    if (responseId) {
      const res = await fetch("/api/response/" + responseId);
      const { data } = await res.json();
      if (!data || data?.isDeleted) {
        setResponseNotFound(true);
        setIsRetrievingResponse(false);
        return;
      }
      const { title, markdown } = data;
      setResponse(data);
      // setResponseTitle(title);
      // setResponse(markdown);
      // setSavedPromptResponse(data);
      setIsRetrievingResponse(false);
      // setOpenSiderbar(false);
      return data;
    }
    setIsErrorWhileRetrievingResponse(true);
    return false;
  };

  const deletePromptResponse = async (responseId: string) => {
    setIsDeletingResponse(true);
    setResponseIdToBeDeleted(responseId);
    const confirm = window.confirm("This prompt response will be deleted");

    if (!confirm) {
      setIsDeletingResponse(false);
      return;
    }

    if (!responseId) {
      return;
    }

    const success = await deleteResponse(responseId);

    if (success) {
      setDeleted(true);
      setIsDeletingResponse(false);
      fetchUserSavedResponses();
    }
  };

  const toggleFavorite = (responseId: string) => {
    setIsUpdatingFavoriteStatus(true);

    return new Promise<void>(async (resolve, reject) => {
      const res = await fetch("/api/response/" + responseId, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        // fetchUserSavedResponses();
        setResponse(data);
        setIsUpdatingFavoriteStatus(false);
        resolve();
        return res;
      } else {
        setIsUpdatingFavoriteStatus(false);
        reject(new Error("Failed to toggle favorite status"));
      }
    });
  };

  useEffect(() => {
    if (session) {
      fetchUserSavedResponses();
    }
  }, [session]);

  useEffect(() => {
    if (responseId) {
      fetchResponse(responseId);
    }
  }, [responseId]);

  useEffect(() => {
    if (doneGenerating) {
      const savePayload = {
        title: response?.title,
        markdown: response?.markdown,
        language: response?.language?.value,
        level: response?.level?.value,
      };
      console.log(savePayload);
      saveResponse(savePayload).then((res) => {
        setResponse((prevResponse) => ({
          ...prevResponse,
          responseId: res.responseId,
        }));
      });
    }
  }, [doneGenerating]);

  return (
    <PromptResponseContext.Provider
      value={{
        fetchUserSavedResponses,
        userSavedPromptResponses,
        isLoading,
        isErrorWhileFetching,
        errorMessage,
        deletePromptResponse,
        isDeletingResponse,
        deleted,
        setDeleted,
        responseIdToBeDeleted,
        toggleFavorite,
        favoriteStatusUpdated,
        isUpdatingFavoriteStatus,
        fetchResponse,
        response,
        responseNotFound,
        isRetrievingResponse,
        isErrorWhileRetrievingResponse,
        promptInputValue,
        setPromptInputValue,
        isGeneratingResponse,
        isErrorWhileResponding,
        hasLowCredit,
        lowCreditMsg,
        handleGenerateResponse,
        setHasLowCredit,
        showSharer,
        currentResponseLanguage,
      }}
    >
      {children}

      {deleted ? (
        <ToastNotification
          open={deleted}
          setOpen={setDeleted}
          title='Prompt response deleted successfully'
          dark
        />
      ) : null}

      {favoriteStatusUpdated ? (
        <ToastNotification
          open={favoriteStatusUpdated}
          setOpen={setFavoriteStatusUpdated}
          title='Prompt response favorite updated successfully'
          dark
        />
      ) : null}
    </PromptResponseContext.Provider>
  );
}
