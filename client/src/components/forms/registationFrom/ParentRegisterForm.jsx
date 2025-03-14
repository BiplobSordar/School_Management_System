import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useParentRegistrationMutation } from "@/app/api/auth";
const parentRequestSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  date_of_birth: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  blood_group: z.string().min(1, "Blood group is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.string(),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
  child_admission_number: z.string().min(1, "Admission Number is required"),

});

const ParentRequestForm = () => {
   const [parentRegistration, { data, error, isError, isLoading, isSuccess }] = useParentRegistrationMutation()
    const {showToast}=useToast()
    const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(parentRequestSchema),
  });

  const onSubmit =async (formData) => {
    console.log("Parent Request Data:", formData);
    
    try {
      const response = await parentRegistration(formData).unwrap();;
      showToast(response?.message, "success");
      navigate('/login?role=parent')

    } catch (err) {
      console.log(err, "this is the error");
      showToast(err?.data?.message || "Something went wrong!", "error");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-gray-300 bg-white py-2 px-4 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      {/* Parent Information */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-800">Personal Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="hidden">
            <label for="hiddenField">Hidden Field (default value)</label>
            <input type="text" {...register('role')} value="parent" className="hidden" />
          </div>
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
          <div>
            <label className="block mb-2 text-gray-700">Password</label>
            <input type="password" placeholder="Enter Password" {...register("password")} className={inputClass} />
            {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password?.message}</p>}
          </div>
        </div>
      </fieldset>
      {/* Child Information */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-semibold text-gray-800">Child Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Child Admission Number" type="text" {...register("child_admission_number")} className={inputClass} />
          {errors.child_admission_number && <p className="text-red-500 text-sm mt-2">{errors.child_admission_number?.message}</p>}
        </div>
      </fieldset>

      {/* Submit Button */}
      <div className="text-center">
      <button
          type="submit"
          className={`w-full md:w-1/3 bg-yellow-400 text-white py-3 rounded-2xl 
    hover:bg-blue-600 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Submit Registration"}
        </button>
      </div>


    </form>
  );
};

export default ParentRequestForm;