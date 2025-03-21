import { useGetProfileQuery, useUploadProfileImageMutation } from "@/app/api/auth";
import { Clock, Plus, Mail, Phone, Droplet, User, Calendar, Users, Venus, Hash, BookOpen, GraduationCap, Briefcase, BarChart3, Settings, MapPin, Building, Globe, Book, Loader } from "lucide-react";
import React, { useState } from "react";
import LoadingPage from "./Loading";
import { useSelector } from "react-redux";
import { useToast } from "@/context/ToastContext";
import dummuProfileImage from '../assets/user.png'
import { useModal } from "@/context/ModalContext";
import AdminEditForm from "@/components/forms/userEditForm/adminEditForm";
import NotFoundPage from "./NotFound";
import { useParams } from "react-router-dom";
const UserProfilePage = () => {
  const { user_id } = useParams();
  const { data, isLoading: profileIsLoading, isError, error } = useGetProfileQuery()
  const { showToast } = useToast()
  const { user } = useSelector((state) => state.auth)
  // const user = {
  //   role: "student",
  //   first_name: "Somi",
  //   last_name: "Rahman",
  //   email: "somi.rahman@200@gmail.com",
  //   phone: "+1-520-509-909-1232",
  //   blood_group: "O+",
  //   gender: "Female",
  //   date_of_birth: "1995-04-10",
  //   street_address: "123 Main St",
  //   city: "Dhaka",
  //   state: "Dhaka",
  //   postal_code: "1209",
  //   profile_image: "https://via.placeholder.com/150",
  //   qualification: "MSc in Computer Science",
  //   subject: "Mathematics",
  //   experience: "5 years",
  //   father_name: "Karim Rahman",
  //   mother_name: "Sumaiya Rahman",
  //   guardian_contact: "+8801712345678",
  //   admission_date: "2020-06-15",
  //   grade: "10",
  //   section: "A",
  //   admission_number: "STU2024001",
  // };

  const [image, setImage] = useState(user.profile_image);
  const [uploadProfileImage, { isLoading: profileUploadLoading, data: profileImageData }] = useUploadProfileImageMutation()

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result);
        console.log(reader.result)
        const response = await uploadProfileImage(reader.result).unwrap()
        console.log(response, 'thsi si the response')
        showToast(response?.message, 'success')

      };
      reader.readAsDataURL(file);


    }

  };
  const { openModal, closeModal } = useModal()
  const handleModal = () => {
    openModal(<AdminEditForm closeModal={closeModal} />)
  }

if(user.role=='parent') return <NotFoundPage/>
  

  if (profileIsLoading) return <LoadingPage />
  const {  first_name, city, postal_code, experience, street_address, subject, qualification, state, last_name, email, phone, blood_group, gender, date_of_birth, father_name, mother_name, guardian_contact, admission_date, grade, section, admission_number } = data

  return (
    <div className="w-full bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">


      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg p-6 rounded-xl mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">My Profile</h1>
        <p className="text-sm flex items-center gap-2 opacity-80 mt-1">
          <Clock className="w-4 h-4" /> Last updated: <span className="font-medium">97 Aug 2018, 14:44</span>
        </p>
      </div>

      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Image */}
        <div className="bg-white shadow-xl p-6 rounded flex flex-col items-center space-y-4">
          <div className="relative">
            {profileUploadLoading ? <Loader className="w-32 animate-spin h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600" /> : <img src={user?.profile_image ? user.profile_image : dummuProfileImage} alt="Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600" />}
            <input type="file" disabled={profileUploadLoading} id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
            <label htmlFor="image-upload" className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
              <Plus size={20} />
            </label>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{first_name} {last_name}</h2>
          <p className="text-sm md:text-lg text-gray-500">{email}</p>
          {user?.role === 'admin' && <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700" onClick={handleModal}>Edit Profile</button>}
        </div>

        {/* Personal Details */}
        <div className="lg:col-span-2 bg-white shadow-xl p-6 rounded">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-indigo-600 w-6 h-6" /> Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
            <div className="flex items-center gap-3">
              <User className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">First Name:</span> {first_name}
            </div>
            <div className="flex items-center gap-3">
              <User className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Last Name:</span> {last_name}
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Email:</span> {email}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Phone:</span> {phone}
            </div>
            <div className="flex items-center gap-3">
              <Droplet className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Blood Group:</span> {blood_group}
            </div>
            <div className="flex items-center gap-3">
              <Venus className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Gender:</span> {gender}
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Date of Birth:</span> {date_of_birth}
            </div>
          </div>
        </div>
      </div>



      {/* Role-Specific Sections */}
      {user?.role === "student" && (
        <div className="bg-white shadow-xl p-6 rounded mt-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <GraduationCap className="text-indigo-600 w-6 h-6" /> Student Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
            <div className="flex items-center gap-3">
              <User className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Father Name:</span> {father_name}
            </div>
            <div className="flex items-center gap-3">
              <User className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Mother Name:</span> {mother_name}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Guardian Contact:</span> {guardian_contact}
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Admission Date:</span> {admission_date}
            </div>
            <div className="flex items-center gap-3">
              <Hash className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Grade:</span> {grade}
            </div>
            <div className="flex items-center gap-3">
              <Hash className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Section:</span> {section}
            </div>
            <div className="flex items-center gap-3">
              <Hash className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Admission Number:</span> {admission_number}
            </div>
          </div>
        </div>
      )}


      {/* Address Section   */}

      <div className="bg-white shadow-xl p-6 rounded mt-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-4 flex items-center gap-2">
          <MapPin className="text-indigo-600 w-6 h-6" /> Address Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
          <div className="flex items-center gap-3">
            <MapPin className="text-indigo-600 w-5 h-5" />
            <span className="font-medium text-gray-900">Street :</span> {street_address}
          </div>
          <div className="flex items-center gap-3">
            <Building className="text-indigo-600 w-5 h-5" />
            <span className="font-medium text-gray-900">City:</span> {city}
          </div>
          <div className="flex items-center gap-3">
            <Globe className="text-indigo-600 w-5 h-5" />
            <span className="font-medium text-gray-900">State:</span> {state}
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-indigo-600 w-5 h-5" />

            <span className="font-medium text-gray-900">Postal Code:</span> {postal_code}
          </div>
        </div>
      </div>



      {user?.role === "teacher" && (
        <div className="bg-white shadow-xl p-6 rounded mt-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase className="text-indigo-600 w-6 h-6" /> Teacher Details

          </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
            <div className="flex items-center gap-3">
              <BookOpen className="text-indigo-600 w-5 h-5" />

              <span className="font-medium text-gray-900">Qualification:</span> {qualification}
            </div>
            <div className="flex items-center gap-3">
              <Book className="text-indigo-600 w-5 h-5" />

              <span className="font-medium text-gray-900">Subject:</span> {subject}
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">Experience:</span> {experience}

            </div>
          </div>
        </div>
      )}




      {/* Admin Section */}
      {user?.role === "admin" && (
        <div className="p-6">
          <div className="bg-white shadow-xl p-6 rounded-xl border-l-4 border-indigo-600 hover:shadow-2xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <User Cog className="text-indigo-600 w-6 h-6" />
              <h2 className="text-2xl font-semibold text-gray-800">Admin Section</h2>
            </div>
            <p className="text-lg text-gray-700">Welcome, Admin! Manage your dashboard here.</p>
          </div>

          {/* Admin Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {/* Manage Users */}
            <div className="bg-white shadow-md rounded p-6 border-l-4 border-green-500 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-green-600 w-5 h-5" />
                <h3 className="text-xl font-semibold text-gray-800">Manage Users</h3>
              </div>
              <p className="text-gray-600">View, edit, or remove users.</p>
            </div>

            {/* View Reports */}
            <div className="bg-white shadow-md rounded p-6 border-l-4 border-blue-500 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="text-blue-600 w-5 h-5" />
                <h3 className="text-xl font-semibold text-gray-800">View Reports</h3>
              </div>
              <p className="text-gray-600">Analyze performance and generate insights.</p>
            </div>

            {/* Settings */}
            <div className="bg-white shadow-md rounded p-6 border-l-4 border-yellow-500 hover:scale-105 transition-transform">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="text-yellow-600 w-5 h-5" />
                <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              </div>
              <p className="text-gray-600">Configure system settings and preferences.</p>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default UserProfilePage;


