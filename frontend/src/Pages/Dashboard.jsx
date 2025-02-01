import { Link } from "react-router-dom"
import { useProfile } from "../contexts/ProfileContext"
import UserStaticDataForm from "./UserStaticDataForm"
import ResultsPage from "./ResultsPage"

const Dashboard = () => {
  const { profile } = useProfile()

  if (!profile) {
    return <UserStaticDataForm />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Health Dashboard</h1>
      <nav className="mb-8">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/profile" className="text-indigo-600 hover:text-indigo-800">
              Update Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/results" className="text-indigo-600 hover:text-indigo-800">
              View Results
            </Link>
          </li>
        </ul>
      </nav>
      <ResultsPage />
    </div>
  )
}

export default Dashboard

