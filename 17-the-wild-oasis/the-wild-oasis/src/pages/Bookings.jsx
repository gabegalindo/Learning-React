import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import useBookings from "../features/bookings/useBookings";
import BookingTableOperations from "../features/bookings/BookingTableOperations";

function Bookings() {
  const res = useBookings();
  console.log(res);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
