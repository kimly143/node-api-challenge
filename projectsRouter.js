const express = require('express');

const router = express.Router();

const db = require('./data/helpers/projectModel');

//CREATE
router.post('/', validateProject, async (req, res) => {
	const project = await db.insert(req.body);
	res.status(201).json(project);
});

// READ
router.get('/:id', loadProject, (req, res) => {
	res.json(req.project);
});

//UPDATE
router.put('/:id', loadProject, validateProject, async (req, res) => {
	const project = await db.update(req.project.id, req.body);
	res.status(200).json(project);
});

// router.post('/:id/posts', (req, res) => {
// 	// do your magic!
// });

//passing middle ware to this handle only

// router.get('/:id', validateUserId, (req, res) => {
// 	res.json(req.user);
// });

// router.get('/:id/posts', validateUserId, (req, res) => {
// 	const posts = userDb.getUserPosts(req.user.id);
// });

// router.delete('/:id', (req, res) => {
// 	// do your magic!
// });

// router.put('/:id', (req, res) => {
// 	// do your magic!
// });

//custom middleware

//loadProject middleware
async function loadProject(req, res, next) {
	try {
		const project = await db.get(req.params.id);
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

//validateProject middleware
function validateProject(req, res, next) {
	if (!req.body) {
		return res.status(400).json({
			message: 'missing project data'
		});
	} else if (!req.body.name){
		return res.status(400).json({
			message: 'missing required name field'
		});
	} else if (!req.body.description){
        return res.status(400).json({
			message: 'missing required description field'
		});
    }
	next();
}

//validatePost middleware
// async function validatePost(req, res, next) {
// 	if (!req.body) {
// 		return res.status(400).json({
// 			message: 'missing post data'
// 		});
// 	} else if (!req.body.text) {
// 		return res.status(400).json({
// 			message: 'missing required text field'
// 		});
// 	}
// 	next();
// }

module.exports = router;
