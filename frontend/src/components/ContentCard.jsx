import { Link } from 'react-router-dom';
import contentService from '../services/contentService';
import { useState } from 'react';

const ContentCard = ({ content, onDelete }) => {
  const [engagement, setEngagement] = useState(content.engagement || {});

  const handleEngage = async (type) => {
    try {
      const updated = await contentService.engage(content._id, type);
      setEngagement(updated.engagement);
    } catch (err) {
      console.error('Engagement failed:', err);
    }
  };

  return (
    <div
      className="card shadow-sm mb-3 w-100 h-100"
      style={{
        border: '2px solid #c9a4d8', // Mauve border
        borderRadius: '1rem',
        backgroundColor: '#ffffff', // White background
      }}
    >
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{content.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {content.type} | {content.status}
        </h6>
        <p className="card-text">{content.description}</p>

        <p>
          <strong>Tags:</strong> {content.tags.join(', ')}
        </p>

        {content.scheduledDate && (
          <p>
            <strong>Scheduled:</strong>{' '}
            {new Date(content.scheduledDate).toLocaleDateString()}
          </p>
        )}

        <div className="mb-3">
          <button
            className="btn btn-sm btn-outline-primary me-2"
            onClick={() => handleEngage('views')}
          >
            👁 View ({engagement.views || 0})
          </button>
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => handleEngage('likes')}
          >
            ❤️ Like ({engagement.likes || 0})
          </button>
          <button
            className="btn btn-sm btn-outline-warning me-2"
            onClick={() => handleEngage('shares')}
          >
            🔄 Share ({engagement.shares || 0})
          </button>
        </div>

        <div className="mt-auto d-flex justify-content-between">
          <Link
            to={`/edit/${content._id}`}
            className="btn btn-sm btn-outline-primary"
          >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              const confirmDelete = window.confirm(
                'Are you sure you want to delete this content?'
              );
              if (confirmDelete) {
                onDelete(content._id);
                alert('Content deleted successfully!');
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
