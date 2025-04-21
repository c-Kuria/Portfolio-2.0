import { db, collection, addDoc } from './firebase.js';

const addProject = async (projectData) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), projectData);
    console.log("Project added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

// Example project data
const exampleProject = {
  Title: "Portfolio Website",
  Description: "A modern portfolio website built with React and Tailwind CSS",
  Img: "https://example.com/portfolio-image.jpg",
  Link: "https://example.com/portfolio",
  TechStack: ["React", "Tailwind CSS", "Firebase", "Vite"],
  Features: [
    "Responsive Design",
    "Dark Mode",
    "Project Showcase",
    "Contact Form"
  ],
  Github: "https://github.com/yourusername/portfolio"
};

// Add the project
addProject(exampleProject)
  .then(() => console.log("Project added successfully"))
  .catch(error => console.error("Failed to add project:", error)); 