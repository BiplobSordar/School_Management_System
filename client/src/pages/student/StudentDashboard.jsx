import { Calendar, CheckCircle, Star, Clock, Bell } from "lucide-react";

const StudentDashboard = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="text-indigo-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Classes</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📘 Mathematics - <span className="font-medium">10:00 AM</span></p>
            <p className="text-gray-700">🔬 Science - <span className="font-medium">11:00 AM</span></p>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Attendance Summary</h2>
          </div>
          <p className="text-gray-700">✅ Your attendance is <span className="font-bold">95%</span> this month.</p>
        </div>

        {/* Grades Overview */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Grades Overview</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📊 Mathematics: <span className="font-bold text-green-600">A</span></p>
            <p className="text-gray-700">📊 Science: <span className="font-bold text-blue-600">B+</span></p>
            <p className="text-gray-700">📊 English: <span className="font-bold text-purple-600">A-</span></p>
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="text-blue-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Timetable</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📅 <span className="font-medium">Monday:</span> Mathematics, Science, English</p>
            <p className="text-gray-700">📅 <span className="font-medium">Tuesday:</span> History, Geography, Mathematics</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-red-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📌 New assignment posted in Mathematics.</p>
            <p className="text-gray-700">📌 Parent-Teacher meeting on Friday.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
