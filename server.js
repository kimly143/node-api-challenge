const express = require('express');
const projectRouter = require('./projectsRouter');
const actionRouter = require('./actionsRouter');
const app = express();

app.use(express.json());

//use projectRouter for any route start with projects
app.use('/api/projects', projectRouter);
//mount to actions
app.use('/api/actions', actionRouter);

const port = process.env.PORT || 4040;

app.listen(port);
