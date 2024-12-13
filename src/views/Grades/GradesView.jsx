import React, { useEffect, useState } from "react";
import { createGrade, getGrades } from "../../services/api";
import "./styles.css";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";

const GradesView = () => {
  const [grades, setGrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGrade, setNewGrade] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchGrades();
  }, [page]);

  const columns = ["id", "name"];

  const fetchGrades = async () => {
    try {
      const response = await getGrades(page);
      setGrades(response.data);
      setTotalRows(response.totalRows);
      setTotalPages(Math.ceil(response.totalRows / pageSize));
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewGrade(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewGrade("");
  };

  const handleSave = async () => {
    const response = await createGrade(newGrade);
    closeModal();
    fetchGrades();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="grades-container">
      <div className="header">
        <h1>Listado de Grados</h1>
        <Button type="button" onClick={openModal}>
          Agregar Nuevo Grado
        </Button>
      </div>
      <Table
        columns={columns}
        data={grades}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalRows={totalRows}
        onPageChange={handlePageChange}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}>
        <div>
          <Input
            type="text"
            name="name"
            value={newGrade}
            onChange={handleInputChange}
            placeholder="Grado"
          />
        </div>
      </Modal>
    </div>
  );
};

export default GradesView;
