import { Routes, Route } from "react-router"
import { Home,SignIn,SignUp, NotFound} from "./Pages"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
