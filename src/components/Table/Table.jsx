import React from "react";
import "./styles.css";

const Table = ({
  columns,
  data,
  page,
  totalPages,
  totalRows,
  onPageChange,
  renderActions,
}) => {
  const renderRows = () => {
    return data.map((row, index) => (
      <tr key={index}>
        {renderActions && <td>{renderActions(row)}</td>}
        {columns.map((col, idx) => (
          <td key={idx}>{row[col]}</td>
        ))}
      </tr>
    ));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPagination = () => {
    if (!totalPages || totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${i === page ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="pagination-button"
        >
          Prev
        </button>
        {pageNumbers}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>{" "}
            </tr>
          ) : (
            renderRows()
          )}
        </tbody>
      </table>

      {totalRows > 0 && renderPagination()}
    </div>
  );
};

export default Table;
