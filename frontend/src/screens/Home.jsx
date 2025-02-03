import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/user.context';
import axios from "../config/axios";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

const Home = () => {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectName, setProjectName] = useState(null);
    const [project, setProject] = useState([]);
    const navigate = useNavigate();

    function createProject(e) {
        e.preventDefault();
        console.log({ projectName });

        axios.post('/projects/create', {
            name: projectName,
        })
            .then((res) => {
                console.log(res);
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get('/projects/all').then((res) => {
            setProject(res.data.projects);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <motion.main 
            className='p-4 bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen' 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <div className="projects flex flex-wrap gap-3">
                <motion.button
                    onClick={() => setIsModalOpen(true)}
                    className="project p-4 border border-slate-300 rounded-md bg-white shadow-lg transition-transform transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                >
                    New Project
                    <i className="ri-link ml-2"></i>
                </motion.button>

                {project.length > 0 ? (
                    project.map((project) => (
                        <motion.div 
                            key={project._id}
                            onClick={() => {
                                navigate(`/project`, {
                                    state: { project }
                                });
                            }}
                            className="project flex flex-col gap-2 cursor-pointer p-4 border border-slate-300 rounded-md min-w-52 bg-white shadow-lg transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h2 className='font-semibold'>{project.name}</h2>
                            <div className="flex gap-2">
                                <p><small><i className="ri-user-line"></i> Collaborators</small> :</p>
                                {project.users.length}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center w-full h-64 bg-white rounded-md shadow-lg">
                        <h2 className="text-lg font-semibold">No Projects Available</h2>
                        <p className="text-gray-500">Start by creating a new project!</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-1/3">
                        <h2 className="text-xl mb-4">Create New Project</h2>
                        <form onSubmit={createProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                                <input
                                    onChange={(e) => setProjectName(e.target.value)}
                                    value={projectName}
                                    type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded-md" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </motion.main>
    );
}

export default Home;
