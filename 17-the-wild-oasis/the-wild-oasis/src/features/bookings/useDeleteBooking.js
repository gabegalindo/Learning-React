import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isDeletingBooking,
    error,
  } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Successfully deleted booking");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("Error deleting booking"),
  });

  return { mutate, isDeletingBooking, error };
}
