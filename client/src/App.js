import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ApiDocsRedirect from './pages/ApiDocsRedirect';
import Notes from './pages/Notes';

import { ProjectsProvider } from './context/ProjectsContext';
import ProjectsPage from './pages/Projects/ProjectsPage';
import ProjectDetailsPage from './pages/Projects/ProjectDetailsPage';

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                <Route path="/issues" element={<IssuesPage />} />
                <Route path="/issues/:id" element={<IssueDetailsPage />} />
                <Route path="/issues/new" element={<CreateIssuePage />} />
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