const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const app = require("./config/serverConfig.js");

const issuesRoute = require("./routes/issuesRoutes.js");
const teamsRoutes = require("./routes/teamsRoutes.js");
const projectsRoutes = require("./routes/projectsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const commentsRoutes = require("./routes/commentsRoutes.js");

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const port = process.env.PORT || 5000;
// const app = express();

// app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/issues', issuesRoute);
app.use('/api/teams', teamsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);

app.use('/issues', issuesRoute);
app.use('/teams', teamsRoutes);
app.use('/projects', projectsRoutes);
app.use('/users', usersRoutes);
app.use('/comments', commentsRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`API docs available at http://localhost:${port}/api-docs`);
  });
}
module.exports = app;
