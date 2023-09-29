import React, { useState } from "react";
import Dropzone from "../components/Dropzone";
import axios from "axios";

const TambahMenu = () => {
  const [data, setdata] = useState({
    nama_makanan: "",
    image: "",
    price: "",
  });
  const [errorMessage, setErrorMessage] = useState({});

  const handleImage = (image) => {
    setdata((prevData) => ({ ...prevData, image: image[0] }));
  };

  const createFood = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_makanan", data.nama_makanan);
    formData.append("image", data.image);
    formData.append("price", data.price);

    await axios
      .post("http://localhost:8000/api/foods", formData)
      .then(() => (window.location.pathname = "/food"))
      .catch((errors) => setErrorMessage(errors.response.data.errors));
  };

  return (
    <div className="container mx-auto my-8">
      <div className="w-full bg-white p-16 py-12">
        <h1 className="text-2xl text-[#74bccf] mb-8">Tambahkan Menu</h1>
        <form
          className="flex flex-col"
          onSubmit={createFood}
          encType="multipart/form-data"
        >
          <label htmlFor="namaMakanan" className="block mb-3 text-[#aaaaaa]">
            Nama Menu
          </label>
          <input
            type="text"
            id="namaMakanan"
            className="w-full focus:outline-none h-10 border-2 pl-3 mb-3 border-[#f0f0f0]"
            onChange={(e) =>
              setdata((prevData) => ({
                ...prevData,
                nama_makanan: e.target.value,
              }))
            }
          />
          {errorMessage?.nama_makanan && errorMessage?.nama_makanan[0] && (
            <p className="text-red-500 mb-2">{errorMessage.nama_makanan[0]}</p>
          )}
          <label className="block mb-3 text-[#aaaaaa]">Foto Menu</label>
          <Dropzone handleImage={handleImage} />
          {errorMessage?.image && errorMessage?.image[0] && (
            <p className="text-red-500 mb-3">{errorMessage.image[0]}</p>
          )}
          <label htmlFor="hargaMenu" className="block my-3">
            Harga Menu
          </label>
          <div className="relative mb-4 flex flex-wrap items-stretch">
            <span
              className="flex bg-[#03abea] items-center whitespace-nowrap rounded-l border border-r-0 border-solid text-white border-neutral-300 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]"
              id="inputGroup-sizing-default"
            >
              Rp.
            </span>
            <input
              type="number"
              className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border-2 pl-3 border-solid border-[#f0f0f0] focus:outline-none"
              onChange={(e) =>
                setdata((prevData) => ({
                  ...prevData,
                  price: e.target.value,
                }))
              }
            />
          </div>
          {errorMessage?.price && errorMessage?.price[0] && (
            <p className="text-red-500 mb-2 mt-1">{errorMessage.price[0]}</p>
          )}
          <button
            className="self-end mt-6 bg-[#7caf84] px-16 py-3 text-white text-xl"
            type="submit"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default TambahMenu;
