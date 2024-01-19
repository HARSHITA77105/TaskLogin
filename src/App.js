import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/LoginForm';
import Welcome from './Components/Welcome';

function App() {
  return (

<>


<Router>
 


    <Routes>
      <Route path = "/" element={<LoginForm/>}/>
      <Route path="/welcome" element={<Welcome />} />
     
    </Routes>

   
    
 
</Router>


</>
   
  );
}

export default App;
