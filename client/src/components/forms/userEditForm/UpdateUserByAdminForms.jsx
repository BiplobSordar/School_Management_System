





import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


import { useToast } from "@/context/ToastContext";
import { useEffect } from "react";
import { useUpdateProfileDetailsByAdminMutation } from "@/app/api/adminApi";




export const StudentEditFormByAdmin = ({ closeModal, profileData }) => {
    
    const [ updateProfileDetailsByAdmin,{data,isLoading,isError,isSuccess,error,}]=useUpdateProfileDetailsByAdminMutation()
    const schema = z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(1, "Phone number is required"),
        date_of_birth: z.string().min(1, "Date of Birth is required"),
        gender: z.string().min(1, "Gender is required"),
        blood_group: z.string().min(1, "Blood group is required"),
       
        role: z.string(),
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")

        street_address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        postal_code: z.string().min(1, "Postal code is required"),


        father_name: z.string().min(1, "Father's name is required"),
        mother_name: z.string().min(1, "Mother's name is required"),
        guardian_contact: z.string().min(1, "Guardian contact number is required"),

        // studentDetails 

        admission_date: z.string().min(1, "Admission date is required"),
        grade: z.string().min(1, "Class/Grade is required"),
        section: z.string().min(1, "Section is required"),


    });

    const { showToast } = useToast()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (formData) => {
        console.log(formData,'this is the formdata')

        try {
            const response = await updateProfileDetailsByAdmin({formData,user_id:profileData.user_id}).unwrap()
            showToast(response?.message, "success");
            closeModal()
            

        } catch (err) {
            console.log(err, "this is the error");
            showToast(err?.data?.message || "Something went wrong!", "error");
        }
    };

    useEffect(() => {
        console.log(profileData)
        if (profileData) {
            Object.keys(profileData).forEach((key) => {
                if (profileData[key] !== null && profileData[key] !== undefined) {
                    setValue(key, profileData[key]);
                    if (key == 'date_of_birth' || key == 'admission_date') {
                        setValue(key, profileData[key].split("T")[0])
                    }
                }
            });
        }
    }, [profileData, setValue]);



    const inputClass =
        "w-full rounded-2xl border border-gray-300 bg-white py-2 px-4 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
        >
            {/* Personal Information */}

            <fieldset className="space-y-4">
                {/* <h1>Student Edit Form</h1> */}
                <legend className="text-xl font-semibold text-gray-800">Student  Personal Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="hidden">

                        <input {...register("role", { value: "student" })} type="hidden" />
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
                  
                </div>
            </fieldset>

            {/* Parent/Guardian Information */}

            <fieldset className="space-y-4">
                <legend className="text-xl font-semibold text-gray-800">Parent/Guardian Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Father's Name</label>
                        <input placeholder="Father's Name" {...register("father_name")} className={inputClass} />
                        {errors.father_name && <p className="text-red-500 text-sm mt-2">{errors.father_name?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Mother's Name</label>
                        <input placeholder="Mother's Name" {...register("mother_name")} className={inputClass} />
                        {errors.mother_name && <p className="text-red-500 text-sm mt-2">{errors.mother_name?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Guardian Contact Number</label>
                        <input type="tel" placeholder="Guardian Contact Number" {...register("guardian_contact")} className={inputClass} />
                        {errors.guardian_contact && <p className="text-red-500 text-sm mt-2">{errors.guardian_contact?.message}</p>}
                    </div>
                </div>
            </fieldset>

            {/* Academic Information */}

            <fieldset className="space-y-4">
                <legend className="text-xl font-semibold text-gray-800">Academic Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 text-gray-700">Admission Date</label>
                        <input type="date" {...register("admission_date")} className={inputClass} />
                        {errors.admission_date && <p className="text-red-500 text-sm mt-2">{errors.admission_date?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Class/Grade</label>
                        <select {...register("grade")} className={inputClass}>
                            <option value="">Select Class/Grade</option>
                            <option value={1}>Grade 1</option>
                            <option value={2}>Grade 2</option>
                            <option value={3}>Grade 3</option>
                            <option value={4}>Grade 4</option>
                            <option value={5}>Grade 5</option>
                            <option value={6}>Grade 6</option>
                            <option value={7}>Grade 7</option>
                            <option value={8}>Grade 8</option>
                            <option value={9}>Grade 9</option>
                            <option value={10}>Grade 10</option>
                        </select>
                        {errors.grade && <p className="text-red-500 text-sm mt-2">{errors.grade?.message}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-700">Section</label>
                        <select {...register("section")} className={inputClass}>
                            <option value="">Select Section</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                        </select>
                        {errors.section && <p className="text-red-500 text-sm mt-2">{errors.section?.message}</p>}
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
                    <div>
                        <label className="block mb-2 text-gray-700">Postal Code</label>
                        <input placeholder="Postal Code" {...register("postal_code")} className={inputClass} />
                        {errors.postal_code && <p className="text-red-500 text-sm mt-2">{errors.postal_code?.message}</p>}
                    </div>
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
                    {isLoading ? 'Updating,,,' : "Update User "}
                </button>
            </div>
        </form>
    );
};



export const TeacherEditFormByAdmin = ({ closeModal, profileData }) => {
    const [ updateProfileDetailsByAdmin,{data,isLoading,isError,isSuccess,error}]=useUpdateProfileDetailsByAdminMutation()
    const teacherSchema = z.object({
        first_name: z.string().min(1, "First name is required"),
        last_name: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        phone: z.string().min(1, "Phone number is required"),
        date_of_birth: z.string().min(1, "Date of Birth is required"),
        gender: z.string().min(1, "Gender is required"),
        blood_group: z.string().min(1, "Blood group is required"),
        
        role: z.string(),
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")

        street_address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        postal_code: z.string().min(1, "Postal code is required"),

        qualification: z.string().min(1, "Qualification is required"),
        subject: z.string().min(1, "Subject is required"),
        experience: z.string().min(1, "Experience is required"),

    });
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(teacherSchema),
    });
    const { showToast } = useToast()


    const onSubmit = async (formData) => {
        console.log("Teacher Registration Data:", formData);
        try {
            const response = await updateProfileDetailsByAdmin({formData,user_id:profileData.user_id}).unwrap()
            showToast(response?.message, "success");
            

            closeModal()

        } catch (err) {
            console.log(err, "this is the error");
            showToast(err?.data?.message || "Something went wrong!", "error");
        }
    };


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


    const inputClass =
        "w-full rounded-2xl border border-gray-300 bg-white py-2 px-4 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out";

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6"
        >
            {/* Personal Information */}
            <fieldset className="space-y-4">
                <legend className="text-xl font-semibold text-gray-800">Teacher Personal Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="hidden">
                        <label for="hiddenField">Hidden Field (default value)</label>
                        <input type="text" {...register('role')} value="teacher" className="hidden" />
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
                            <option>A-</option>
                            <option>B-</option>
                            <option>O-</option>
                            <option>AB-</option>
                        </select>
                        {errors.blood_group && <p className="text-red-500 text-sm mt-2">{errors.blood_group?.message}</p>}
                    </div>

                </div>
            </fieldset>
            {/* Professional Information */}
            <fieldset className="space-y-4">
                <legend className="text-xl font-semibold text-gray-800">Professional Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input placeholder="Qualification" {...register("qualification")} className={inputClass} />
                        {errors.qualification && <p className="text-red-500 text-sm mt-2">{errors.qualification?.message}</p>}

                    </div>
                    <div>
                        <input placeholder="Subject" {...register("subject")} className={inputClass} />
                        {errors.subject && <p className="text-red-500 text-sm mt-2">{errors.subject?.message}</p>}

                    </div>
                    <div>
                        <input placeholder="Experience (in years)" {...register("experience")} className={inputClass} />
                        {errors.experience && <p className="text-red-500 text-sm mt-2">{errors.experience?.message}</p>}

                    </div>
                </div>
            </fieldset>

            {/* Address section */}
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
                    <div>
                        <label className="block mb-2 text-gray-700">Postal Code</label>
                        <input placeholder="Postal Code" {...register("postal_code")} className={inputClass} />
                        {errors.postal_code && <p className="text-red-500 text-sm mt-2">{errors.postal_code?.message}</p>}
                    </div>
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
                    {isLoading ? "Updating...." : "Update User"}
                </button>
            </div>
        </form>
    );
};




export const ParentEditFormByAdmin = ({ closeModal, profileData }) => {
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

    const { showToast } = useToast()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(parentRequestSchema),
    });

    const onSubmit = async (formData) => {
        console.log("Parent Request Data:", formData);

        try {
            //   const response = await parentRegistration(formData).unwrap();;
            //   showToast(response?.message, "success");
            //   navigate('/login?role=parent')

        } catch (err) {
            console.log(err, "this is the error");
            showToast(err?.data?.message || "Something went wrong!", "error");
        }
    };

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



