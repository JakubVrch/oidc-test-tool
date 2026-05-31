import { UseFormWatch } from "react-hook-form";
import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import { constructUrl } from "@/services/urlManager/urlManager";

const useConstructedUrl = (watch: UseFormWatch<ConstructRequestFormValues>) => {
  const values = watch();
  const result = constructUrl(values);
  return result.url ?? null;
};

export default useConstructedUrl;
