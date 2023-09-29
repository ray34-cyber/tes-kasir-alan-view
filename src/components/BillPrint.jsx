import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  return (
    <div ref={ref} className="p-5 flex flex-col">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase text-xl bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Makanan
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr className="bg-white border-b text-lg font-bold" key={item.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.nama_makanan}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">Rp. {item.price}</td>
              <td className="px-6 py-4">Rp. {item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1 className="text-black text-2xl self-end">
        Total Amount: Rp. {totalAmount}
      </h1>
    </div>
  );
});
