import { createContext, useState, useContext } from "react"

const ProfileContext = createContext(undefined)

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)

  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}

