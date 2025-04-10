import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import contentService from '../services/contentService';

const ContentForm = ({ editMode = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'blog',
    description: '',
    tags: '',
    status: 'draft',
    scheduledDate: ''
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editMode && id) {
      contentService.getContentById(id).then((res) => {
        setFormData({
          ...res,
          tags: res.tags?.join(', ') || '',
          scheduledDate: res.scheduledDate?.split('T')[0] || ''
        });
      });
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim())
    };

    if (editMode) {
      await contentService.updateContent(id, payload);
    } else {
      await contentService.createContent(payload);
    }

    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{editMode ? 'Edit' : 'Create'} Content</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="blog">Blog</option>
            <option value="tweet">Tweet</option>
            <option value="video">Video</option>
            <option value="reel">Reel</option>
            <option value="post">Post</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Scheduled Date</label>
          <input
            type="date"
            name="scheduledDate"
            className="form-control"
            value={formData.scheduledDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editMode ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
