const express = require('express');
const projectRouter = require('./projectsRouter');

const app = express();

app.use(express.json());

//use projectRouter for any route start with projects
app.use('/api/projects', projectRouter);

const port = process.env.PORT || 4040;

app.listen(port);
