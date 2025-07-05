import React from "react";
import Header from "../Components/Header";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen bg-background"
    >
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow font-inter bg-background pl-20 space-y-8 text-font">
          <div className="flex flex-col gap-2  pt-15">
            <h1 className="text-5xl font-bold">About Us</h1>
            <p className="text-sm max-w-[50%] leading-8">
              Welcome to Book Vault, your personal library companion designed to
              help you capture, organize, and reflect on every book you read.
              Whether you're a student, a lifelong learner, or a casual
              reader—this platform is built for readers who want to go beyond
              just reading. Reading without reflection is like eating without
              digesting. We noticed how difficult it was to keep track of
              insights, quotes, and ideas scattered across notebooks or random
              apps. So we built a focused tool that helps you:
            </p>
            <ul className="text-sm list-disc pl-4 space-y-4">
              <li>Save your book notes, quotes, and summaries in one place</li>
              <li>
                Organize content by tags, authors, genres, or custom categories
              </li>
              <li>
                Revisit your highlights when you need inspiration or revision
              </li>
            </ul>
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              ❤️ Built for Readers, by Readers
            </h1>
            <p className="text-sm max-w-[50%] leading-8">
              We're just getting started. If you have ideas, feedback, or just
              want to say hello—reach out to us. This platform is shaped by you.
            </p>
          </div>
          <div className=" ">
            <ul className="flex justify-center items-center gap-7">
              <SocialIcon
                url="https://linkedin.com/in/aadarshg087"
                bgColor="white"
                fgColor="black"
                target="_blank"
              />
              <SocialIcon
                url="https://github.com/aadarshg087"
                bgColor="white"
                fgColor="black"
                target="_blank"
              />
              <SocialIcon
                url="https://x.com/Aadarsh60285851"
                bgColor="white"
                fgColor="black"
                target="_blank"
              />
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
