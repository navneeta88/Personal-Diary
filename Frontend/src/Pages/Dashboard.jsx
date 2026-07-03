import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';

const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#f97316', '#22c55e', '#eab308'];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const response = await axios.get(`http://localhost:5000/diary/${user.id}`);
    setEntries(response.data);
  };

  const addEntry = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/diary/create', { userId: user.id, title, content });
    setTitle('');
    setContent('');
    fetchEntries();
  };

  const deleteEntry = async (id) => {
    await axios.delete(`http://localhost:5000/diary/${id}`);
    fetchEntries();
  };

  const logout = () => {
    localStorage.removeItem('user');
    window.location = '/';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-user">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
          <div>
            <h1>{user.username}</h1>
            <span>{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
          </div>
        </div>
        <div className="header-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      <form className="new-entry-card" onSubmit={addEntry}>
        <h2>New Entry</h2>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Write your thoughts..." value={content} onChange={(e) => setContent(e.target.value)} required />
        <button className="btn" type="submit">Add Entry</button>
      </form>
      {entries.length === 0 ? (
        <p className="empty-state">No diary entries yet. Start writing above.</p>
      ) : (
        entries.map((entry, index) => (
          <div className="entry-card" style={{ '--entry-color': colors[index % colors.length] }} key={entry.id}>
            <div className="entry-card-head">
              <h3>{entry.title}</h3>
              <button className="btn btn-danger" onClick={() => deleteEntry(entry.id)}>Delete</button>
            </div>
            <div className="entry-date">{new Date(entry.createdAt).toLocaleString()}</div>
            <p>{entry.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;