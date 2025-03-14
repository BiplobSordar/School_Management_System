import React, { useState, useEffect } from "react";

const initialAnnouncements = [
  {
    id: 1,
    title: "School Holiday",
    date: "2023-10-15",
    content: "The school will remain closed on October 20th for a public holiday.",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2023-10-18",
    content: "A parent-teacher meeting is scheduled for October 25th at 10:00 AM.",
  },
  {
    id: 3,
    title: "Exam Schedule",
    date: "2023-10-20",
    content: "The final exam schedule has been published. Please check the school portal for details.",
  },
];

const AnnouncementSection = () => {
  const [announcements] = useState(initialAnnouncements);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-slide logic (every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [announcements.length]);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="p-8 bg-blue-400 relative">
      <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">📢 Announcements</h1>

      {/* Slider Wrapper */}
      <div className="relative overflow-hidden h-40">
        <div
          className="flex transition-transform ease-in-out duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="min-w-full flex items-center justify-center"
              onClick={() => handleAnnouncementClick(announcement)}
            >
              <div className="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer p-6 border border-gray-200 hover:border-blue-500 w-3/4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{announcement.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{announcement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Slider Dots */}
      <div className="flex justify-center mt-4">
        {announcements.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 mx-1 rounded-full transition-all ${
              currentIndex === index ? "bg-white" : "bg-blue-200"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900">{selectedAnnouncement.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{selectedAnnouncement.date}</p>
            <p className="text-gray-700 mt-4 leading-relaxed">{selectedAnnouncement.content}</p>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition"
            >
              ✖️
            </button>
          </div>
        </div>
      )}

      {/* Add Announcement Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => alert("Add announcement functionality here")}
          className="bg-white text-blue-600 font-medium py-3 px-8 rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-md"
        >
          ➕ Add Announcement
        </button>
      </div>
    </div>
  );
};

export default AnnouncementSection;
