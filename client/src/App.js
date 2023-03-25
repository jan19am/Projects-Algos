import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRegistration from './components/LoginRegistration';
import Dashboard from './components/Dashboard';
import LikeStatus from './components/LikeStatus';
import UserProfile from './components/UserProfile';

function App() {
  

  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/main' element= { <LoginRegistration/> }/>
        <Route path='/lightbulb' element= { <Dashboard/> }/>
        <Route path='/lightbulb/:id' element= { <LikeStatus/> }/>
        <Route path='/users/:id' element= { <UserProfile/> }/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;