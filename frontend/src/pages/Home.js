import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import ChatComponent from '../components/ChatComponent';

const Home = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        throw new Error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Fetch projects on component mount

  const handleAddProject = (project) => {
    setProjects([...projects, project]);
    
  };

  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl font-bold mb-4">Web App to Chat with PDFs</h1>
      <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
        Create Project
      </Link>
      <ProjectForm onAddProject={handleAddProject} />
      <ProjectList projects={projects} />
      <ChatComponent/>
    </div>
  );
};

export default Home;
