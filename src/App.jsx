import { Routes, Route } from "react-router-dom";
import { VideoSummarizer } from "./Pages/VideoSummarizer";
import { NhostClient, NhostProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import Auth from "./Pages/Auth";
import ProtectRoute from "./components/ProtectRoute";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <VideoSummarizer />
              </ProtectRoute>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </NhostApolloProvider>
    </NhostProvider>
  );
}

export default App;
