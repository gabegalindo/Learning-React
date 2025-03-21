import { use, useState } from "react";

const initialListings = [
  {
    name: "Forest House",
    price: 100,
    img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit qui, consequatur saepe molestias nemo quisquam laborum corrupti ducimus voluptatum error amet quia? Veritatis possimus quaerat voluptatum ex vel mollitia beatae.",
    saved: false,
  },
  {
    name: "Tree House",
    price: 250,
    img: "https://adirondackadventurebase.com/wp-content/uploads/2024/03/IMG_2178-1-1.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit qui, consequatur saepe molestias nemo quisquam laborum corrupti ducimus voluptatum error amet quia? Veritatis possimus quaerat voluptatum ex vel mollitia beatae.",
    saved: false,
  },
  {
    name: "Beach House",
    price: 370,
    img: "https://cdn.houseplansservices.com/product/ockj9ahd2d2da1suld5q38goce/w560x373.jpg?v=11",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit qui, consequatur saepe molestias nemo quisquam laborum corrupti ducimus voluptatum error amet quia? Veritatis possimus quaerat voluptatum ex vel mollitia beatae.",
    saved: false,
  },
  {
    name: "Lake House",
    price: 150,
    img: "https://59d27daa.delivery.rocketcdn.me/wp-content/uploads/2023/07/Pros-and-Cons-of-Buying-a-Lake-House.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit qui, consequatur saepe molestias nemo quisquam laborum corrupti ducimus voluptatum error amet quia? Veritatis possimus quaerat voluptatum ex vel mollitia beatae.",
    saved: false,
  },
];

export default function App() {
  const [listings, setListings] = useState(initialListings);
  const [selected, setSelected] = useState(null);
  const [bookMarkBtn, setBookmarkBtn] = useState(false);
  const [saveListing, setSaveListing] = useState([]);
  const [addListing, setAddListing] = useState(false);

  function handleSelected(listing) {
    setSelected(listing);
  }

  function handleBookmarkBtn() {
    setBookmarkBtn(!bookMarkBtn);
  }

  function handleSaveListing(listing) {
    if (listing.saved) {
      setSaveListing(
        saveListing.filter((saved) => saved.name !== listing.name)
      );
    } else {
      setSaveListing([...saveListing, listing]);
    }

    listing.saved = !listing.saved;
  }

  function handleAddListing() {
    setAddListing(!addListing);
  }

  function handleNewListing(listing) {
    setListings([...listings, listing]);
    setAddListing(false);
  }

  return (
    <div className="app-container">
      <TopBar
        onBookmarkBtn={handleBookmarkBtn}
        onAddListing={handleAddListing}
      />
      {addListing && <AddListing onNewListing={handleNewListing} />}
      {bookMarkBtn && (
        <BookMarks
          savedListings={saveListing}
          onSelect={handleSelected}
          onSaveListing={handleSaveListing}
        />
      )}

      <div className="main-content">
        <Listings
          listings={listings}
          selected={selected}
          onSelect={handleSelected}
          onSaveListing={handleSaveListing}
        />
        {!selected && <p>Pick a listing to see its details!</p>}
        {selected && <SelectedListing listing={selected} />}
      </div>
    </div>
  );
}

function TopBar({ onBookmarkBtn, onAddListing }) {
  return (
    <div className="top-bar">
      <h2>GaboBnB</h2>

      <button onClick={onAddListing}>Add A Listing</button>

      <button className="bookmark-button" onClick={onBookmarkBtn}>
        <img src="./button imgs/bookmarked.png" />
      </button>
    </div>
  );
}

function BookMarks({ savedListings, onSelect, onSaveListing }) {
  return (
    <div
      className={`bookmark-container ${
        savedListings.length > 0 ? "bookmark-dropdown" : "bookmark-empty"
      }`}
    >
      {savedListings < 1 && <p>No Listings have been Saved! Start Browsing!</p>}
      {savedListings?.map((listing) => (
        <Listing
          listing={listing}
          onClick={onSelect}
          onSaveListing={onSaveListing}
        />
      ))}
    </div>
  );
}

function Listings({ listings, onSelect, selected, onSaveListing }) {
  return (
    <div className="listings-container">
      {listings.map((listing) => (
        <Listing
          listing={listing}
          selected={selected}
          onClick={onSelect}
          onSaveListing={onSaveListing}
          key={listing.name}
        />
      ))}
    </div>
  );
}

function Listing({ listing, selected, onClick, onSaveListing }) {
  return (
    <div
      className={`listing ${selected?.name === listing.name ? "selected" : ""}`}
      onClick={() => onClick(listing)}
    >
      <img src={listing.img} alt="house" />
      <div className="listing-details">
        <h3>{listing.name}</h3>
        <p>${listing.price}/night</p>
      </div>
      <button
        className="bookmark-button2"
        onClick={(e) => {
          e.stopPropagation();
          onSaveListing(listing);
        }}
      >
        <img
          src={
            listing.saved
              ? "./button imgs/bookmarked.png"
              : "./button imgs/notbookmarked.png"
          }
        />
      </button>
    </div>
  );
}

function SelectedListing({ listing }) {
  return (
    <div className="details-container">
      <img src={listing.img} alt="house" />
      <h2>{listing.name}</h2>
      <p>
        <strong>${listing.price}/night</strong>
      </p>
      <p>{listing.desc}</p>
    </div>
  );
}

function AddListing({ onNewListing }) {
  const [URL, setURL] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) return;

    const newListing = {
      img: URL,
      name,
      price,
      desc: description,
    };

    onNewListing(newListing);

    setURL("");
    setName("");
    setPrice(0);
    setDescription("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Image</label>
        <input
          type="text"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
        />

        <label>Listing Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
