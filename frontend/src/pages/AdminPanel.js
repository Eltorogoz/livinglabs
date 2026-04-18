import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.REACT_APP_API_URL;

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('projects');
    
    const [projects, setProjects] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [users, setUsers] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [projectForm, setProjectForm] = useState({ group_name: '', description: '', date_created: ''});
    const [documentForm, setDocumentForm] = useState({ projectID: '', title: '', file_path: '', created_at: '', file: null});
    const [userForm, setUserForm] = useState({ email: '', display_name: '', password: '', role: 'admin' });

    const [editingProject, setEditingProject] = useState(null);
    const [editingDocument, setEditingDocument] = useState(null);

    useEffect(() => {
        fetchProjects();
        fetchDocuments();
        fetchUsers();
    }, []);

    const showMessage = (msg, isError = false) => {
        if (isError) {
            setError(msg);
            setSuccess('');
        } else {
            setSuccess(msg);
            setError('');
        }
        setTimeout(() => {
            setError('');
            setSuccess('');
        }, 3000);
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/api/projects`);
            if (!res.ok) throw new Error('Failed to fetch projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDocuments = async () => {
        try {
            const res = await fetch(`${API_URL}/api/documents`);
            if (!res.ok) throw new Error('Failed to fetch documents');
            const data = await res.json();
            setDocuments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users`);
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/projects`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(projectForm)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to create project'); 
            }

            showMessage('Project created successfully');
            setProjectForm({ group_name: '', description: '', date_created: '' });
            fetchProjects();
        } catch (err) {
            showMessage(err.message, true);
        }

        setLoading(false);
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/projects/${editingProject}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(projectForm)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update project');
            }

            showMessage('Project updated successfully');
            setEditingProject(null);
            setProjectForm({ group_name: '', description: '', date_created: '' });
            fetchProjects();
        } catch (err) {
            showMessage(err.message, true);
        }

        setLoading(false);
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project? This will also delete all associated documents.')) return;
        
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/projects/${id}`, { 
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                } 
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to delete project');
            }
            
            showMessage('Project deleted successfully');
            fetchProjects();
            fetchDocuments();
        } catch (err) {
            showMessage(err.message, true);
        }
    };

    const startEditProject = (project) => {
        setEditingProject(project.projectID);
        setProjectForm({
            group_name: project.group_name || '',
            description: project.description || '',
            date_created: project.date_created
                ? String(project.date_created).split('T')[0]
                : ''
        });
    };

    const cancelEditProject = () => {
        setEditingProject(null);
        setProjectForm({ group_name: '', description: '', date_created: '' });
    };

    const handleCreateDocument = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");

            if (!documentForm.file) {
                throw new Error("Please choose a file to upload");
            }

            const formData = new FormData();
            formData.append('projectID', documentForm.projectID);
            formData.append('title', documentForm.title);
            formData.append('created_at', documentForm.created_at || '');
            formData.append('file', documentForm.file);

            const res = await fetch(`${API_URL}/api/documents`, {
                method: 'POST',
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to create document');
            }
            
            showMessage('Document created successfully');
            setDocumentForm({ projectID: '', title: '', file_path: '', created_at: '', file: null});
            fetchDocuments();
        } catch (err) {
            showMessage(err.message, true);
        }
        
        setLoading(false);
    };

    const handleUpdateDocument = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append('projectID', documentForm.projectID);
            formData.append('title', documentForm.title);
            formData.append('created_at', documentForm.created_at || '');
            formData.append('file_path', documentForm.file_path || '');

            if (documentForm.file) {
                formData.append('file', documentForm.file);
            }

            const res = await fetch(`${API_URL}/api/documents/${editingDocument}`, {
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update document');
            }

            showMessage('Document updated successfully');
            setEditingDocument(null);
            setDocumentForm({ projectID: '', title: '', file_path: '', created_at: '', file: null});
            fetchDocuments();
        } catch (err) {
            showMessage(err.message, true);
        }

        setLoading(false);
    };

    const handleDeleteDocument = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) return;
        
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/documents/${id}`, { 
                method: 'DELETE', 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || 'Failed to delete document');
            }
            showMessage('Document deleted successfully');
            fetchDocuments();
        } catch (err) {
            showMessage(err.message, true);
        }
    };

    const startEditDocument = (doc) => {
        setEditingDocument(doc.documentID);
        setDocumentForm({
            projectID: doc.projectID || '',
            title: doc.title || '',
            file_path: doc.file_path || '',
            created_at: doc.created_at
                ? String(doc.created_at).split('T')[0]
                : '',
            file: null
        });
    };

    const cancelEditDocument = () => {
        setEditingDocument(null);
        setDocumentForm({ projectID: '', title: '', file_path: '', created_at: '' });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(userForm)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create user');
            }
            
            showMessage('User created successfully');
            setUserForm({ email: '', display_name: '', password: '', role: 'admin' });
            fetchUsers();
        } catch (err) {
            showMessage(err.message, true);
        }

        setLoading(false);
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            const token = localStorage.getItem("token");
        
            const res = await fetch(`${API_URL}/api/users/${id}`, { 
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to delete user');
            }
            
            showMessage('User deleted successfully');
            fetchUsers();
        } catch (err) {
            showMessage(err.message, true);
        }
    };

    const tabs = [
        { id: 'projects', label: 'Projects', count: projects.length },
        { id: 'documents', label: 'Documents', count: documents.length },
        { id: 'users', label: 'Users', count: users.length }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-gray-600 mt-2">Manage projects, documents, and users</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                <div className="border-b border-gray-200 mb-8">
                    <nav className="flex gap-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 border-b-2 font-medium text-sm transition ${
                                    activeTab === tab.id
                                        ? 'border-yellow-600 text-yellow-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {activeTab === 'projects' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    {editingProject ? "Edit Project" : "Add New Project"}
                                </h2>

                                <form onSubmit={editingProject ? handleUpdateProject : handleCreateProject} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={projectForm.group_name}
                                            onChange={(e) => setProjectForm({...projectForm, group_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter project name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={projectForm.description}
                                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter project description"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#C4B07A] text-white py-2 px-4 rounded-md font-medium hover:bg-yellow-700 transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? (editingProject ? 'Updating...' : 'Creating...')
                                            : (editingProject ? 'Update Project' : 'Create Project')}
                                    </button>

                                    {editingProject && (
                                        <button
                                            type="button"
                                            onClick={cancelEditProject}
                                            className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-400 transition"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold">All Projects</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {projects.length === 0 ? (
                                        <p className="p-6 text-gray-500 text-center">No projects found</p>
                                    ) : (
                                        projects.map(project => (
                                            <div key={project.projectID} className="p-6 flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{project.group_name}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{project.description || 'No description'}</p>
                                                    <p className="text-xs text-gray-400 mt-2">ID: {project.projectID}</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => startEditProject(project)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProject(project.projectID)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    {editingDocument ? 'Edit Document' : 'Add New Document'}
                                </h2>
                                <form onSubmit={editingDocument ? handleUpdateDocument : handleCreateDocument} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Project *
                                        </label>
                                        <select
                                            required
                                            value={documentForm.projectID}
                                            onChange={(e) => setDocumentForm({...documentForm, projectID: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        >
                                            <option value="">Select a project</option>
                                            {projects.map(project => (
                                                <option key={project.projectID} value={project.projectID}>
                                                    {project.group_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Document Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={documentForm.title}
                                            onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter document title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Upload File {editingDocument ? '' : '*'}
                                        </label>
                                        <input
                                            type="file"
                                            required
                                            onChange={(e) => setDocumentForm({...documentForm, file: e.target.files[0] || null})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        />
                                        {documentForm.file_path && (
                                            <p className="text-xs text-gray-500 mt-1">Current File: {documentForm.file_path}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#C4B07A] text-white py-2 px-4 rounded-md font-medium hover:bg-yellow-700 transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? (editingDocument ? 'Updating...' : 'Creating...')
                                            : (editingDocument ? 'Update Document' : 'Create Document')}
                                    </button>
                                    {editingDocument && (
                                        <button
                                            type="button"
                                            onClick={cancelEditDocument}
                                            className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-400 transition"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold">All Documents</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {documents.length === 0 ? (
                                        <p className="p-6 text-gray-500 text-center">No documents found</p>
                                    ) : (
                                        documents.map(doc => (
                                            <div key={doc.documentID} className="p-6 flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Project: {projects.find(p => p.projectID === doc.projectID)?.group_name || `ID ${doc.projectID}`}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">Path: {doc.file_path}</p>
                                                    
                                                    {doc.file_url && (
                                                        <a 
                                                            href={doc.file_url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                                        >
                                                            View File
                                                        </a>
                                                    )}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => startEditDocument(doc)}
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDocument(doc.documentID)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Add New User</h2>
                                <form onSubmit={handleCreateUser} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={userForm.email}
                                            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="user@purdue.edu"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Display Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={userForm.display_name}
                                            onChange={(e) => setUserForm({...userForm, display_name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={userForm.password}
                                            onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <select
                                            value={userForm.role}
                                            onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        >
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#C4B07A] text-white py-2 px-4 rounded-md font-medium hover:bg-yellow-700 transition disabled:opacity-50"
                                    >
                                        {loading ? 'Creating...' : 'Create User'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold">All Users</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {users.length === 0 ? (
                                        <p className="p-6 text-gray-500 text-center">No users found</p>
                                    ) : (
                                        users.map(user => (
                                            <div key={user.userID} className="p-6 flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900">{user.display_name}</h3>
                                                    <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                                                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                                                        {user.role}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteUser(user.userID)}
                                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default AdminPanel;
