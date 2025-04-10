import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Charts = ({ engagementByType, weeklyTrend = [], monthlyTrend = [], trendType = 'weekly' }) => {
  const types = Object.keys(engagementByType);
  const views = types.map(type => engagementByType[type].views);
  const likes = types.map(type => engagementByType[type].likes);

  const barData = {
    labels: types,
    datasets: [
      {
        label: 'Views',
        data: views,
        backgroundColor: '#4e73df'
      },
      {
        label: 'Likes',
        data: likes,
        backgroundColor: '#1cc88a'
      }
    ]
  };

  const pieData = {
    labels: types,
    datasets: [
      {
        label: 'Engagement',
        data: types.map((type) => views[types.indexOf(type)] + likes[types.indexOf(type)]),
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b']
      }
    ]
  };

  const selectedTrend = trendType === 'weekly' ? weeklyTrend : monthlyTrend;

  const lineData = {
    labels: selectedTrend.map(item => item.date),
    datasets: [
      {
        label: 'Views',
        data: selectedTrend.map(item => item.views),
        borderColor: '#4e73df',
        backgroundColor: '#4e73df33',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Likes',
        data: selectedTrend.map(item => item.likes),
        borderColor: '#1cc88a',
        backgroundColor: '#1cc88a33',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-6">
          <h5>📊 Views & Likes (Bar Chart)</h5>
          <Bar data={barData} />
        </div>
        <div className="col-md-6">
          <h5>🧩 Total Engagement (Pie Chart)</h5>
          <Pie data={pieData} />
        </div>
      </div>

      {selectedTrend.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-12">
            <h5>📆 {trendType === 'weekly' ? 'Weekly' : 'Monthly'} Trend (Line Chart)</h5>
            <Line data={lineData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
