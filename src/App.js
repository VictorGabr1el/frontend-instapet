import { AppRouter } from "./routes";
import { AuthProvider } from "./context";

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
