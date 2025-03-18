import multer from "multer";

const storage=multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        fieldSize: 10 * 1024 * 1024, // 10MB
    }
})
export default upload


