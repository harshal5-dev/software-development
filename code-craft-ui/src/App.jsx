import {BrowserRouter} from "react-router-dom";
import Layout from "./components/layout/Layout";
import {Toaster} from "./components/ui/sonner";
import {Provider} from "react-redux";
import {store} from "@/store/reduxStore";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout/>
        <Toaster richColors/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
