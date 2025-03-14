import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserLoginMutation } from "@/app/api/auth";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "@/app/features/auth/authSlice";

const adminLoginSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});



const AdminLoginForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(adminLoginSchema),
  });
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [userLogin, { isError, isLoading, isSuccess, data, error }] = useUserLoginMutation()

  const onSubmit = async (data) => {
    console.log("Admin Login Data:", data);
    // Add login logic here
    try {

      const response = await userLogin({ ...data, role: 'admin' }).unwrap()
      console.log(response.user,'this is the user data')
      

      showToast(response?.message, 'success')
      navigate('/admin')

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
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Admin Login</h2>
      <div className="space-y-4">
        <input
          placeholder="email"
          {...register("email")}
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={inputClass}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-2xl hover:bg-blue-600 transition"
        disabled={isLoading}
      >
        {isLoading ? 'Please Wait' : 'Login'}
      </button>
    </form>
  );
};

export default AdminLoginForm;