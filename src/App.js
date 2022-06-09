import logo from './logo.svg';
import './App.css';
import { Routes , Route } from 'react-router-dom';
import BlogList from "./components/BlogList";
import SingleBlog from "./components/SingleBlog";

function App() {
  return (
    <div className="App bg-gray-100 h-screen">
      <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="/blog/:id" element={<SingleBlog/>}/>
      </Routes>
    </div>
  );
}

export default App;
