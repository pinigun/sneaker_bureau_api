import React, { useState } from "react";

export default function Stock() {
  const [category, setCategory] = useState("Категория");

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

    return (
      <div className="container-fluid px-0">
        <div className="w-full d-flex flex-fill flex-wrap gap-2 justify-content-start">
          <div className="dropdown">
            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
              {category}
            </button>
            <div className="dropdown-menu">
              <a onClick={() => handleCategoryChange("Кроссовки")} className="dropdown-item">Кроссовки</a>
              <a onClick={() => handleCategoryChange("Одежда")}  className="dropdown-item">Одежда</a>
              <a onClick={() => handleCategoryChange("Аксессуары")}  className="dropdown-item">Аксессуары</a>
            </div>
          </div>
          <a href="#" className="btn btn-outline-primary">Добавить товар</a>
          <a href="#" className="btn btn-outline-primary">Обновить товары</a>
          <a href="#" className="btn btn-outline-danger">Удалить товары</a>
        </div>
        <div className="table-responsive">
          <table className="my-4 table table-sm table-vcenter table-hover w-100">
            <thead>
              <tr>
                <th className="text-start">ID</th>
                <th className="text-start">Название</th>
                <th className="text-start">Изображение</th>
                <th className="text-start">Выручка</th>
                <th className="text-start">Количество</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }