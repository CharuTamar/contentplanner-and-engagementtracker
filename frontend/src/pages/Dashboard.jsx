import { useEffect, useState } from 'react';
import contentService from '../services/contentService';
import Charts from '../components/Charts';

const Dashboard = () => {
  const [contentList, setContentList] = useState([]);
  const [engagementByType, setEngagementByType] = useState({});
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [trendType, setTrendType] = useState('weekly');

  useEffect(() => {
    const fetchData = async () => {
      const data = await contentService.getAllContent();
      setContentList(data);
      computeEngagement(data);
      computeWeeklyTrend(data);
      computeMonthlyTrend(data);
    };

    const computeEngagement = (data) => {
      const result = {};
      data.forEach((c) => {
        const { type, engagement } = c;
        if (!result[type]) {
          result[type] = { views: 0, likes: 0 };
        }
        result[type].views += engagement?.views || 0;
        result[type].likes += engagement?.likes || 0;
      });
      setEngagementByType(result);
    };

    const computeWeeklyTrend = (data) => {
      const trendMap = {};
      data.forEach((c) => {
        const rawDate = c.updatedAt || c.createdAt || c.scheduledDate;
        if (!rawDate) return;
        const dateKey = new Date(rawDate).toISOString().split('T')[0];
        if (!trendMap[dateKey]) {
          trendMap[dateKey] = { views: 0, likes: 0 };
        }
        trendMap[dateKey].views += c.engagement?.views || 0;
        trendMap[dateKey].likes += c.engagement?.likes || 0;
      });

      const trendArray = Object.entries(trendMap)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, values]) => ({ date, ...values }));

      setWeeklyTrend(trendArray);
    };

    const computeMonthlyTrend = (data) => {
      const trendMap = {};
      data.forEach((c) => {
        const rawDate = c.updatedAt || c.createdAt || c.scheduledDate;
        if (!rawDate) return;
        const date = new Date(rawDate);
        const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;

        if (!trendMap[monthKey]) {
          trendMap[monthKey] = { views: 0, likes: 0 };
        }
        trendMap[monthKey].views += c.engagement?.views || 0;
        trendMap[monthKey].likes += c.engagement?.likes || 0;
      });

      const trendArray = Object.entries(trendMap)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([month, values]) => ({ date: month, ...values }));

      setMonthlyTrend(trendArray);
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const selectedTrend = trendType === 'weekly' ? weeklyTrend : monthlyTrend;
    const csvContent = [
      ['Date', 'Views', 'Likes'],
      ...selectedTrend.map((entry) => [entry.date, entry.views, entry.likes])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${trendType}-trend.csv`;
    a.click();
  };

  const total = contentList.length;
  const drafts = contentList.filter((c) => c.status === 'draft').length;
  const scheduled = contentList.filter((c) => c.status === 'scheduled').length;
  const published = contentList.filter((c) => c.status === 'published').length;
  const today = new Date().toISOString().split('T')[0];
  const upcoming = contentList.filter(
    (c) => c.scheduledDate && c.scheduledDate.split('T')[0] > today
  ).length;

  return (
    <div
      className="py-4 px-3"
      style={{
        background: 'linear-gradient(to right, #fdf0f7, #e8eafc)',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        <h2 className="mb-4 text-center text-mauve fw-bold">📊 Dashboard</h2>

        {/* Stat Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                borderRadius: '1rem',
                background: '#b388eb'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Total Content</h5>
                <p className="card-text display-6 fw-bold">{total}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderRadius: '1rem',
                background: '#fff3cd',
                color: '#856404'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Drafts</h5>
                <p className="card-text display-6 fw-bold">{drafts}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                borderRadius: '1rem',
                background: '#5bc0de'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Scheduled</h5>
                <p className="card-text display-6 fw-bold">{scheduled}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm text-white"
              style={{
                borderRadius: '1rem',
                background: '#77dd77'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Published</h5>
                <p className="card-text display-6 fw-bold">{published}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card h-100 shadow-sm"
              style={{
                borderRadius: '1rem',
                background: '#f8d7da',
                color: '#721c24'
              }}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Upcoming</h5>
                <p className="card-text display-6 fw-bold">{upcoming}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Dropdown & Button */}
        <div className="mb-5 d-flex align-items-center gap-3">
          <label htmlFor="trendType" className="form-label fw-semibold">
            Export Trend:
          </label>
          <select
            id="trendType"
            className="form-select w-auto border-mauve shadow-sm"
            value={trendType}
            onChange={(e) => setTrendType(e.target.value)}
            style={{ borderRadius: '0.5rem' }}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button className="btn btn-outline-primary shadow-sm" onClick={handleExport}>
            📤 Export to CSV
          </button>
        </div>

        {/* Chart */}
        <Charts
          engagementByType={engagementByType}
          weeklyTrend={weeklyTrend}
          monthlyTrend={monthlyTrend}
          trendType={trendType}
        />
      </div>
    </div>
  );
};

export default Dashboard;
