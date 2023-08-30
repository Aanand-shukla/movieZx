// import React from 'react'
import { useEffect, useState } from "react";
import "./details.css";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import Reviews from "./Reviews";
import { Audio } from "react-loader-spinner";
const Details = () => {
  const { id } = useParams();
  const [tail, setTail] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    certificate: "",
    rating: 0,
    rated: 0,
  });
  useEffect(() => {
    async function getdata() {
      setTail(true);
      const __doc = doc(db, "movies", id);
      const __data = await getDoc(__doc);
      setData(__data.data());
      setTail(false);
    }

    getdata();
  }, []);
  return (
    <div className="allAbout">
      {tail ? (
        <div className=" justify-center h-96 items-center">
          <Audio color="white" width="56px" height="420px" />
        </div>
      ) : (
        <div className="details">
          <div className="image">
            <img src={data.image} alt="" />
          </div>
          <div className="description">
            <div className="descr_MovieName">
              <h1>{data.title}</h1>
            </div>
            <div className="year">
              <h2>{data.year}</h2>
            </div>
            <ReactStars
              classNames="stars"
              count={5}
              size={24}
              isHalf={true}
              value={data.rating / data.rated}
              edit={false}
              activeColor="#ffd700"
              color="gray"
            />
            <div className="certificate">
              <h5>{data.certificate}</h5>
            </div>
            <div className="movie_desc">
              <h5>{data.description}</h5>
            </div>
            <Reviews id={id} prevRating={data.rating} rated={data.rated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
