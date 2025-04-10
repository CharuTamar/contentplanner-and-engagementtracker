import React, { useState } from 'react';
import axios from 'axios';

const CreateContent = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'blog',
    description: '',
    tags: '',
    status: 'draft',
    scheduledDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      const res = await axios.post('http://localhost:5000/api/content', payload);
      alert('Content created successfully!');
      setFormData({
        title: '',
        type: 'blog',
        description: '',
        tags: '',
        status: 'draft',
        scheduledDate: ''
      });
    } catch (error) {
      console.error('Error creating content:', error);
      alert('Failed to create content');
    }
  };

  return (
    <div
      className="py-5 px-3"
      style={{
        background: 'linear-gradient(to right, #fdf0f7, #e8eafc)',
        minHeight: '100vh'
      }}
    >
      <div className="container bg-white p-4 shadow-sm rounded-4">
        <h2 className="mb-4 text-center text-mauve fw-bold">📝 Create New Content</h2>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">📌 Title</label>
            <input
              type="text"
              className="form-control shadow-sm border-mauve"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{ borderRadius: '0.5rem' }}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">🧩 Type</label>
            <select
              name="type"
              className="form-select shadow-sm border-mauve"
              value={formData.type}
              onChange={handleChange}
              required
              style={{ borderRadius: '0.5rem' }}
            >
              <option value="blog">Blog</option>
              <option value="tweet">Tweet</option>
              <option value="video">Video</option>
              <option value="reel">Reel</option>
              <option value="post">Post</option>
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">📝 Description</label>
            <textarea
              name="description"
              className="form-control shadow-sm border-mauve"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ borderRadius: '0.5rem' }}
            ></textarea>
          </div>

          <div className="col-md-6">
            <label className="form-label">🏷️ Tags (comma-separated)</label>
            <input
              type="text"
              className="form-control shadow-sm border-mauve"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              style={{ borderRadius: '0.5rem' }}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">📂 Status</label>
            <select
              name="status"
              className="form-select shadow-sm border-mauve"
              value={formData.status}
              onChange={handleChange}
              style={{ borderRadius: '0.5rem' }}
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">📅 Scheduled Date</label>
            <input
              type="date"
              className="form-control shadow-sm border-mauve"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              disabled={formData.status !== 'scheduled'}
              style={{ borderRadius: '0.5rem' }}
            />
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="btn btn-primary px-5 py-2 shadow-sm"
              style={{
                borderRadius: '0.75rem',
                backgroundColor: '#8e44ad',
                borderColor: '#8e44ad'
              }}
            >
              ➕ Create Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContent;
