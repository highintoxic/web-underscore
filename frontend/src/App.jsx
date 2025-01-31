import { Routes, Route } from "react-router"
import { Home } from "./Pages"
const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  )
}

export default App
