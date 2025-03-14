const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
            <h2 className="text-2xl font-semibold mt-6">Loading...</h2>
            <p className="text-lg text-gray-300 mt-2 text-center">
                Please wait while we load the content.
            </p>
        </div>
    );
};

export default LoadingPage;