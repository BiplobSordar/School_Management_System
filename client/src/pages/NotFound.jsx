import { Link } from "react-router-dom";


const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-9xl font-bold text-yellow-400">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-300 mt-2 text-center">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to='/'
        className="mt-6 px-6 py-3 bg-yellow-400  text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
      >
        Go Back Home
      </Link>
      

    </div>
  );
};

export default NotFoundPage;