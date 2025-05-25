import React, { useState, useMemo } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";

import Modal from "../components/modal.jsx";

const tableData = {
  Кроссовки: {
    columns: ["ID", "Название", "Изображение", "Выручка", "Количество"],
    rows: [
      { id: 1, name: "Nike Air", img: "nike.jpg", revenue: 10000, qty: 5 },
      { id: 2, name: "Adidas Yeezy", img: "yeezy.jpg", revenue: 8000, qty: 3 },
      { id: 3, name: "Nike Air", img: "nike.jpg", revenue: 10000, qty: 5 },
      { id: 4, name: "Adidas Yeezy", img: "yeezy.jpg", revenue: 8000, qty: 3 },
      { id: 5, name: "Puma RS-X", img: "puma.jpg", revenue: 6000, qty: 4 },
      { id: 6, name: "Reebok Classic", img: "reebok.jpg", revenue: 5000, qty: 2 },
      { id: 7, name: "New Balance 574", img: "newbalance.jpg", revenue: 7000, qty: 6 },
      { id: 8, name: "Asics Gel", img: "asics.jpg", revenue: 5500, qty: 3 },
      { id: 9, name: "Vans Old Skool", img: "vans.jpg", revenue: 4000, qty: 8 },
      { id: 10, name: "Nike Air Max", img: "airmax.jpg", revenue: 9000, qty: 4 },
    ],
  },
  Одежда: {
    columns: ["ID", "Название", "Размер", "Цена", "Количество"],
    rows: [
      { id: 1, name: "Футболка", size: "M", price: 1500, qty: 10 },
      { id: 2, name: "Куртка", size: "L", price: 5000, qty: 2 },
    ],
  },
  Аксессуары: {
    columns: ["ID", "Название", "Тип", "Цена", "Количество"],
    rows: [
      { id: 1, name: "Рюкзак", type: "Сумка", price: 2000, qty: 7 },
      { id: 2, name: "Кепка", type: "Головной убор", price: 800, qty: 15 },
    ],
  },
};

const keyMap = {
  "ID": "id",
  "Название": "name",
  "Изображение": "img",
  "Выручка": "revenue",
  "Количество": "qty",
  "Размер": "size",
  "Цена": "price",
  "Тип": "type",
};

export default function Stock() {
  const [category, setCategory] = useState("Кроссовки");
  const [data, setData] = useState(tableData);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState([]);

  const LIMIT = 5;

  const filteredRows = useMemo(() => {
    if (!search) return data[category].rows;
    return data[category].rows.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data, category]);

  const pagination = usePagination(
    { nodes: filteredRows },
    {
      state: { page: 0, size: LIMIT },
    }
  );
  const columns = useMemo(() => {
    const baseCols = data[category].columns.map((col) => ({
      label: col,
      renderCell: (item) =>
        col === "Изображение"
          ? <img src={item[keyMap[col]]} alt="" width={40} />
          : item[keyMap[col]],
    }));
    if (deleteMode) {
      return [
        {
          label: "",
          renderCell: (item) => (
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => handleSelect(item.id)}
            />
          ),
          pinLeft: true,
        },
        ...baseCols,
      ];
    }
    return baseCols;
  }, [category, data, deleteMode, selected]);
  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const openModal = (item = null) => {
    setModalItem(item);
    setShowModal(true);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {};
    data[category].columns.forEach((col) => {
      const key = keyMap[col];
      item[key] = form[key]?.value || "";
    });
    if (modalItem) item.id = modalItem.id;
    else item.id = Date.now();

    setData((prev) => {
      const rows = modalItem
        ? prev[category].rows.map((r) => (r.id === item.id ? item : r))
        : [...prev[category].rows, item];
      return { ...prev, [category]: { ...prev[category], rows } };
    });
    setShowModal(false);
    setModalItem(null);
  };
  const handleDeleteMode = () => {
    setDeleteMode(true);
    setSelected([]);
  };
  const handleDelete = () => {
    setData((prev) => {
      const rows = prev[category].rows.filter(
        (r) => !selected.includes(r.id)
      );
      return { ...prev, [category]: { ...prev[category], rows } };
    });
    setSelected([]);
    setDeleteMode(false);
  };

  return (
    <div className="container-fluid px-0">
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSave}
        title={modalItem ? "Редактировать товар" : "Добавить товар"}
      >
        {data[category].columns
          .filter((col) => col !== "ID")
          .map((col) => {
            const key = keyMap[col];
            return (
              <div className="mb-2" key={col}>
                <label>{col}</label>
                <input
                  name={key}
                  className="form-control"
                  defaultValue={modalItem?.[key] || ""}
                  required={col !== "Изображение"}
                />
              </div>
            );
          })}
      </Modal>
      <div className="w-full d-flex flex-fill flex-wrap gap-2 justify-content-start mb-2">
        <div className="dropdown">
          <button
            type="button"
            className="btn dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {category}
          </button>
          <div className="dropdown-menu">
            {Object.keys(data).map((cat) => (
              <a
                key={cat}
                onClick={() => setCategory(cat)}
                className="dropdown-item"
                style={{ cursor: "pointer" }}
              >
                {cat}
              </a>
            ))}
          </div>
        </div>
        <button className="btn btn-outline-primary" onClick={() => openModal()}>
          Добавить товар
        </button>
        <button
          className="btn btn-outline-danger"
          onClick={handleDeleteMode}
          disabled={deleteMode}
        >
          Удалить товары
        </button>
        {deleteMode && (
          <button className="btn btn-danger" onClick={handleDelete} disabled={selected.length === 0}>
            Удалить выбранные
          </button>
        )}
        <input
          className="form-control"
          style={{ width: 200 }}
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
          <CompactTable
          columns={columns}
          data={{ nodes: filteredRows }}
          pagination={pagination}
          rowProps={(item) => ({
            onDoubleClick: () => openModal(item),
            style: selected.includes(item.id)
              ? { background: "#ffe0e0" }
              : {},
          })}
        />
      <div className="mt-2">
        <span>
          Страница:{" "}
          {Array.from({ length: pagination.state.pages }).map((_, idx) => (
            <button
              key={idx}
              className="btn btn-sm btn-light mx-1"
              style={{
                fontWeight: pagination.state.page === idx ? "bold" : "normal",
              }}
              onClick={() => pagination.fns.onSetPage(idx)}
            >
              {idx + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}