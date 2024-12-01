import { useState } from 'react'
import Home from './components/Home';
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from "./components/Register.jsx";
import Simulation from "./components/Simulation.jsx";
import InitialForm from "./components/InitialForm.jsx";
import Form from "./components/Form.jsx";
import ListCredit from "./components/ListCredit.jsx";
import EvaluationCredit from "./components/EvaluationCredit.jsx";
import StatusCredit from "./components/StatusCredit.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
          <div className="container">
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/InitialForm" element={<InitialForm/>} />
                  <Route path="/Form/:id" element={<Form/>} />
                  <Route path="/ListCredit" element={<ListCredit/>} />
                  <Route path="/EvaluationCredit/:id" element={<EvaluationCredit/>} />
                  <Route path="/StatusCredit" element={<StatusCredit/>} />
                  <Route path="/Register" element={<Register/>} />
                  <Route path="/Simulation" element={<Simulation/>} />
              </Routes>
          </div>
      </Router>
  );
}

export default App
