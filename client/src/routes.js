import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailsPage from './pages/Projects/ProjectDetailsPage';
import IssuesPage from './pages/Issues/IssuesPage';
import IssueDetailsPage from './pages/Issues/IssueDetailsPage';
import TeamsPage from './pages/Teams/TeamsPage';
import TeamDetailsPage from './pages/Teams/TeamDetailsPage';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
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
