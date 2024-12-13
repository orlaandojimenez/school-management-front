import React, { useEffect, useState } from "react";
import { createSubject, getSubjects } from "../../services/api";
import "./styles.css";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";

const SubjectsView = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    fetchSubjects();
  }, [page]);

  const columns = ["id", "name"];

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects(page);
      setSubjects(response.data);
      setTotalRows(response.totalRows);
      setTotalPages(Math.ceil(response.totalRows / pageSize));
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewSubject(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewSubject("");
  };

  const handleSave = async () => {
    const response = await createSubject(newSubject);
    closeModal();
    fetchSubjects();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="subjects-container">
      <div className="header">
        <h1>Listado de Materias</h1>
        <Button type="button" onClick={openModal}>
          Agregar Nueva Materia
        </Button>
      </div>
      <Table
        columns={columns}
        data={subjects}
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
            value={newSubject}
            onChange={handleInputChange}
            placeholder="Materia"
          />
        </div>
      </Modal>
    </div>
  );
};

export default SubjectsView;
