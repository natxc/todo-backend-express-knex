import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/HomePage';
import ApiDocsRedirect from './pages/ApiDocsRedirect';
import Notes from './pages/Notes';

import { ProjectsProvider } from './context/ProjectsContext';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailsPage from './pages/Projects/ProjectDetailsPage';
import CreateProjectPage from './pages/Projects/CreateProjectsPage';
import EditProjectPage from './pages/Projects/EditProjectPage';

import { IssuesProvider } from './context/IssuesContext';
import IssuesPage from './pages/Issues/IssuesPage';
import IssueDetailsPage from './pages/Issues/IssueDetailsPage';
import CreateIssuePage from './pages/Issues/CreateIssuesPage';
import EditIssuePage from './pages/Issues/EditIssuePage';

import { TeamsProvider } from './context/TeamsContext';
import TeamsPage from './pages/Teams/TeamsPage';
import TeamDetailsPage from './pages/Teams/TeamDetailsPage';
import CreateTeamPage from './pages/Teams/CreateTeamPage';
import EditTeamPage from './pages/Teams/EditTeamPage';

const App = () => {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <IssuesProvider>
          <TeamsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
                <Route path="/login" element={<Navigate to="/" replace />} />

                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/new" element={<CreateProjectPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/projects/:id/edit" element={<EditProjectPage />} />

                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/issues/new" element={<CreateIssuePage />} />
                <Route path="/issues/:id" element={<IssueDetailsPage />} />
                <Route path="/issues/:id/edit" element={<EditIssuePage />} />

                <Route path="/teams" element={<TeamsPage />} />
                <Route path="/teams/new" element={<CreateTeamPage />} />
                <Route path="/teams/:id" element={<TeamDetailsPage />} />
                <Route path="/teams/:id/edit" element={<EditTeamPage />} />

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
