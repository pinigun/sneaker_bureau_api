import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
      <aside className="navbar navbar-vertical navbar-expand-lg navbar-dark bg-primary w-10">
        <div className="container-fluid">
          <h1 className="navbar-brand">Admin</h1>
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav pt-lg-3">
              <li className="nav-item">
                <Link to="/" className="nav-link">📊 Статистика</Link>
              </li>
              <li className="nav-item">
                <Link to="/stock" className="nav-link">📦 Остатки товара</Link>
              </li>
              <li className="nav-item">
                <Link to="/sell" className="nav-link">💸 Продать оффлайн</Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    );
}