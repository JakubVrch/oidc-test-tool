import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConstructRequest from './pages/ConstructRequestPage/ConstructRequestPage';
import ProcessResponsePage from './pages/ProcessResponsePage/ProcessResponsePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ConstructRequest />} />
          <Route path="/redirect/:path/*" element={<ProcessResponsePage />} />
          <Route path="/redirect" element={<ProcessResponsePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// TODO: Add possibility to retrieve form values from stored configuration
// TODO: 'Harmonize tests, ensure userevent is used