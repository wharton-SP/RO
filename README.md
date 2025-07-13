# 🔍 Operations Research – Max Flow with Ford-Fulkerson

Welcome to this **Operations Research** project dedicated to the implementation and visualization of the **Ford-Fulkerson algorithm** for finding the **maximum flow** in a directed graph.

---

## 📦 Project Structure

```bash
RO/
├── RO-Service/          # Backend Flask (Ford-Fulkerson algorithm)
└── RO-Visualisation/    # Frontend React + Vite (visualization interface)
```

---

## 📖 About

The goal is to provide an educational and interactive tool to:

- Simulate flow graphs (capacities, source, sink)
- Run the Ford-Fulkerson algorithm step by step
- Dynamically visualize augmenting paths, flows, and cuts

> This project is particularly useful for courses in **operations research**, **algorithms**, or **applied mathematics**.

---

## ⚙️ Installation

### 🔧 1. Backend – `RO-Service` (Flask)

> 📍 Folder: `RO/RO-Service`

#### 🐍 Prerequisites

- Python 3.8+
- `virtualenv` or `venv`

#### 🚀 Start the backend

```bash
cd RO-Service
python3 -m venv venv
source venv/bin/activate  # Windows : env\Scripts\activate
pip install flask flask-cors

# Start the server
python run.py
```

By default, the backend runs at: `http://localhost:4321/api/`

---

### 🌐 2. Frontend – `RO-Visualisation` (React + Vite)

> 📍 Folder: `RO/RO-Visualisation`

#### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) *(recommended)*

#### 📁 `.env` file

Create a `.env` file at the root of `RO-Visualisation`:

```env
VITE_API_BASE_URL=http://localhost:4321/api/
```

Replace the URL if your backend runs on another network/IP.

#### 🚀 Install and launch

```bash
cd RO-Visualisation
yarn
yarn dev
```

By default, the frontend is accessible at: `http://localhost:5173/`

---

## 🧠 About Ford-Fulkerson

The **Ford-Fulkerson algorithm** aims to maximize the flow between a **source node** and a **sink node** in a directed graph using **augmenting paths**.

> The algorithm is based on the idea of **traversing the graph** to find paths with positive residual capacities, and increasing the flow along these paths until none can be found.

## 📜 License

This project is open-source under the MIT license.

---

## 🚀 Author

@wharton-git
