import React, { useEffect, useState, useRef } from "react";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";
import { ComponentToPrint } from "../components/BillPrint";
import { useReactToPrint } from "react-to-print";

const Transaksi = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/foods")
      .then((response) => setData([...response.data]));
  }, []);

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const addProductToCart = async (product) => {
    let findProductInCart = await cart.find((i) => {
      return i.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
    }
  };

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const handlePrint = () => {
    handleReactToPrint();
  };

  const handleCharge = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const charge = () => {
    if (payment < totalAmount) {
      alert("Uang Anda Kurang!");
      closeModal();
    } else if (payment >= totalAmount) {
      let kembalian = payment - totalAmount;
      alert(
        `Berikut adalah kembalian uang Anda : ${kembalian}, Terima kasih sudah makan di Alan Resto!`
      );
      closeModal();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto my-7 gap-4 md:gap-6">
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item) => (
          <button onClick={() => addProductToCart(item)} key={item.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full max-w-full"
                srcSet={`http://localhost:8000/storage/${item.image} 300w, http://localhost:8000/storage/${item.image} 600w`}
                sizes="(max-width: 600px) 100vw, 50vw"
                alt={item.nama_makanan}
              />
              <div className="px-4 py-2">
                <h1 className="font-bold text-xl mb-1 md:text-lg lg:text-xl">
                  {item.nama_makanan}
                </h1>
                <p className="font-bold text-lg text-[#5ebff1]">
                  Rp. {item.price}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="md:col-span-1 bg-white shadow-md flex flex-col items-center py-4 md:py-10 md:h-[800px] px-8">
        <div className="flex items-center text-xl font-bold">
          <BiUserCircle size={60} /> Pesanan
        </div>
        <div style={{ display: "none" }}>
          <ComponentToPrint
            cart={cart}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        </div>
        <div className="overscroll-y-auto mt-4 max-h-[300px] overflow-y-auto">
          {cart.map((cartFood, key) => (
            <div
              className="flex flex-col md:flex-row justify-between items-center my-2 md:my-3 border-b py-2 px-4"
              key={key}
            >
              <img
                src={`http://localhost:8000/storage/${cartFood.image}`}
                alt={cartFood.nama_makanan}
                className="w-16 md:w-24 flex-grow-0 mb-2 md:mb-0"
              />
              <p className="font-bold flex-grow text-base md:text-lg lg:text-xl text-center md:text-left">
                {cartFood.nama_makanan}
              </p>
              <p className="flex-grow-0 pr-1 text-sm md:text-base lg:text-lg font-bold">
                X {cartFood.quantity}
              </p>
              <p className="flex-grow-0 text-sm md:text-base lg:text-lg text-[#5ebff1] font-bold">
                Rp. {cartFood.totalAmount}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4"></div>
        <button
          className="mt-7 w-full rounded-md border-2 border-[#eab1b1] py-2 text-[#eab1b1] font-bold text-xl"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <div className="flex w-full justify-between gap-x-5 mt-6">
          <button
            onClick={() => alert("Pesanan sudah")}
            className="bg-[#7cb083] w-1/2 py-2 rounded-sm text-white text-lg font-semibold"
          >
            Save Bill
          </button>
          <button
            onClick={handlePrint}
            className="bg-[#7cb083] w-1/2 py-2 rounded-sm text-white text-lg font-semibold"
          >
            Print Bill
          </button>
        </div>
        <button
          onClick={handleCharge}
          className="mt-7 w-full rounded-md border-2 bg-[#00acee] py-2 text-white font-bold text-xl"
        >
          Charge Rp. ${totalAmount}
        </button>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md w-[1200px]">
              <h2 className="text-2xl font-bold mb-4">Detail Pesanan</h2>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-8 overflow-y-auto max-h-[200px]">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">No.</th>
                        <th className="text-left">Nama</th>
                        <th className="text-left">Foto</th>
                        <th className="text-left">Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((cartFood, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{cartFood.nama_makanan}</td>
                          <td>
                            <img
                              src={`http://localhost:8000/storage/${cartFood.image}`}
                              alt={cartFood.nama_makanan}
                              className="w-16 md:w-24"
                            />
                          </td>
                          <td>Rp. {cartFood.totalAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-span-4 border-l-2 pl-4">
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="mb-4 flex flex-col items-center gap-3 justify-center">
                      <label className="text-lg font-bold block">
                        Uang Pembeli:
                      </label>
                      <input
                        type="number"
                        className="border border-gray-300 p-1 w-full rounded-sm"
                        value={payment}
                        onChange={handlePaymentChange}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="mr-4 px-[26px] py-2 bg-white text-[#8d8d8d] border-2 rounded-sm"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                      <button
                        className="px-[26px] py-2 bg-[#00acee] text-white rounded-sm"
                        onClick={charge}
                      >
                        Pay!
                      </button>
                    </div>
                    <p className="self-center mr-28 mt-3 text-[#b26f6d]">
                      Kembalian :
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaksi;
