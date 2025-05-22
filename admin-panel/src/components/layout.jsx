import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="page">
      <Sidebar />
      <div className="page-wrapper">
        <div className="page-body">
          <div className="container-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}