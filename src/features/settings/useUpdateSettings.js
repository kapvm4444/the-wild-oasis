import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: applySettings,
    isLoading: isSettingsUpdating,
    error,
  } = useMutation({
    mutationKey: ["settings"],
    mutationFn: (data) =>
      toast.promise(updateSetting(data), {
        loading: "Applying Your Settings...",
        success: "Settings Saved",
        error: (err) => err.message,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  });

  return { applySettings, isSettingsUpdating, error };
}
