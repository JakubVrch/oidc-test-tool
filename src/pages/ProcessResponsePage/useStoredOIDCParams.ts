import { useState } from "react";
import {
  getStoredOidcParams,
  OidcParams,
} from "@/services/storageService/storageService";

function useStoredOidcParams() {
  const [storedParams] = useState<OidcParams>(getStoredOidcParams);

  return storedParams;
}

export default useStoredOidcParams;
