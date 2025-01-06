import { Routes, Route } from "react-router-dom";
import { VideoSummarizer } from "./Pages/VideoSummarizer";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<VideoSummarizer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
