import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginFormView from "./views/Login/LoginFormView";
import HomeView from "./views/Home/HomeView";
import Layout from "./components/Layout/Layout";
import SubjectsView from "./views/Subjects/SubjectsView";
import GradesView from "./views/Grades/GradesView";
import StudentsView from "./views/Students/StudentsView";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginFormView />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomeView />} />
          <Route path="/subjects" element={<SubjectsView />} />
          <Route path="/grades" element={<GradesView />} />
          <Route path="/students" element={<StudentsView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
