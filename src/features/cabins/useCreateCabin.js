import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data) =>
      toast.promise(createEditCabin(data), {
        loading: "Creating new cabin...",
        success: "New Cabin is created Successfully",
        error: (err) => err.message,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });

  return { isCreating, createCabin };
}
