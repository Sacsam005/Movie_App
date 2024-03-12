import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../App";
import "./Video.css";

const Video = ({ videos }) => {
  const { scaleVariants } = useContext(AppContext);
  const [isExpanded, setExpanded] = useState(false);
  const [videoIndex, setVideoIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // display fewer items initially and display all on expand
  const displayedVideos = isExpanded ? videos : videos.slice(0, 6);

  const toggleTrailersExpand = () => {
    setExpanded(!isExpanded);
  };

  const openModal = (index) => {
    setVideoIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  document.body.style.overflow = isModalOpen ? "hidden" : "auto";

  return (
    <>
      {videos && videos.length !== 0 ? (
        <div className="videos_container__wrapper p-2">
          <h2 className="p-2">Related videos and trailers</h2>

          <div className="videos_container">
            {displayedVideos.map((video, index) => (
              <div
                key={index}
                className="standard__box_shadow standard__border_radius standard__bg"
                onClick={() => openModal(index)}
              >
                <div className="video_overlay position-relative standard__border_radius">
                  <iframe
                    className="standard__border_radius"
                    src={`https://www.youtube-nocookie.com/embed/${video?.key}?version=3&enablejsapi=1`}
                    title={video.name}
                    allowFullScreen
                  ></iframe>
                  <p className="m-1 p-2" title={video.name}>
                    {video.name} | {video.type}
                  </p>
                </div>
              </div>
            ))}

            <AnimatePresence>
              {isModalOpen && (
                <div className="modal_overlay" onClick={closeModal}>
                  <motion.div
                    className="modal_content"
                    initial="hidden"
                    animate="visible"
                    exit="closed"
                    variants={scaleVariants}
                  >
                    <span
                      className="close_button bg-danger text-light"
                      onClick={closeModal}
                    >
                      CLOSE
                    </span>

                    <iframe
                      className="standard__border_radius video_trailer"
                      src={`https://www.youtube-nocookie.com/embed/${videos[videoIndex]?.key}?version=3&enablejsapi=1`}
                      title={videos[videoIndex].name}
                      allowFullScreen
                    ></iframe>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-2 p-2">No videos found</h2>
      )}

      {videos && videos.length > 6 && (
        <button
          className={`standard__border_radius standard__box_shadow mt-4 mx-auto px-3 py-2 d-grid border-0 ${
            isExpanded ? "bg-danger text-light" : "bg-warning"
          }`}
          style={{ width: "fit-content", cursor: "pointer" }}
          onClick={toggleTrailersExpand}
        >
          {isExpanded ? "Show less videos" : "Show more videos"}
        </button>
      )}
    </>
  );
};

export default Video;
