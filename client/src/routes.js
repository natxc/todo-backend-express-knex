import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import IssuesPage from './pages/IssuesPage';
import IssueDetailsPage from './pages/IssueDetailsPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailsPage from './pages/TeamDetailsPage';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/issues/:id" element={<IssueDetailsPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailsPage />} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
