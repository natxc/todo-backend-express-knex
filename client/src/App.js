import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import { IssuesProvider } from './context/IssuesContext';
import { TeamsProvider } from './context/TeamsContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import IssuesPage from './pages/IssuesPage';
import IssueDetailsPage from './pages/IssueDetailsPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailsPage from './pages/TeamDetailsPage';
import ApiDocsRedirect from './pages/ApiDocsRedirect';
import Notes from './pages/Notes';

const App = () => {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <IssuesProvider>
          <TeamsProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/issues/:id" element={<IssueDetailsPage />} />
                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/teams/:id" element={<TeamDetailsPage />} />
                <Route path="/docs" element={<ApiDocsRedirect />} />
                <Route path="/notes" element={<Notes />} /> 
              </Routes>
            </Router>
          </TeamsProvider>
        </IssuesProvider>
      </ProjectsProvider>
    </AuthProvider>
  );
};

export default App;