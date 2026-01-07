import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit2, Save, X, LogOut, LayoutGrid, Image as ImageIcon, Search } from 'lucide-react';
import DragDropUpload from './DragDropUpload.jsx';
import '../styles/admin.css';

// --- NEW COMPONENT: ICON LIBRARY MODAL ---
const IconLibraryModal = ({ isOpen, onClose, onSelect }) => {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState('');
  const SERVER_URL = 'http://localhost:5000'; // Make sure this matches your config

  useEffect(() => {
    if (isOpen) {
      fetch(`${SERVER_URL}/api/icons`)
        .then(res => res.json())
        .then(data => setIcons(data))
        .catch(err => console.error("Failed to load icons", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredIcons = icons.filter(icon => 
    icon.alt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="admin-card" style={{ width: '90%', maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', padding: '20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <h3 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>Select Icon</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
        </div>

        <div style={{ position: 'relative', marginBottom: '15px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#666' }} />
          <input 
            className="admin-input" 
            placeholder="Search icons (e.g. React)..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '35px' }} 
          />
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', paddingRight: '5px' }}>
          {filteredIcons.map((icon, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelect(icon)}
              style={{ 
                border: '1px solid #333', borderRadius: '8px', padding: '10px', 
                cursor: 'pointer', textAlign: 'center', background: '#080808',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#37ff8b'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
            >
              <img 
                src={icon.src.startsWith('http') ? icon.src : `${SERVER_URL}${icon.src}`} 
                style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '5px' }} 
                alt={icon.alt}
              />
              <div style={{ fontSize: '10px', color: '#888', truncate: true, overflow: 'hidden', whiteSpace: 'nowrap' }}>{icon.alt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const AdminPanel = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Modal State
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [activeTechIndex, setActiveTechIndex] = useState(null);

  const API_URL = 'http://localhost:5000/api/projects';
  const SERVER_URL = 'http://localhost:5000'; 

  // Form States
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [link, setLink] = useState('');
  const [techCount, setTechCount] = useState(0);
  const [description, setDescription] = useState('');
  
  // Image & Style States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [bgColor, setBgColor] = useState('#000000'); 
  const [useBgColor, setUseBgColor] = useState(false);
  const [objectFit, setObjectFit] = useState('cover');
  const [techStack, setTechStack] = useState([]);

  useEffect(() => { loadProjects(); }, []);

  const getAuthHeaders = () => ({ 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` });
  
  const checkAuthError = (status) => {
    if (status === 401 || status === 403) {
      handleLogout();
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const loadProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (error) { console.error(error); }
  };

  const handleMainImageSelect = (file) => {
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const handleTechAdd = () => setTechStack([...techStack, { file: null, preview: '', alt: '', existingSrc: '' }]);
  const handleTechRemove = (i) => setTechStack(techStack.filter((_, idx) => idx !== i));
  
  const handleTechFileSelect = (idx, file) => {
    const updated = [...techStack];
    updated[idx].file = file;
    updated[idx].existingSrc = ''; // Clear reuse URL if new file chosen
    updated[idx].preview = file ? URL.createObjectURL(file) : '';
    setTechStack(updated);
  };

  // --- NEW: Handle selection from Library ---
  const openLibrary = (index) => {
    setActiveTechIndex(index);
    setIsLibraryOpen(true);
  };

  const handleLibrarySelect = (icon) => {
    const updated = [...techStack];
    updated[activeTechIndex].file = null; // Clear any file upload
    updated[activeTechIndex].existingSrc = icon.src; // Set the URL
    updated[activeTechIndex].alt = icon.alt; // Auto-fill name
    updated[activeTechIndex].preview = icon.src.startsWith('http') ? icon.src : `${SERVER_URL}${icon.src}`;
    
    setTechStack(updated);
    setIsLibraryOpen(false);
  };

  const handleTechAltChange = (idx, val) => {
    const updated = [...techStack];
    updated[idx].alt = val;
    setTechStack(updated);
  };

  const resetForm = () => {
    setTitle(''); setSubtitle(''); setLink(''); setDescription(''); setTechCount(0);
    setImageFile(null); setImagePreview(''); setBgColor('#000000'); setUseBgColor(false); setObjectFit('cover'); setTechStack([]);
    setIsEditing(false); setEditingId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (p) => {
    setTitle(p.title); setSubtitle(p.subtitle); setLink(p.link); setDescription(p.description); setTechCount(p.techCount);
    setImageFile(null); 
    setImagePreview(p.image.startsWith('http') ? p.image : `${SERVER_URL}${p.image}`);
    
    const style = p.imageStyle || {};
    setUseBgColor(!!style.backgroundColor);
    setBgColor(style.backgroundColor || '#000000');
    setObjectFit(style.objectFit || 'cover');

    setTechStack((p.techImages || []).map(t => ({
      file: null, alt: t.alt, existingSrc: t.src,
      preview: t.src.startsWith('http') ? t.src : `${SERVER_URL}${t.src}`
    })));

    setEditingId(p._id); setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!title || !subtitle || !link) return alert('Fill required fields');

    const formData = new FormData();
    formData.append('title', title); formData.append('subtitle', subtitle);
    formData.append('link', link); formData.append('description', description);
    formData.append('techCount', techCount);

    const styleObj = { objectFit };
    if (useBgColor) styleObj.backgroundColor = bgColor;
    formData.append('imageStyle', JSON.stringify(styleObj));

    if (imageFile) formData.append('imageFile', imageFile);
    else if (isEditing) formData.append('image', imagePreview.replace(SERVER_URL, ''));

    const techMeta = techStack.map(t => ({ alt: t.alt, src: t.existingSrc || '' }));
    formData.append('techImages', JSON.stringify(techMeta));
    techStack.forEach((t, i) => { if (t.file) formData.append(`techImage_${i}`, t.file); });

    try {
      const url = isEditing ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, { method: isEditing ? 'PUT' : 'POST', headers: getAuthHeaders(), body: formData });
      if (checkAuthError(res.status)) return;
      if (res.ok) { alert('Success!'); loadProjects(); resetForm(); }
      else { const e = await res.json(); alert('Error: ' + e.message); }
    } catch (e) { alert('Network error'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
    if (!checkAuthError(res.status) && res.ok) loadProjects();
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-container">
        
        {/* Header */}
        <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="admin-title">Dashboard</h1>
            <p className="admin-subtitle">Manage Portfolio Projects</p>
          </div>
          <div className="btn-group">
            <button onClick={() => navigate('/')} className="admin-btn secondary">
              <LayoutGrid size={18}/> View Site
            </button>
            <button onClick={handleLogout} className="admin-btn danger">
              <LogOut size={18}/> Logout
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="admin-card mb-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 className="section-title">{isEditing ? `Edit: ${title}` : 'Add New Project'}</h2>
            {isEditing && (
              <button onClick={resetForm} className="admin-btn secondary small"><X size={14}/> Cancel</button>
            )}
          </div>

          <div className="grid-2">
            <div>
              <div className="form-group"><label className="form-label">Title</label><input value={title} onChange={e => setTitle(e.target.value)} className="admin-input" /></div>
              <div className="form-group"><label className="form-label">Subtitle</label><input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="admin-input" /></div>
              <div className="form-group"><label className="form-label">Link</label><input value={link} onChange={e => setLink(e.target.value)} className="admin-input" /></div>
              <div className="form-group"><label className="form-label">Tech Count</label><input type="number" value={techCount} onChange={e => setTechCount(e.target.value)} className="admin-input" /></div>
              <div className="form-group"><label className="form-label">Description</label><textarea value={description} onChange={e => setDescription(e.target.value)} className="admin-textarea" /></div>
            </div>

            <div>
              <div className="form-group"><label className="form-label">Cover Image</label><DragDropUpload label="" onFileSelect={handleMainImageSelect} previewUrl={imagePreview} /></div>
              
              <div className="admin-card" style={{ padding: '1.5rem', backgroundColor: '#000' }}>
                <label className="form-label">Style Options</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                   <select value={objectFit} onChange={e => setObjectFit(e.target.value)} className="admin-select">
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                   </select>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" checked={useBgColor} onChange={e => setUseBgColor(e.target.checked)} />
                      <span style={{ fontSize: '0.9rem' }}>Bg Color</span>
                      {useBgColor && <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />}
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
               <h3 className="section-title" style={{ fontSize: '1rem', border: 'none', padding: 0 }}>Tech Stack</h3>
               <button onClick={handleTechAdd} className="admin-btn secondary small"><Plus size={14}/> Add Icon</button>
            </div>
            
            {/* UPDATED: Uses class instead of inline grid style */}
            <div className="tech-stack-grid">
              {techStack.map((tech, idx) => (
                <div key={idx} className="tech-card">
                   
                   {/* Preview / Upload Box */}
                   <div style={{ position: 'relative' }}>
                      <div 
                        className="tech-upload-box" // Added class for mobile sizing
                        style={{ width: '60px', height: '60px', background: '#111', border: '1px dashed #555', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow:'hidden', borderRadius:'4px' }} 
                        onClick={()=>document.getElementById(`t-file-${idx}`).click()}
                        title="Upload New"
                      >
                          {tech.preview ? <img src={tech.preview} alt="" style={{width:'100%', height:'100%', objectFit:'contain'}}/> : <span style={{fontSize:'8px', color:'#777'}}>UPLOAD</span>}
                          <input type="file" id={`t-file-${idx}`} hidden onChange={e=>handleTechFileSelect(idx, e.target.files[0])}/>
                      </div>
                   </div>

                   {/* Controls */}
                   <div style={{ flex: 1, minWidth: 0 }}> {/* minWidth: 0 prevents flex child from overflowing */}
                      <input value={tech.alt} onChange={e=>handleTechAltChange(idx, e.target.value)} className="admin-input" style={{ padding: '6px', fontSize:'0.85rem', marginBottom: '6px', width: '100%' }} placeholder="Name"/>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                         <button onClick={() => openLibrary(idx)} className="admin-btn secondary" style={{ padding: '4px 8px', fontSize: '10px', width: 'auto', whiteSpace: 'nowrap' }}>
                            <ImageIcon size={10} style={{marginRight:'4px'}}/> Library
                         </button>
                         <button onClick={()=>handleTechRemove(idx)} className="admin-btn danger" style={{ padding: '4px 8px', fontSize: '10px', width: 'auto' }}>
                            <Trash2 size={10}/>
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleSubmit} className="admin-btn primary">
              <Save size={18}/> {isEditing ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </div>

        {/* Project List */}
        <h2 className="section-title">Projects ({projects.length})</h2>
        <div>
          {projects.map(p => (
            <div key={p._id} className="project-item">
               <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={p.image.startsWith('http') ? p.image : `${SERVER_URL}${p.image}`} className="project-thumb" alt={p.title} />
                  <div className="project-info">
                     <h3>{p.title}</h3>
                     <p className="admin-subtitle" style={{ margin: 0 }}>{p.subtitle}</p>
                     <div style={{ marginTop: '0.5rem' }}>
                        {(p.techImages || []).map((t, i) => <span key={i} className="project-tech-tag">{t.alt}</span>)}
                     </div>
                  </div>
               </div>
               <div className="btn-group" style={{ marginTop: '1rem' }}>
                  <button onClick={() => handleEdit(p)} className="admin-btn secondary small"><Edit2 size={14}/> Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="admin-btn danger small"><Trash2 size={14}/> Delete</button>
               </div>
            </div>
          ))}
        </div>
        
        {/* Render Modal */}
        <IconLibraryModal 
           isOpen={isLibraryOpen} 
           onClose={() => setIsLibraryOpen(false)} 
           onSelect={handleLibrarySelect}
        />

      </div>
    </div>
  );
};

export default AdminPanel;