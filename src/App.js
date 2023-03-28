import './App.css';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';

function App() {
  const user = null;
  return (
    user ? (
    <div className="app">
      <HomeScreen />
    </div>
      ) : ( 
      <LoginScreen />
    )
  );
}

export default App;
