import sneakersImage from '../assets/sneakers.jpg';
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function SalesTypeChart({ data, total }) {
    return (
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.3rem", fontWeight: "bold", fontSize: "3rem" }}>
          Общая выручка: {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(total)}
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip formatter={(value) =>
                new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value)
              } />
              <Bar dataKey="amount" fill="#4e73df" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  

export default function Dashboard() {
  const imagePath = sneakersImage;

  const productTypes = {
    "Nike Air": "Кроссовки",
    "Adidas Ultraboost": "Кроссовки",
    "Puma Suede": "Кроссовки",
    "Reebok Classic": "Кроссовки",
    "New Balance 574": "Кроссовки",
    "Asics Gel": "Кроссовки",
    "Vans Old Skool": "Кроссовки",
    "Nike Cap": "Аксессуары",
    "Adidas Bag": "Аксессуары",
    "Nike Hoodie": "Одежда",
    "Puma Jacket": "Одежда"
  };

  const generateProducts = () => {
    const names = Object.keys(productTypes);

    const products = [];
    for (let i = 1; i <= 30; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const quantity = Math.floor(Math.random() * 10) + 1;
      const price = Math.floor(Math.random() * 5000) + 3000;
      const revenue = quantity * price;
      const type = productTypes[name];

      products.push({
        id: i.toString().padStart(3, "0"),
        name,
        image: imagePath,
        revenue,
        quantity,
        type,
      });
    }
    return products;
  };

  const [soldproducts, setSoldProducts] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const products = generateProducts();
    setSoldProducts(products);

    const revenueByType = {};
    for (const product of products) {
      if (!revenueByType[product.type]) {
        revenueByType[product.type] = 0;
      }
      revenueByType[product.type] += product.revenue;
    }

    const data = Object.entries(revenueByType).map(([type, amount]) => ({
      type,
      amount
    }));

    setChartData(data);

    const total = data.reduce((sum, item) => sum + item.amount, 0);
    setTotalRevenue(total);

  }, []);

  return (
    <div className="container-fluid px-0">
      <h2 className="mb-4">Статистика продаж</h2>

      <SalesTypeChart data={chartData} total={totalRevenue} />

      <div className="table-responsive" style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <table className="table table-sm table-vcenter table-hover w-100">
          <thead className="sticky-top bg-white">
            <tr>
              <th className="text-start">ID</th>
              <th className="text-start">Название</th>
              <th className="text-start">Изображение</th>
              <th className="text-start">Выручка</th>
              <th className="text-start">Количество</th>
            </tr>
          </thead>
          <tbody>
            {soldproducts.map((p) => (
              <tr key={p.id}>
                <td className="text-start">{p.id}</td>
                <td className="text-start">{p.name}</td>
                <td className="text-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: 50, height: "auto" }}
                  />
                </td>
                <td className="text-start">{p.revenue}</td>
                <td className="text-start">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
