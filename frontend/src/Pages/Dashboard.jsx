import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import UserStaticDataForm from "./UserStaticDataForm"

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      navigate("/results")
    }
  }, [navigate])

  return <UserStaticDataForm />
}

