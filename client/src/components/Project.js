import React from 'react';
import { useSelector } from 'react-redux';

export default function Project() {
	const project = useSelector((state) => state.projects.project);
	if (!project) return null;
	return <div>{project.name}</div>;
}
