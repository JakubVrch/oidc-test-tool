import { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { ConstructRequestFormValues } from "@/services/types/constructRequestForm";
import { constructUrl } from "@/services/urlManager/urlManager";

const useConstructedUrl = (watch: UseFormWatch<ConstructRequestFormValues>) => {
  const [constructedUrl, setConstructedUrl] = useState<string | null>(null);

  useEffect(() => {
    const subscription = watch((values) => {
      const result = constructUrl(values);
      if (result.url) {
        setConstructedUrl(result.url.toString());
      } else {
        setConstructedUrl(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return constructedUrl;
};

export default useConstructedUrl;
