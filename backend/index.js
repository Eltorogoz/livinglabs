const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

require('dotenv').config();

const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// for getting the uploaded files publicly
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('KBTESTER API is running');
});


const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${uniqueName}`);
    }
});

const upload = multer({ storage });


// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Projects');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET all documents for a project, added file_url update
app.get('/api/projects/:id/documents', async (req, res) => {
    try {
        const projectID = req.params.id;

        const [rows] = await db.query(
            'SELECT * FROM Documents WHERE projectID = ?',
            [projectID]
        );
        const documents = rows.map(doc => ({
            ...doc,
            file_url: `${req.protocol}://${req.get('host')}${doc.file_path}`
            }));
        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const projectID = req.params.id;
        const [rows] = await db.query(
            'SELECT * FROM Projects WHERE projectID = ?',
            [projectID]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


// GET all users (for testing)
app.get('/api/users', requireAdmin, async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT userID, email, display_name, role FROM Users'
            );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET all documents, now with file_url
app.get('/api/documents', async (req, res) => {
try {
    const [rows] = await db.query('SELECT * FROM Documents');

    const documents = rows.map(doc => ({
        ...doc,
        file_url: `${req.protocol}://${req.get('host')}${doc.file_path}`
    }));

    res.json(documents);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET a document by ID, now with file_url
app.get('/api/documents/:id', async (req, res) => {
    try {
        const documentID = req.params.id;

        const [rows] = await db.query(
            'SELECT * FROM Documents WHERE documentID = ?',
            [documentID]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }
        const doc = {
            ...rows[0],
            file_url: `${req.protocol}://${req.get('host')}${rows[0].file_path}`
        };

        res.json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

function requireAdmin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// POST user (create new user)
app.post('/api/users', requireAdmin, async (req, res) => {
    try {
        const { email, display_name, password, role } = req.body;

        if (!email || !display_name || !password) {
            return res.status(400).json({
                error: 'Email, display_name, and password are required'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO Users (email, display_name, password, role) VALUES (?, ?, ?, ?)',
            [email, display_name, hashedPassword, role || 'admin']
        );

        res.status(201).json({
            message: 'User created successfully',
            userID: result.insertId
        });

    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Database error' });
    }
});

// POST project (create new project)
app.post('/api/projects', requireAdmin, async (req, res) => {
    try {
        let { group_name, description, date_created } = req.body;

        if (!group_name) {
            return res.status(400).json({
                error: 'Project group name is required'
            });
        }

        if (date_created) {
            date_created = String(date_created).split('T')[0];
        } else {
            date_created = null;
        }

        const [result] = await db.query(
            'INSERT INTO Projects (group_name, description, date_created) VALUES (?, ?, ?)',
            [group_name, description || null, date_created || null]
        );

        res.status(201).json({
            message: 'Project created successfully',
            projectID: result.insertId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// POST document (create new doc)
app.post('/api/documents', requireAdmin, upload.single('file'), async (req, res) => {
    try {
        const { projectID, title, created_at } = req.body;

        if (!projectID || !title || !req.file) {
            return res.status(400).json({
                error: 'projectID, title, and file are required'
            });
        }

        console.log("✅", projectID, "Document title:", title, ", created successfully");

        const createdDate = created_at
            ? String(created_at).split('T')[0]
            : new Date().toISOString().slice(0, 10);

        const file_path = `/uploads/${req.file.filename}`;

        const [result] = await db.query(
            'INSERT INTO Documents (projectID, title, file_path, created_at) VALUES (?, ?, ?, ?)',
            [projectID, title, file_path, createdDate]
        );

        res.status(201).json({
            message: 'Document created successfully',
            documentID: result.insertId,
            file_path
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// UPDATE a project
app.put('/api/projects/:id', requireAdmin, async (req, res) => {
    try {
        const projectID = req.params.id;
        let { group_name, description, date_created } = req.body;

        if (!group_name) {
            return res.status(400).json({ error: 'Project name is required' });
        }

        if (date_created) {
            date_created = String(date_created).split('T')[0];
        } else {
            date_created = null;
        }

        const [result] = await db.query(
            'UPDATE Projects SET group_name = ?, description = ?, date_created = ? WHERE projectID = ?',
            [group_name, description || null, date_created, projectID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json({ message: 'Project updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Database error' });
    }
});

//UPDATE a document
app.put('/api/documents/:id', requireAdmin, upload.single('file'), async (req, res) => {
    try {
        const documentID = req.params.id;
        let { projectID, title, file_path, created_at } = req.body;

        if (!projectID || !title) {
            return res.status(400).json({
                error: 'projectID and title are required'
            });
        }

        if (created_at) {
            created_at = String(created_at).split('T')[0];
        } else {
            created_at = null;
        }

        if (req.file) {
            file_path = `/uploads/${req.file.filename}`;
        }

        if (!file_path) {
            return res.status(400).json({ error: 'File path is required' });
        }

        const [result] = await db.query(
            'UPDATE Documents SET projectID = ?, title = ?, file_path = ?, created_at = ? WHERE documentID = ?',
            [projectID, title, file_path, created_at, documentID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json({ 
            message: 'Document updated successfully', 
            file_path
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


// DELETE document by ID
app.delete('/api/documents/:id', requireAdmin, async (req, res) => {
    try {
        const documentID = req.params.id;

        const [result] = await db.query(
            'DELETE FROM Documents WHERE documentID = ?',
            [documentID]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json({ message: 'Document deleted successfully' });

        console.log("Document ID:", documentID), "deleted successfully";

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// DELETE project by ID
app.delete('/api/projects/:id',requireAdmin,async (req, res) => {
    try {
    const projectID = req.params.id;
    const [result] = await db.query(
        'DELETE FROM Projects WHERE projectID = ?',
        [projectID]
    );

    console.log("Project ID:", projectID, "has been deleted...");

    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });

    } catch (err) {
       console.error("SIGNUP ERROR:", err);

res.status(500).json({
    error: err.message,
    code: err.code,
    sqlMessage: err.sqlMessage
});
    }
});

// DELETE user by ID
app.delete('/api/users/:id', requireAdmin, async (req, res) => {
    try {
        const userID = req.params.id;
        const [result] = await db.query(
            'DELETE FROM Users WHERE userID = ?',
            [userID]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// ADMIN LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { display_name, password } = req.body;

        if (!display_name || !password) {
            return res.status(400).json({
                error: "Display name and password are required."
            });
        }

        const [rows] = await db.query(
            'SELECT userID, email, display_name, password, role FROM Users WHERE display_name = ?',
            [display_name]
        );

        if (rows.length === 0) {
            console.log("Login failed for:", display_name);
            return res.status(401).json({ error: 'Invalid login' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Login' });
        }

        console.log("✅ Login successful:", "username:", display_name," email:", user.email);

        const token = jwt.sign(
            {
                userID: user.userID,
                email: user.email,
                display_name: user.display_name,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                userID: user.userID,
                email: user.email,
                display_name: user.display_name,
                role: user.role
            }
        });

    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ error: 'Database error' });
    }
});



// SERVER - node index.js -- make sure you run within the folder, not the root
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log(`Server listening on http://localhost:${PORT}`);
});
