import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStudentLoginMutation, useUserLoginMutation } from "@/app/api/auth";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/app/features/auth/authSlice";

const studentLoginSchema = z.object({
  admission_number: z.string().min(1, "Admission number is required"),
  password: z.string().min(1, "Password is required"),
});

const StudentLoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(studentLoginSchema),
  });

  const navigate = useNavigate()
  const { showToast } = useToast()
  const [studentLogin, { isError, isLoading, isSuccess, data, error }] = useStudentLoginMutation()


  const onSubmit = async (data) => {
    console.log("Student Login Data:", data);
    // Add login logic here
    try {

      const response = await studentLogin({ ...data, role: 'student' }).unwrap()
      
      showToast(response?.message, 'success')
      navigate('/student')

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
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Student Login</h2>
      <div className="space-y-4">
        <input
          placeholder="Admission Number"
          {...register("admission_number")}
          className={inputClass}
        />
        {errors.admission_number && (
          <p className="text-red-500 text-sm">{errors.admission_number.message}</p>
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

export default StudentLoginForm;