
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"

const MyRoute = () => {
  const apiUrl = "http://localhost:5500/api";

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App apiUrl={apiUrl}/>} />
            <Route path="/create" element={<FormComponent apiUrl={apiUrl} />} />
            <Route path="/blog/:slug" element={<SingleComponent apiUrl={apiUrl}/>} />
            <Route path="/blog/edit/:slug" element={<EditComponent apiUrl={apiUrl}/>} />
            <Route path="/login" element={<LoginComponent apiUrl={apiUrl} />} />
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoute