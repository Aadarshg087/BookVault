import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ErrorModal = ({ error, onClose }) => {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          className="fixed inset-x-0 top-10 flex items-center justify-center bg-background text-font text-center z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background outline-1 p-6 rounded-lg shadow-xl  px-30"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <p className="mb-4 text-lg">{error}</p>
            <button
              className="hover:text-red-800 bg-red-500  hover:bg-red-200 hover:outline-1 cursor-pointer text-sm  px-6 py-1 rounded duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
