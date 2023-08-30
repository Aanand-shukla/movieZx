// import React from 'react'
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import "./card.css";
import { MovieCollection } from "../Firebase/Firebase";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ReactStars from "react-rating-stars-component";
import { getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
const Card = () => {
  const [movieData, setMovieData] = useState([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getdata() {
      setLoading(true);
      const __data = await getDocs(MovieCollection);
      __data.forEach((doc) => {
        // console.log(doc.data());
        setMovieData((prv) => [...prv, { ...doc.data(), id: doc.id }]);
      });
      setLoading(false);
    }
    getdata();
  }, []);
  return (
    <div className=" flex flex-wrap justify-between m-4 cardDetails  ">
      {loading ? (
        <div className="  flex justify-center  h-96 w-screen items-center ">
          <ThreeDots color="white" width="100px" />
        </div>
      ) : (
        movieData.map(({ id, image, year, title, time }, i) => {
          return (
            <div key={i} className=" bg-slate-800 card m-3 md:justify-center ">
              <div className="cards">
                <img className="img" src={image} alt="no" />
                <h4 className="m-1">Name: {title}</h4>
                <h4 className="m-2"> Year :{year}</h4>
                <ReactStars
                  value={4}
                  count={5}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                  color="gray"
                />
              </div>
              <div className="overlays">
                <img src={image} alt="" />
                <BookmarkBorderIcon className="bi" />
                <h4 className="m-2 movieName">{title}</h4>
                <div className="movieDesc">
                  <NavLink to={`/details/${id}`}>
                    <span>
                      <h3>Details</h3>
                    </span>
                  </NavLink>
                  <span>{time}</span>
                  <span>{year}</span>
                </div>
                <div className="buttons">
                  <button>Trailer</button>
                  <button
                    onClick={() => {
                      setShowList(!showList);
                    }}
                    className="watchOption"
                  >
                    Watch option <KeyboardArrowDownIcon />
                  </button>
                </div>

                {showList ? (
                  <ul className="movielist">
                    <li>
                      <a href="https://www.jiocinema.com">Jio Cinema</a>
                    </li>
                    <li>
                      <a href="https://www.hotstar.com">Hotstar</a>
                    </li>
                    <li>
                      <a href="https://www.netflix.com"> Netflix</a>
                    </li>
                    <li>
                      <a href="https://www.zeetv.com">Zee tv</a>
                    </li>
                    <li>
                      <a href="https://www.primevideo.com">Amazon Prime </a>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Card;
