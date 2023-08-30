import { ReviewsCollection, db } from "../Firebase/Firebase";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import swal from "sweetalert";
import ReactStars from "react-stars";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

const Reviews = ({ id, prevRating, rated }) => {
  let [rating, setRating] = useState(0);
  const [loadreview, setLoadReview] = useState(false);
  const [loading, setLoading] = useState(false);
  let [form, setForm] = useState("");
  const [reviews, setReview] = useState([]);

  async function collectReviews() {
    try {
      await addDoc(ReviewsCollection, {
        movieId: id,
        name: name,
        rating: rating,
        rated: 0,
        review: form,
        time_stamp: new Date().getTime(),
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: rated + 1,
      });
      setForm("");
      setRating(0),
        swal({
          title: "Review Submitted",
          image: "success",
          buttons: false,
          timer: 2000,
        });

      setLoading(false);
    } catch (err) {
      swal({
        title: err.message,
        image: "success",
        buttons: false,
        timer: 2000,
      });
    }
  }

  useEffect(() => {
    async function getData() {
      setLoadReview(true);
      let queries = query(ReviewsCollection, where("movieId", "==", id));
      const querySnapShot = await getDocs(queries);
      querySnapShot.forEach((doc) => {
        setReview((prv) => [...prv, doc.data()]);
        setLoadReview(false);
      });
    }

    getData();
  }, []);

  return (
    <div className="mt-4 w-full">
      <ReactStars
        className="mb-3"
        count={5}
        size={30}
        isHalf={true}
        value={rating}
        edit={true}
        activeColor="gray"
        color="#ffd700"
        onChange={(rate) => {
          setRating(rate);
        }}
      />
      <input
        type="text"
        value={form}
        placeholder="Write about the movie"
        className="w-full p-2 border-0 bg-gray-950 outline-0"
        onChange={(e) => {
          setForm(e.target.value);
        }}
      />
      <button
        onClick={collectReviews}
        className="w-full flex bg-green-600 hover:bg-green-400 color p-1 justify-center"
      >
        {loading ? <TailSpin height={30} color="white" /> : "Submit"}
      </button>

      <div>
        {loadreview ? (
          <div className="p-3 mt-5 flex justify-center items-center">
            <ThreeDots color="#fff" height={15} />
          </div>
        ) : (
          <div>
            {reviews.map(({ review, rating, name, time_stamp }, i) => {
              return (
                <div className="mt-4 bg-neutral-800  p-3" key={i}>
                  <h2 className="text-blue-500">{name}</h2>
                  <h4>{review}</h4>
                  <h4>
                    <ReactStars
                      count={5}
                      size={20}
                      isHalf={true}
                      value={rating}
                      edit={false}
                    />
                  </h4>
                  <span>{new Date(time_stamp).toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  id: PropTypes.string,
  prevRating: PropTypes.number,
  rated: PropTypes.number,
};
export default Reviews;
