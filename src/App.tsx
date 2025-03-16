import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConstructRequest from './pages/ConstructRequestPage/ConstructRequestPage';
import ProcessResponsePage from './pages/ProcessResponsePage/ProcessResponsePage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<ConstructRequest />} />
          <Route path="/redirect/:path/*" element={<ProcessResponsePage />} />
          <Route path="/redirect" element={<ProcessResponsePage />} />
        </Routes>
    </Router>
  );
}

export default App;

