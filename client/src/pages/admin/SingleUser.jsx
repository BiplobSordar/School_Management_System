import { useUploadProfileImageMutation } from "@/app/api/auth";
import { Clock, Plus, Mail, Phone, Droplet, User, Calendar, Users, Venus, Hash, BookOpen, GraduationCap, Briefcase, BarChart3, Settings, MapPin, Building, Globe, Book, Loader } from "lucide-react";
import React, { useState } from "react";
// import LoadingPage from "./Loading";
import { useSelector } from "react-redux";
// import { useToast } from "@/context/ToastContext";
import dummuProfileImage from '../../assets/user.png'
import { useModal } from "@/context/ModalContext";
import AdminEditForm from "@/components/forms/userEditForm/adminEditForm";
import NotFoundPage from "../NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, Loader2 } from "lucide-react";
import LoadingPage from "../Loading";
import { useDeleteUserByAdminMutation, useGetSingleUserProfileQuery, useUploadProfileImageByAdminMutation } from "@/app/api/adminApi";
import { useToast } from "@/context/ToastContext";
import { ParentEditFormByAdmin, StudentEditFormByAdmin, TeacherEditFormByAdmin } from "@/components/forms/userEditForm/UpdateUserByAdminForms";
import { capitalizeFirstLetter, convertToLocalTime } from '../../lib/utils'
const SingleUser = () => {
  const { user_id } = useParams();
  const { openModal, closeModal } = useModal()
  const navigate = useNavigate()
  const { showToast } = useToast()
  
  
  
  const { user } = useSelector((state) => state.auth)
  const { data, isLoading, isSuccess, isError } = useGetSingleUserProfileQuery(user_id)
  const [uploadProfileImageByAdmin, { isLoading: uploadProfileImageByAdminLoading, data: uploadProfileImageByAdminData }] = useUploadProfileImageByAdminMutation()
  const [deleteUser, { isLoading: deleteUserIsLoadign }] = useDeleteUserByAdminMutation();
  
  const [image, setImage] = useState(data?.user?.profile_image);



  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result);
        console.log(reader.result)
        const response = await uploadProfileImageByAdmin({ file: reader.result, user_id: data?.user?.user_id }).unwrap()
        
        showToast(response?.message, 'success')
      };
      reader.readAsDataURL(file);


    }

  };
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this ${data?.user?.role}?`)) {
      await deleteUser(data?.user?.user_id);
      navigate('/admin/user_lists')
    }
  };
  const handleModal = (role) => {
    console.log('i am here at the hadelemoadal')

    switch (role) {
      case 'student':

        openModal(<StudentEditFormByAdmin closeModal={closeModal} profileData={data?.user} />)
        break;
      case 'teacher':

        openModal(<TeacherEditFormByAdmin closeModal={closeModal} profileData={data?.user} />)
        break;
      case 'parent':

        openModal(<ParentEditFormByAdmin closeModal={closeModal} profileData={data?.user} />)
        break;

      default:
        break;
    }


  }






  return (



    <div className="w-full bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">

      {isLoading ? <LoadingPage /> : <>

        {/* Header */}
        {user.role === 'admin' && <div className="w-full mb-5 flex justify-end"> <button
          onClick={handleDelete}
          disabled={deleteUserIsLoadign && user.role !== 'admin'}
          className="flex items-center justify-end gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {deleteUserIsLoadign ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
          Delete {capitalizeFirstLetter(data?.user?.role)}
        </button></div>}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg p-6 rounded-xl mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">My Profile</h1>

          <span className="my-5">{capitalizeFirstLetter(data?.user?.role)}</span>
          <p className="text-sm flex items-center gap-2 opacity-80 mt-1">
            <Clock className="w-4 h-4" /> Last updated: <span className="font-medium">{convertToLocalTime(data?.user?.updated_at)}</span>
          </p>
        </div>



        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Image */}
          <div className="bg-white shadow-xl p-6 rounded flex flex-col items-center space-y-4">
            <div className="relative">
              {/* <img src={data?.user?.profile_image ? data.user.profile_image : dummuProfileImage} alt="Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600" /> */}
              {uploadProfileImageByAdminLoading ? <Loader className="w-32 animate-spin h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600" /> : <img src={data?.user?.profile_image ? data?.user?.profile_image : dummuProfileImage} alt="Profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-600" />}
              <input type="file" disabled={uploadProfileImageByAdminLoading} id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
              <label htmlFor="image-upload" className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                <Plus size={20} />
              </label>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{data?.user?.first_name} {data?.user?.last_name}</h2>
            <p className="text-sm md:text-lg text-gray-500">{data?.email}</p>
            {user?.role === 'admin' && <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700" onClick={() => { handleModal(data?.user?.role) }}>Edit Profile</button>}
          </div>

          {/* Personal Details */}
          <div className="lg:col-span-2 bg-white shadow-xl p-6 rounded">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-indigo-600 w-6 h-6" /> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
              <div className="flex items-center gap-3">
                <User className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">First Name:</span> {data?.user?.first_name}
              </div>
              <div className="flex items-center gap-3">
                <User className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Last Name:</span> {data?.user?.last_name}
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Email:</span> {data?.user?.email}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Phone:</span> {data?.user?.phone}
              </div>
              <div className="flex items-center gap-3">
                <Droplet className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Blood Group:</span> {data?.user?.blood_group}
              </div>
              <div className="flex items-center gap-3">
                <Venus className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Gender:</span> {data?.user?.gender}
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Date of Birth:</span> {data?.user?.date_of_birth.split("T")[0]}
              </div>
            </div>
          </div>
        </div>



        {/* Role-Specific Sections */}
        {data?.user?.role === "student" && (
          <div className="bg-white shadow-xl p-6 rounded mt-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="text-indigo-600 w-6 h-6" /> Student Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
              <div className="flex items-center gap-3">
                <User className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Father Name:</span> {data?.user?.father_name}
              </div>
              <div className="flex items-center gap-3">
                <User className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Mother Name:</span> {data?.user?.mother_name}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Guardian Contact:</span> {data?.user?.guardian_contact}
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Admission Date:</span> {data?.user?.admission_date.split("T")[0]}
              </div>
              <div className="flex items-center gap-3">
                <Hash className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Grade:</span> {data?.user?.grade}
              </div>
              <div className="flex items-center gap-3">
                <Hash className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Section:</span> {data?.user?.section}
              </div>
              <div className="flex items-center gap-3">
                <Hash className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Admission Number:</span> {data?.user?.admission_number}
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
              <span className="font-medium text-gray-900">Street :</span> {data?.user?.street_address}
            </div>
            <div className="flex items-center gap-3">
              <Building className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">City:</span> {data?.user?.city}
            </div>
            <div className="flex items-center gap-3">
              <Globe className="text-indigo-600 w-5 h-5" />
              <span className="font-medium text-gray-900">State:</span> {data?.user?.state}
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600 w-5 h-5" />

              <span className="font-medium text-gray-900">Postal Code:</span> {data?.user?.postal_code}
            </div>
          </div>
        </div>



        {data?.user?.role === "teacher" && (
          <div className="bg-white shadow-xl p-6 rounded mt-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase className="text-indigo-600 w-6 h-6" /> Teacher Details

            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm md:text-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="text-indigo-600 w-5 h-5" />

                <span className="font-medium text-gray-900">Qualification:</span> {data?.user?.qualification}
              </div>
              <div className="flex items-center gap-3">
                <Book className="text-indigo-600 w-5 h-5" />

                <span className="font-medium text-gray-900">Subject:</span> {data?.user?.subject}
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-600 w-5 h-5" />
                <span className="font-medium text-gray-900">Experience:</span> {data?.user?.experience}

              </div>
            </div>
          </div>
        )}




        {/* Admin Section */}
        {data?.user?.role === "admin" && (
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
      </>}






    </div>
  );
};

export default SingleUser



// import { useGetSingleUserProfileQuery } from '@/app/api/adminApi'
// import React from 'react'
// import { useParams } from 'react-router-dom'

// const SingleUser = () => {
//   const { user_id } = useParams()

//   const { data, isLoading, isError } = useGetSingleUserProfileQuery(user_id)
//   console.log(data,'this is the data form single user')
//   return (
//     <div>SingleUser</div>
//   )
// }

// export default SingleUser


