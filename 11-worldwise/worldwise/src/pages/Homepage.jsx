import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Worldwise</h1>

      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
