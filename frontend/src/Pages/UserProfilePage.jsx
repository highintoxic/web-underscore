import { BaseLayout } from "../Layouts"
import UserStaticDataForm from "./UserStaticDataForm"

export default function UserProfilePage() {
  return (
    <BaseLayout>
    <div className="container mx-auto px-4 pt-20">
      <UserStaticDataForm />
    </div>
    </BaseLayout>
    
  )
}

