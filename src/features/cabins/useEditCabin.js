import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      toast.promise(createEditCabin(newCabinData, id), {
        loading: "Updating cabin...",
        success: "Cabin Data Updated",
        error: (err) => err.message,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isUpdating, updateCabin };
}
