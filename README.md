# 🧠 Content Planner & Engagement Tracker

A full-stack web application to create, manage, and track content performance across various formats like blogs, tweets, reels, and videos.

---

## 🚀 Features

- ✍️ **Create and edit content** with title, description, tags, status, and schedule
- 🧾 **Filter and search** content by type, status, or date
- 📈 **Track engagement** — views, likes, shares
- 📊 **Dashboard analytics** — content count, status-wise stats, trends
- 📤 **Export engagement trends** to CSV
- 💬 (Optional) Comment section for feedback (currently disabled)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## 📸 Screenshots

>![image](https://github.com/user-attachments/assets/53fd85d5-552c-4724-b940-4b0eebe82601)
>![image](https://github.com/user-attachments/assets/e1558e9b-ec0a-4cf9-9ce1-4d4d68ebaef5)
>![image](https://github.com/user-attachments/assets/9213e61d-fcc1-4508-80a6-31676e51e9f8)
>![image](https://github.com/user-attachments/assets/2da33940-5514-4469-8e0b-c96ebab9c1a2)
>![image](https://github.com/user-attachments/assets/23fe6c11-87e3-4a70-ab7a-d7afe1c43889)
>![image](https://github.com/user-attachments/assets/9d0a21ce-b558-4d69-98a1-9bca83dbf4ce)


---

## 🧪 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/contentplanner-and-engagementtracker.git
cd contentplanner-and-engagementtracker
```
### 2. Setup Backend
```
cd backend
npm install
```
Add your MongoDB URI to .env file as MONGO_URI
```env 
MONGO_URI=your_mongo_db_connection_string
npm start
```
### 3. Setup Frontend
```
cd ../frontend
npm install
npm run dev
```

### API Endpoints
| Method  | Endpoint | Description |
| ------------- |:-----------------------:|:----------------------:|
| GET           | /api/content            | Fetch all content      |
| POST          | /api/content            | Create new content     |
| PUT           | /api/content/:id        | Update content         |
| DELETE        | /api/content/:id        | Delete content         |
| PATCH         | /api/content/:id/engage | Update engagement count|

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

## 📄 License
This project is licensed under the MIT License.

## 👩‍💻 Author
-Charu
-React | Node.js | MongoDB | Full Stack Enthusiast
-[LINKEDIN](https://www.linkedin.com/in/charu-tamar/)
