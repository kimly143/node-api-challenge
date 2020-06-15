const express = require('express');
const { loadProject } = require("./sharedMiddleware")

const router = express.Router();

const db = require('./data/helpers/actionModel');

//CREATE

router.post('/', loadProject, validateAction, async (req, res) => {
	const action = await db.insert(req.body);
	res.status(201).json(action);
});

// READ
router.get('/:id', loadAction, (req, res) => {
	res.json(req.action);
});

//UPDATE
router.put('/:id', loadProject, loadAction, validateAction, async (req, res) => {
	const action = await db.update(req.action.id, req.body);
	res.status(200).json(action);
});

//DELETE
router.delete('/:id', loadAction, async (req, res) => {
	await db.remove(req.action.id);
	res.status(200).end();
});

//custom middleware

//loadAction middleware
async function loadAction(req, res, next) {
	try {
		const action = await db.get(req.params.id);
		if (!action) {
			return res.status(400).json({
				message: 'invalid action id'
			});
		}
		req.action = action;
	} catch (e) {
		return res.status(500).json({
			error: 'The action information could not be retrieved.'
		});
	}
	next();
}

//validateAction middleware
function validateAction(req, res, next) {
	if (!req.body) {
		return res.status(400).json({
			message: 'missing action data'
		});
	} else if (!req.body.project_id) {
		return res.status(400).json({
			message: 'missing required project_id field'
		});
	} else if (!req.body.notes) {
		return res.status(400).json({
			message: 'missing required notes field'
		});
	} else if (!req.body.description) {
		return res.status(400).json({
			message: 'missing required description field'
		});
	} else if (req.body.description.length > 128) {
		return res.status(400).json({
			message: 'Description field is too long, must be less than 128 characters'
		});
	}
	next();
}

module.exports = router;
