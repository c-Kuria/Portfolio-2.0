import { db, collection, addDoc } from './src/firebase.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const addNewProject = async () => {
  console.log("\n=== Add New Project ===\n");
  
  const title = await prompt("Project Title: ");
  const description = await prompt("Project Description: ");
  const img = await prompt("Project Image URL: ");
  const link = await prompt("Live Demo URL (or 'none' if not available): ");
  const github = await prompt("GitHub Repository URL (or 'none' if not available): ");
  
  console.log("\nEnter Tech Stack (one per line, press Enter twice when done):");
  const techStack = [];
  while (true) {
    const tech = await prompt("Tech: ");
    if (tech === '') break;
    techStack.push(tech);
  }
  
  console.log("\nEnter Features (one per line, press Enter twice when done):");
  const features = [];
  while (true) {
    const feature = await prompt("Feature: ");
    if (feature === '') break;
    features.push(feature);
  }
  
  const projectData = {
    Title: title,
    Description: description,
    Img: img,
    Link: link === 'none' ? '' : link,
    Github: github === 'none' ? '' : github,
    TechStack: techStack,
    Features: features
  };
  
  try {
    await addProject(projectData);
    console.log("\nProject added successfully!");
  } catch (error) {
    console.error("\nFailed to add project:", error);
  }
  
  const addAnother = await prompt("\nAdd another project? (y/n): ");
  if (addAnother.toLowerCase() === 'y') {
    await addNewProject();
  } else {
    rl.close();
  }
};

console.log("Welcome to Project Adder!");
addNewProject(); 