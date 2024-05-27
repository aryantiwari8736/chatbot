import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index} className="mb-2">
            <div className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p>{project.description}</p>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
