import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getScoresByStudentId, createScore } from "../../services/api-net";
import { getGrades, getSubjects } from "../../services/api";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Select from "../../components/Select/Select";
import Input from "../../components/Input/Input";
import "./styles.css";

const ScoresView = () => {
  const { studentId } = useParams();
  const [scores, setScores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newScore, setNewScore] = useState({
    StudentId: studentId,
    GradeId: null,
    SubjectId: null,
    Month: null,
    Score: null,
  });
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const { firstName, lastName, middleName } = location.state || {};
  const fullName = `${firstName} ${lastName} ${middleName}`;

  // Obtener calificaciones, grados y asignaturas al cargar la página
  useEffect(() => {
    fetchScores();
    fetchGrades();
    fetchSubjects();
  }, [studentId]);

  const columns = ["gradeName", "month", "subjectName", "score"];

  const months = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

  const fetchScores = async () => {
    setIsFetching(true);
    try {
      const response = await getScoresByStudentId(
        studentId,
        selectedGrade,
        selectedMonth
      );
      setScores(response.data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchGrades = async () => {
    try {
      const response = await getGrades();
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewScore({ ...newScore, [name]: value });
  };

  const handleSaveScore = async () => {
    try {
      await createScore(newScore);
      fetchScores();
      closeModal();
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewScore({
      StudentId: studentId,
      GradeId: null,
      SubjectId: null,
      Month: null,
      Score: null,
    });
  };

  const handleOpenModal = () => {
    newScore.GradeId = selectedGrade;
    newScore.Month = selectedMonth;
    setIsModalOpen(true);
  };

  return (
    <div className="scores-container">
      <h1>Calificaciones de {fullName}</h1>
      <div className="filters">
        <Select
          options={grades.map((grade) => ({
            value: grade.id,
            label: grade.name,
          }))}
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          placeholder="Seleccionar Grado"
        />
        <Select
          options={months}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          placeholder="Seleccionar Mes"
        />
        <Button onClick={fetchScores} disabled={isFetching}>
          Consultar
        </Button>
      </div>

      {selectedGrade && selectedMonth && (
        <Button type="button" onClick={handleOpenModal}>
          Agregar Calificación
        </Button>
      )}

      {scores && scores.length > 0 && (
        <div>
          {isFetching ? (
            <p>Cargando calificaciones...</p>
          ) : (
            <Table columns={columns} data={scores} />
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSaveScore}>
        <div>
          <Select
            name="GradeId"
            value={newScore.GradeId}
            onChange={handleInputChange}
            options={grades.map((grade) => ({
              value: grade.id,
              label: grade.name,
            }))}
            placeholder="Seleccionar Grado"
            disabled
          />
          <Select
            name="Month"
            value={newScore.Month}
            onChange={handleInputChange}
            options={months}
            placeholder="Seleccionar Mes"
            disabled
          />
          <Select
            name="SubjectId"
            value={newScore.SubjectId}
            onChange={handleInputChange}
            options={subjects.map((subject) => ({
              value: subject.id,
              label: subject.name,
            }))}
            placeholder="Seleccionar Asignatura"
          />
          <Input
            type="number"
            name="Score"
            value={newScore.Score}
            onChange={handleInputChange}
            placeholder="Calificación"
            step="0.1"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ScoresView;
