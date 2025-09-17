import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deletCabinApi } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) =>
      toast.promise(deletCabinApi(id), {
        loading: "Deleting cabin...",
        success: "Cabin successfully deleted",
        error: (err) => err.message,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
  });

  return { isDeleting, deleteCabin };
}
