import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useAuthStore } from "./store/store";

function App() {
  const { fetchProfile } = useAuthStore();

  // Check if user is already logged in (has valid cookie) on app load
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return <AppRoutes />;
}

export default App;
