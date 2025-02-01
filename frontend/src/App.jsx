import { Routes, Route } from "react-router"
import { Home, SignIn, SignUp, NotFound, DiseaseSlider, HealthCalculator, CommunityForum } from "./Pages"
import VideoChat from "./Pages/VideoChat"

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/awareness" element={<DiseaseSlider />} />
      <Route path="/healthcalculator" element={<HealthCalculator />} />
      <Route path="/communityforum" element={<CommunityForum />} />
      <Route path="/videochat" element={<VideoChat />} />
      <Route path="/videochat/:roomID" element={<VideoChat />} />
      <Route path="*" element={<NotFound />} />
    </Routes> 
  )
}

export default App
