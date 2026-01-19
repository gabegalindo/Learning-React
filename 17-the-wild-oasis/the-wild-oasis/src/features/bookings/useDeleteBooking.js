import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteBooking,
    isPending: isDeletingBooking,
    error,
  } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Successfully deleted booking");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("Error deleting booking"),
  });

  return { deleteBooking, isDeletingBooking, error };
}
