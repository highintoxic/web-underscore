import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home,SignIn,SignUp, NotFound,DiseaseSlider,HealthCalculator, CommunityForum, TravelingDoctors,UserProfilePage,ResultsPage,ContactPage} from "./Pages"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/awareness" element={<DiseaseSlider/>}/>
      <Route path="/healthcalculator" element={<HealthCalculator/>}/>
      <Route path="/communityforum" element={<CommunityForum/>}/>
      <Route path="/doctor" element={<TravelingDoctors/>}/>
      <Route path="/results" element={<ResultsPage/>}/>
      <Route path="/dashboard" element={<UserProfilePage/>}/>
      <Route path="/contact" element={<ContactPage/>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default App
