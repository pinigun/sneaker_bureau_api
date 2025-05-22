import Sidebar from "./sidebar";

export default function Layout({ children }) {
  return (
    <div className="page">
      <Sidebar />
      <div className="page-wrapper">
        <div className="page-body">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}