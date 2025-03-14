import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to show a toast
  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        {toasts.map((toast,index) => (
          <div
            key={index}
            className={`w-80 p-4 rounded shadow-lg text-white flex items-center gap-3 transition-opacity duration-300 animate-fadeIn ${
              toast.type === "success" ? "bg-green-500" :
              toast.type === "error" ? "bg-red-500" :
              toast.type === "warning" ? "bg-yellow-500" :
              "bg-blue-500"
            }`}
          >
            <span className="font-semibold capitalize">{toast.type}:</span>
            <p>{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
