import img from "./../assets/image/mochi-young-woman-busy-with-her-work-in-office.png";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="not-found">
      <div class="container text-center">
        <div class="image-container ">
          <img src={img} alt="img" class="img-fluid" />
        </div>
        <h1 class="">404 (Not Found)</h1>
        <p class=" subtitle">The url you visited is not found </p>
        <Link to="/">
          <button type="submit" className="btn btn-primary  ">
            Back to Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}
