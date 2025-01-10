import { Routes, Route } from "react-router-dom";
import { VideoSummarizer } from "./Pages/VideoSummarizer";
import { NhostClient, NhostProvider } from "@nhost/react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ProtectRoute from "./components/ProtectRoute";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <VideoSummarizer />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </NhostProvider>
  );
}

export default App;
