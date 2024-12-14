import React, { useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent,
  getStudents,
  searchStudents,
  updateStudent,
} from "../../services/api";
import "./styles.css";
import Button from "../../components/Button/Button";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const StudentsView = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    birth_date: "",
    gender: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [page, searchQuery]);

  const columns = [
    "id",
    "first_name",
    "last_name",
    "middle_name",
    "birth_date",
    "gender",
    "status",
  ];

  const fetchStudents = async () => {
    try {
      let response;
      if (searchQuery) {
        response = await searchStudents(searchQuery, page, pageSize);
      } else {
        response = await getStudents(page, pageSize);
      }
      setStudents(response.data);
      setTotalRows(response.totalRows);
      setTotalPages(Math.ceil(response.totalRows / pageSize));
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const openModal = (student = null) => {
    console.log(student);
    if (student && student.id) {
      setNewStudent({
        ...student,
        birth_date: formatDateForInput(student.birth_date),
      });
      setEditingStudent(student);
    } else {
      setNewStudent({
        first_name: "",
        last_name: "",
        middle_name: "",
        birth_date: "",
        gender: "",
      });
      setEditingStudent(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewStudent({
      first_name: "",
      last_name: "",
      middle_name: "",
      birth_date: "",
      gender: "",
      status: "",
    });
  };

  const handleSave = async () => {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, newStudent);
      } else {
        await createStudent(newStudent);
      }
      closeModal();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const genderOptions = [
    { value: "M", label: "Masculino" },
    { value: "F", label: "Femenino" },
  ];

  const statusOptions = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "suspended", label: "Suspendido" },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUpdateClick = (student) => {
    openModal(student);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDeleteClick = async (studentId) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que deseas eliminar este estudiante?"
    );
    if (confirmation) {
      try {
        await deleteStudent(studentId);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleViewScores = (studentId, firstName, lastName, middleName) => {
    navigate(`/scores/${studentId}`, {
      state: {
        firstName,
        lastName,
        middleName,
      },
    });
  };

  return (
    <div className="students-container">
      <div className="header">
        <h1>Listado de Estudiantes</h1>
        <div className="search-container">
          <Input
            type="text"
            name="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre o ID"
          />
        </div>
        <Button type="button" onClick={openModal}>
          Agregar Nuevo Estudiante
        </Button>
      </div>
      <Table
        columns={columns}
        data={students}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalRows={totalRows}
        onPageChange={handlePageChange}
        renderActions={(student) => (
          <>
            <button onClick={() => handleUpdateClick(student)}>
              <CiEdit />
            </button>
            <button onClick={() => handleDeleteClick(student.id)}>
              <CiTrash />
            </button>
            <button
              onClick={() =>
                handleViewScores(
                  student.id,
                  student.first_name,
                  student.last_name,
                  student.middle_name
                )
              }
            >
              Ver Calificaciones
            </button>
          </>
        )}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}>
        <div>
          <Input
            type="text"
            name="first_name"
            value={newStudent.first_name}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <Input
            type="text"
            name="last_name"
            value={newStudent.last_name}
            onChange={handleInputChange}
            placeholder="Apellido Paterno"
          />
          <Input
            type="text"
            name="middle_name"
            value={newStudent.middle_name}
            onChange={handleInputChange}
            placeholder="Apellido Materno"
          />
          <Input
            type="date"
            name="birth_date"
            value={newStudent.birth_date}
            onChange={handleInputChange}
            placeholder="Fecha de Nacimiento"
          />
          <Select
            name="gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            options={genderOptions}
            placeholder="Género"
          />
          {editingStudent && (
            <Select
              name="status"
              value={newStudent.status}
              onChange={handleInputChange}
              options={statusOptions}
              placeholder="Estado"
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default StudentsView;
