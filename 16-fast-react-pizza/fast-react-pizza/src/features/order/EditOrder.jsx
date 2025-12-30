import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { useState } from "react";

function EditOrder({ order }) {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);

  const { customer } = order;

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  if (!isOpen) {
    return (
      <Button type="primary" onClick={toggleModal}>
        Edit Order Details
      </Button>
    );
  }

  return (
    <div
      className="absolute inset-0 z-[90] flex max-w-full items-center justify-center bg-stone-100/20 backdrop-blur-[2px]"
      onClick={toggleModal}
    >
      <div
        className="z-[100] rounded-md bg-stone-200 px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-7 font-semibold capitalize">
          Make changes to your order details
        </h2>
        <fetcher.Form method="PATCH" className="">
          <input type="hidden" name="intent" value="edit" />
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Name</label>
            <input
              className="input grow"
              name="customer"
              defaultValue={customer}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="delete" typeAttr="button" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="small" typeAttr="submit">
              Submit Changes
            </Button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}

export default EditOrder;

// export async function action({ request, params }) {
//   const data;
// }
