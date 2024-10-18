import './App.css';
import { AuthEmailPasswordProvider } from './context/authEmailPassword';
import WebRoutes from './routes/WebRoutes';


function App() {
  return (
    <AuthEmailPasswordProvider>
      <WebRoutes />
    </AuthEmailPasswordProvider>
  );
}

export default App;
