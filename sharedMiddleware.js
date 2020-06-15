const projectDb = require('./data/helpers/projectModel');

//loadProject middleware
async function loadProject(req, res, next) {
    const projectId = req.body.project_id || req.params.id
	try {
        //to access to project id depend on if we at projectsRoute or actionCreate
        const project = await projectDb.get(projectId);
        
		if (!project) {
			return res.status(400).json({
				message: 'invalid project id'
			});
		}
		req.project = project;
	} catch (e) {
		return res.status(500).json({
			error: 'The project information could not be retrieved.'
		});
	}
	next();
}

module.exports = { loadProject };
