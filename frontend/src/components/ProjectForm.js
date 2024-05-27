import React, { useState } from 'react';

const ProjectForm = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('pdfFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onAddProject(data);
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2 block w-full"
        name="title" // 
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2 block w-full"
        name="description" // Make sure name attribute matches the FormData key
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border border-gray-300 rounded-md px-4 py-2 mb-2 block w-full"
        name="pdf_path" // Make sure name attribute matches the FormData key
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
