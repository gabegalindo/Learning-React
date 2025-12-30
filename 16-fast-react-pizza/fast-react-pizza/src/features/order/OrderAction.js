import { updateOrder } from "../../services/apiRestaurant";

export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  let data = {};

  switch (intent) {
    case "priority": {
      data = { priority: true };
      break;
    }
    case "edit": {
      data = {
        customer: formData.get("customer"),
      };
      break;
    }
    default:
      return;
  }

  await updateOrder(params.orderId, data);
  return null;
}
