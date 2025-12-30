import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <input type="hidden" name="intent" value="priority" />
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
