import { Calendar, CheckCircle, Star, FileText, Users } from "lucide-react";

const TeacherDashboard = () => {
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

        {/* Student Attendance */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Student Attendance</h2>
          </div>
          <p className="text-gray-700">✅ Your class attendance rate is <span className="font-bold">98%</span> this month.</p>
        </div>

        {/* Student Grades */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <Star className="text-yellow-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Student Grades</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📊 John Doe - Mathematics: <span className="font-bold text-green-600">A</span></p>
            <p className="text-gray-700">📊 Sarah Smith - Science: <span className="font-bold text-blue-600">B+</span></p>
          </div>
        </div>

        {/* Assignments Overview */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500 hover:scale-105 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-blue-600 w-5 h-5" />
            <h2 className="text-xl font-semibold text-gray-800">Assignments Overview</h2>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700">📌 New Math Assignment due in 2 days.</p>
            <p className="text-gray-700">📌 Science Assignment graded, results available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
