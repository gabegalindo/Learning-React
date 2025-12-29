import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";

function EditOrder() {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load("/");
      }
    },
    [fetcher],
  );

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
      <fetcher.Form
        onClick={(e) => e.stopPropagation()}
        className="z-[100] space-x-2 rounded-md bg-stone-200 px-4 py-6"
      >
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Name</label>
          <input className="input flex-grow grow"></input>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default EditOrder;
