import { useEffect, useState } from 'react';
import contentService from '../services/contentService';
import ContentCard from '../components/ContentCard';

const ContentList = () => {
  const [contentList, setContentList] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    scheduledDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContent = async () => {
    const data = await contentService.getAllContent();
    setContentList(data);
    setFilteredContent(data);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    let result = contentList;

    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status);
    }

    if (filters.scheduledDate) {
      result = result.filter(
        (item) => item.scheduledDate?.split('T')[0] === filters.scheduledDate
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        (item.title + item.description).toLowerCase().includes(term)
      );
    }

    setFilteredContent(result);
  }, [filters, searchTerm, contentList]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      await contentService.deleteContent(id);
      fetchContent(); // Refresh list
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="py-4 px-3"
      style={{
        background: 'linear-gradient(to right, #fdf0f7, #e8eafc)',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        <h2 className="mb-4 text-center text-mauve fw-bold">
          📋 All Content
        </h2>

        {/* 🔍 Search */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control shadow-sm border-mauve"
            placeholder="🔍 Search by title or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '0.5rem' }}
          />
        </div>

        {/* 🎯 Filters */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <select
              name="type"
              className="form-select border-mauve shadow-sm"
              value={filters.type}
              onChange={handleFilterChange}
              style={{ borderRadius: '0.5rem' }}
            >
              <option value="">All Types</option>
              <option value="blog">Blog</option>
              <option value="tweet">Tweet</option>
              <option value="video">Video</option>
              <option value="reel">Reel</option>
              <option value="post">Post</option>
            </select>
          </div>

          <div className="col-md-3">
            <select
              name="status"
              className="form-select border-mauve shadow-sm"
              value={filters.status}
              onChange={handleFilterChange}
              style={{ borderRadius: '0.5rem' }}
            >
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="date"
              name="scheduledDate"
              className="form-control border-mauve shadow-sm"
              value={filters.scheduledDate}
              onChange={handleFilterChange}
              style={{ borderRadius: '0.5rem' }}
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary w-100 shadow-sm"
              onClick={() =>
                setFilters({ type: '', status: '', scheduledDate: '' })
              }
              style={{
                borderRadius: '0.5rem',
                backgroundColor: '#f9f0ff'
              }}
            >
              🚿 Clear Filters
            </button>
          </div>
        </div>

        {/* 📋 Content Cards */}
        {filteredContent.length === 0 ? (
          <p className="text-muted text-center">No content found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredContent.map((content) => (
              <div className="col d-flex" key={content._id}>
                <ContentCard content={content} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
