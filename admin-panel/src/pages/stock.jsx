import React, { useState } from "react";
import axios from "axios";

const tableData = {
  Кроссовки: {
    columns: ["ID", "Название", "Изображение", "Выручка", "Количество"],
    rows: [
      { id: 1, name: "Nike Air", img: "nike.jpg", revenue: 10000, qty: 5 },
      { id: 2, name: "Adidas Yeezy", img: "yeezy.jpg", revenue: 8000, qty: 3 },
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

export default function Stock() {
  const [category, setCategory] = useState("Кроссовки");
  const [data, setData] = useState(tableData);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);

  const currentTable = tableData[category];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const openModal = (item = null) => {
    setModalItem(item);
    setShowModal(true);
  };

  const handleSave = (item) => {
    setData((prev) => {
      const rows = modalItem
        ? prev[category].rows.map((r) => (r.id === item.id ? item : r))
        : [...prev[category].rows, { ...item, id: Date.now() }];
      return { ...prev, [category]: { ...prev[category], rows } };
    });
    setShowModal(false);
    setModalItem(null);
  };

  const handleEdit = () => setEditMode(true);
  const handleSaveEdit = () => {
    setEditMode(false);
  };
  const handleDeleteMode = () => setDeleteMode(true);

  const handleDelete = () => {
    setData((prev) => {
      const rows = prev[category].rows.filter((r) => !selected.includes(r.id));
      return { ...prev, [category]: { ...prev[category], rows } };
    });
    setSelected([]);
    setDeleteMode(false);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const Modal = () =>
    showModal && (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const item = {};
                data[category].columns.forEach((col) => {
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
                  const key = keyMap[col];
                  item[key] = form[key]?.value || "";
                });
                if (modalItem) item.id = modalItem.id;
                handleSave(item);
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalItem ? "Редактировать товар" : "Добавить товар"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label>Тип товара</label>
                  <select
                    name="category"
                    className="form-select"
                    defaultValue={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {Object.keys(data).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {data[category].columns
                  .filter((col) => col !== "ID")
                  .map((col) => {
                    const keyMap = {
                      "Название": "name",
                      "Изображение": "img",
                      "Выручка": "revenue",
                      "Количество": "qty",
                      "Размер": "size",
                      "Цена": "price",
                      "Тип": "type",
                    };
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
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="container-fluid px-0">
      <Modal />
      <div className="w-full d-flex flex-fill flex-wrap gap-2 justify-content-start">
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
          className="btn btn-outline-primary"
          onClick={handleEdit}
          disabled={editMode}
        >
          Обновить товары
        </button>
        {editMode && (
          <button className="btn btn-success" onClick={handleSaveEdit}>
            Сохранить
          </button>
        )}
        <button
          className="btn btn-outline-danger"
          onClick={handleDeleteMode}
          disabled={deleteMode}
        >
          Удалить товары
        </button>
        {deleteMode && (
          <button className="btn btn-danger" onClick={handleDelete}>
            Удалить выбранные
          </button>
        )}
      </div>
      <div className="table-responsive">
        <table className="my-4 table table-sm table-vcenter table-hover w-100">
          <thead>
            <tr>
              {deleteMode && <th></th>}
              {currentTable.columns.map((col) => (
                <th key={col} className="text-start">
                  {col}
                </th>
              ))}
              {editMode && <th>Действия</th>}
            </tr>
          </thead>
          <tbody>
            {currentTable.rows.map((row, idx) => (
              <tr key={row.id}>
                {deleteMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => handleSelect(row.id)}
                    />
                  </td>
                )}
                {currentTable.columns.map((col) => {
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
                  const key = keyMap[col];
                  if (col === "Изображение" && row[key]) {
                    return (
                      <td key={col}>
                        <img src={row[key]} alt="" width={40} />
                      </td>
                    );
                  }
                  if (editMode && col !== "ID") {
                    return (
                      <td key={col}>
                        <input
                          className="form-control"
                          defaultValue={row[key]}
                          onChange={(e) => {
                            const value = e.target.value;
                            setData((prev) => {
                              const rows = prev[category].rows.map((r) =>
                                r.id === row.id
                                  ? { ...r, [key]: value }
                                  : r
                              );
                              return {
                                ...prev,
                                [category]: { ...prev[category], rows },
                              };
                            });
                          }}
                        />
                      </td>
                    );
                  }
                  return <td key={col}>{row[key]}</td>;
                })}
                {editMode && (
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => openModal(row)}
                    >
                      Редактировать
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
}