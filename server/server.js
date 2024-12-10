const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const app = require("./config/serverConfig.js");
const issuesRoute = require("./routes/issuesRoutes.js");
const teamsRoutes = require("./routes/teamsRoutes.js");
const projectsRoutes = require("./routes/projectsRoutes.js");
// const usersRoutes = require("./routes/usersRoutes.js");
const commentsRoutes = require("./routes/commentsRoutes.js");

const port = process.env.PORT || 5000;

app.use('/issues', issuesRoute);
app.use('/teams', teamsRoutes);
app.use('/projects', projectsRoutes);
// app.use('/users', usersRoutes);
app.use('/comments', commentsRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
