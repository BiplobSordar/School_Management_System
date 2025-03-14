import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-9xl font-bold text-red-500">500</h1>
      <h2 className="text-3xl font-semibold mt-4">Something Went Wrong</h2>
      <p className="text-lg text-gray-300 mt-2 text-center">
        We're sorry, but an unexpected error occurred. Please try again later.
      </p>
      <Link
         to='/'
        className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
      >
        Go Back Home
      </Link>
      
    </div>
  );
};

export default ErrorPage;