import { AppRouter } from "./routes";
import { AuthProvider } from "./context";
import { ErrorBoundary } from "react-error-boundary";

export const App = () => {
  const Fallback = ({ error }) => {
    return (
      <div style={{ width: "100%", height: "100vh", background: "white" }}>
        <h1 style={{ width: "50%", margin: "auto", paddingTop: "60px" }}>
          Desculpe ocorreu um erro, mas já estamos trabalhando para resolve-lo
        </h1>

        <h4 style={{ width: "50%", margin: "50px auto 0 auto" }}>
          Erro: {error.message}
        </h4>
      </div>
    );
  };

  return (
    <ErrorBoundary fallbackRender={Fallback}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ErrorBoundary>
  );
};
