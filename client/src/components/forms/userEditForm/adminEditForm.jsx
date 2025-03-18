
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useToast } from "@/context/ToastContext";
import { useUpdateProfileDetailsMutation, useGetProfileQuery } from "@/app/api/auth";

const adminSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  date_of_birth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  blood_group: z.string().min(1, "Blood group is required"),
  role: z.string().default("admin"),
  street_address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(1, "Postal code is required"),
});

const AdminEditForm = ({ closeModal }) => {
  // Initialize form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(adminSchema),
  });

  const { user } = useSelector((state) => state.auth);
  const { showToast } = useToast();


  // Fetch profile data
  const { data: profileData, refetch: refetchProfileData } = useGetProfileQuery();

  // Update profile mutation
  const [updateProfileDetails, { isLoading: updateUserIsLoading }] = useUpdateProfileDetailsMutation();



  // Submit Handler
  const onSubmit = async (formData) => {
    try {
      const response = await updateProfileDetails(formData).unwrap();
      // Refresh profile data
      await refetchProfileData();

      showToast(response?.message, "success");
      closeModal(); // Close modal after update
    } catch (err) {
      console.log(err, "Error updating profile");
      showToast(err?.data?.message || "Something went wrong!", "error");
    }
  };







  // Populate form fields when profileData is available
  useEffect(() => {
    console.log(profileData)
    if (profileData) {
      Object.keys(profileData).forEach((key) => {
        if (profileData[key] !== null && profileData[key] !== undefined) {
          setValue(key, profileData[key]);
          if (key == 'date_of_birth') {
            setValue(key, profileData[key].split("T")[0])
          }
        }
      });
    }
  }, [profileData, setValue]);


  // Input Styling
  const inputClass =
    "w-full rounded-2xl border border-gray-300 bg-white py-2 px-4 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      {/* Personal Information */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-800">Personal Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="hidden" {...register("role")} value="admin" />

          <div>
            <label className="block mb-2 text-gray-700">First Name</label>
            <input placeholder="First Name" {...register("first_name")} className={inputClass} />
            {errors.first_name && <p className="text-red-500 text-sm mt-2">{errors.first_name?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Last Name</label>
            <input placeholder="Last Name" {...register("last_name")} className={inputClass} />
            {errors.last_name && <p className="text-red-500 text-sm mt-2">{errors.last_name?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Email</label>
            <input type="email" placeholder="Email" {...register("email")} className={inputClass} />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Phone Number</label>
            <input type="tel" placeholder="Phone Number" {...register("phone")} className={inputClass} />
            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Date of Birth</label>
            <input type="date" {...register("date_of_birth")} className={inputClass} />
            {errors.date_of_birth && <p className="text-red-500 text-sm mt-2">{errors.date_of_birth?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Gender</label>
            <select {...register("gender")} className={inputClass}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-2">{errors.gender?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Blood Group</label>
            <select {...register("blood_group")} className={inputClass}>
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>B+</option>
              <option>O+</option>
              <option>AB+</option>
            </select>
            {errors.blood_group && <p className="text-red-500 text-sm mt-2">{errors.blood_group?.message}</p>}
          </div>
        </div>
      </fieldset>

      {/* Address Information */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-800">Address Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">Street Address</label>
            <input placeholder="Address" {...register("street_address")} className={inputClass} />
            {errors.street_address && <p className="text-red-500 text-sm mt-2">{errors.street_address?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">City</label>
            <input placeholder="City" {...register("city")} className={inputClass} />
            {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city?.message}</p>}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">State</label>
            <input placeholder="State" {...register("state")} className={inputClass} />
            {errors.state && <p className="text-red-500 text-sm mt-2">{errors.state?.message}</p>}
          </div>
        </div>
      </fieldset>

      <button type="submit" className="w-full bg-yellow-400 text-white py-3 rounded-2xl hover:bg-blue-600 transition">
        {updateUserIsLoading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default AdminEditForm;
