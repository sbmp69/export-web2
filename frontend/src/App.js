import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Catalogue from "@/pages/Catalogue";
import { Toaster } from "@/components/ui/sonner";
import { I18nProvider } from "@/i18n/I18nProvider";

function App() {
  return (
    <I18nProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalogue" element={<Catalogue />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#141414",
              color: "#FDFBF7",
              border: "1px solid rgba(212, 175, 55, 0.3)",
            },
          }}
        />
      </div>
    </I18nProvider>
  );
}

export default App;
