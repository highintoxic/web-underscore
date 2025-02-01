import { Routes, Route } from "react-router"
import { Home,SignIn,SignUp} from "./Pages"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
  )
}

export default App
