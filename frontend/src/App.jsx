import { Routes, Route } from "react-router"
import { Home,SignIn,SignUp, NotFound,DiseaseSlider,HealthCalculator} from "./Pages"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/awareness" element={<DiseaseSlider/>}/>
      <Route path="/healthcalculator" element={<HealthCalculator/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
