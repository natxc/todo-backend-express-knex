const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const app = require("./config/serverConfig.js");

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// const app = express();

const issuesRoute = require("./routes/issuesRoutes.js");
const teamsRoutes = require("./routes/teamsRoutes.js");
const projectsRoutes = require("./routes/projectsRoutes.js");
const usersRoutes = require("./routes/usersRoutes.js");
const commentsRoutes = require("./routes/commentsRoutes.js");

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');

const port = process.env.PORT || 5000;

const path = require('path');

// app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/swagger.json', (req, res) => {
  res.sendFile(path.join(__dirname, '/docs/swagger.json'));
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, { swaggerUrl: '/swagger.json' }));

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
