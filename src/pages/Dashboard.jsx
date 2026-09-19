import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome back, {user?.username}
          </h1>
          <div className="w-16 h-1 bg-blue-600"></div>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 border border-black text-black rounded-lg hover:bg-black hover:text-white transition text-sm font-medium"
        >
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-gray-500 text-sm mb-1">Projects</p>
          <p className="text-3xl font-bold text-black">3</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-gray-500 text-sm mb-1">Messages</p>
          <p className="text-3xl font-bold text-black">0</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-6">
          <p className="text-gray-500 text-sm mb-1">Profile Status</p>
          <p className="text-3xl font-bold text-blue-600">Active</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-black mb-3">Account Settings</h2>
        <p className="text-gray-500 text-sm mb-6">
          Manage your profile details and preferences here.
        </p>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
          Edit Profile
        </button>
      </div>
    </section>
  )
}