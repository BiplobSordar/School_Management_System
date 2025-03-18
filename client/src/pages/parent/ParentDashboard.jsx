import { Calendar, CheckCircle, Star, Users, Bell } from "lucide-react";

const ParentDashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Children Overview */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Children Overview</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">👦 John Doe - Grade: 10, Attendance: 92%</p>
            <p className="text-gray-700">👧 Sarah Smith - Grade: 8, Attendance: 87%</p>
          </div>
        </div>

        {/* Upcoming Parent Meetings */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-green-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Parent Meetings</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📅 Parent-Teacher Meeting - <span className="font-medium">March 20, 2025</span></p>
            <p className="text-gray-700">📅 Meeting with Principal - <span className="font-medium">March 25, 2025</span></p>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-red-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Updates</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📌 New assignment posted in Mathematics.</p>
            <p className="text-gray-700">📌 Parent-Teacher meeting scheduled for next week.</p>
          </div>
        </div>

        {/* Academic Progress */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Academic Progress</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📊 John Doe - Mathematics: <span className="font-bold text-green-600">A</span></p>
            <p className="text-gray-700">📊 Sarah Smith - Science: <span className="font-bold text-blue-600">B+</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
