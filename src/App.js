import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>
    </div>
  );
}

export default App;
