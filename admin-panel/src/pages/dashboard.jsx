export default function Dashboard() {
    const imagePath = "";
    const generateProducts = () => {
        const names = [
        "Nike Air", "Adidas Ultraboost", "Puma Suede",
        "Reebok Classic", "New Balance 574", "Asics Gel", "Vans Old Skool"
        ];

        const products = [];
        for (let i = 1; i <= 30; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const quantity = Math.floor(Math.random() * 10) + 1;
        const price = Math.floor(Math.random() * 5000) + 3000;
        const revenue = quantity * price;

        products.push({
            id: i.toString().padStart(3, "0"),
            name: `Кроссовки ${name}`,
            image: imagePath,
            revenue,
            quantity,
        });
        }
        return products;
    };

    const soldproducts = generateProducts();
    return (
      <div className="container-fluid">
        <div className="mb-3">
            <table className="sticky-top table-vcenter table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Название</th>
                    <th scope="col">Изображение</th>
                    <th scope="col">Выручка</th>
                    <th scope="col">Количество</th>
                    </tr>
                </thead>
                <tbody>
                    {soldproducts.map((p) => (
                    <tr className="table-danger" key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td><img src={p.image} alt={p.name} style={{ width: 50 }} /></td>
                        <td>{p.revenue}</td>
                        <td>{p.quantity}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
  }
  