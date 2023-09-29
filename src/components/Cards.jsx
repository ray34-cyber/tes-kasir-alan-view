import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/foods")
      .then((response) => setData([...response.data]));
  }, []);

  const addMenuToCart = async (food) => {
    let findProductInCart = await cart.find((i) => {
      return (i.id = food.id);
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id == food.id) {
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
        ...food,
        quantity: 1,
        totalAmount: food.price,
      };
      setCart([...cart, addingProduct]);
    }
  };

  return (
    <>
      {data.map((item) => (
        <button onClick={() => addMenuToCart(item)} key={item.id}>
          <div className="max-w-sm  rounded overflow-hidden shadow-lg flex flex-col justify-center items-center">
            <img
              className="w-full"
              src={`http://localhost:8000/storage/${item.image}`}
              alt={item.nama_makanan}
            />
            <div className="px-6 py-4 flex flex-col justify-center items-center">
              <h1 className="font-bold text-xl mb-2">{item.nama_makanan}</h1>
              <p className=" font-bold text-lg text-[#5ebff1]">
                Rp. {item.price}
              </p>
            </div>
          </div>
        </button>
      ))}
    </>
  );
};

export default Cards;
