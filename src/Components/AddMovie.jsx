// import React from 'react'
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { MovieCollection } from "../Firebase/Firebase";
import swal from "sweetalert";
const AddMovie = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    time: "",
    rated: 0,
    rating: 0,
    name: "",
  });

  const addMovie = async () => {
    setLoading(true);
    try {
      await addDoc(MovieCollection, form);
      swal({
        title: "sucessfully added",
        image: "success",
        buttons: false,
        timer: 3000,
      });
    } catch (err) {
      swal({
        title: err,
        image: err,
        buttons: false,
        timer: 300,
      });
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="grid md:block ">
        <div className="bg-gradient-to-r from-slate-600 to-slate-800 h-72 flex justify-center w-full">
          <div className="mt-10 text-white text-4xl font-bold">Add A Movie</div>
        </div>
        <div className="bg-white h-auto flex justify-center">
          <div className="bg-white shadow-lg -mt-40 md:w-1/2 grid lg:flex justify-center">
            <div className="w-3/4 lg:w-2/3 ">
              <div className="text-lg font-medium text-blue-600 m-6 ">
                Add Movie deatails
              </div>
              <div className="flex lg:flex-row flex-col ">
                <div className="m-6">
                  <p className="text-sm text-stone-400">Title</p>
                  <input
                    className="border-b-2  border-stone-400 text-stone-400"
                    value={form.title}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                      });
                    }}
                  />
                  <p className="text-sm text-stone-400 mt-6">Image</p>
                  <input
                    value={form.image}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        image: e.target.value,
                      });
                    }}
                    className="border-b-2 border-stone-400 text-stone-400 w-36"
                  />
                </div>

                <div className="m-6">
                  <p className="text-sm text-stone-400">year</p>
                  <input
                    value={form.year}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        year: e.target.value,
                      });
                    }}
                    className="border-b-2 border-stone-400 text-stone-400 w-36"
                  />
                  <p className="text-sm text-stone-400 mt-6">
                    time(hours:Minutes)
                  </p>
                  <input
                    value={form.time}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        time: e.target.value,
                      });
                    }}
                    className="border-b-2 border-stone-400 text-stone-400 w-36"
                  />
                </div>
              </div>
              <div className="m-6">
                <p className="text-sm text-stone-400">Enter Your Name</p>
                <input
                  value={form.name}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      name: e.target.value,
                    });
                  }}
                  className="border-b-2 border-stone-400 text-stone-400 w-36"
                />
              </div>
              <div className="m-6 ">
                <p className="text-sm text-stone-400 sm:flex">Description</p>
                <textarea
                  value={form.description}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      description: e.target.value,
                    });
                  }}
                  name=""
                  id=""
                  cols="50"
                  rows="5"
                  className="border-b-2 border-stone-400 text-stone-400"
                />
                <div
                  onClick={addMovie}
                  className="ml-34 mb-4 mr-4 mt-6   bg-gradient-to-r f from-slate-500 to-slate-800 rounded-3xl cursor-pointer text-white font-medium w-32 h-9 text-center pt-1 pb-1 "
                >
                  {loading ? (
                    <TailSpin height="30" width="130" ariaLabel="loading" />
                  ) : (
                    "Submit"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
