import React from 'react';
import { useSelector } from 'react-redux';

export default function Project() {
	const project = useSelector((state) => state.projects.project);
	if (!project) return null;
    return (
    <div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p>{project.notes}</p>
        <button>Complete?</button>
    </div>);
}
