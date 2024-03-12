import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../../App";
import {
  renderTrimmedText,
  toggleExpandTrimmedText,
} from "../Reusable/Reusable";
import "./PersonDetailCard.css";

const PersonDetailCard = ({ person }) => {
  const { scaleVariants } = useContext(AppContext);
  const [isExpandedBio, setExpandedBio] = useState(false);

  const toggleExpandBio = () => {
    setExpandedBio(!isExpandedBio);
  };

  return (
    <>
      {person && person.length !== 0 ? (
        <motion.div
          key={person.imdb_id}
          className="person_detail__card standard__border_radius standard__box_shadow p-2"
          initial="hidden"
          animate="visible"
          variants={scaleVariants}
        >
          <div className="person_detail__img">
            <img
              className="standard__border_radius"
              src={
                person.profile_path !== null
                  ? `https://image.tmdb.org/t/p/w1280${person.profile_path}`
                  : "https://assets.dryicons.com/uploads/icon/svg/9872/ab3c0a16-6f14-4817-a30b-443273de911d.svg"
              }
              alt={person.name || "Credit"}
            />
          </div>

          <div className="person_detail my-2">
            <h3 className="mb-0 m-2">{person.name || "Not Provided"}</h3>
            <p className="mb-0 m-2">
              Birth Place:{" "}
              <span className="not_badge">
                {person?.place_of_birth || "Not Provided"}
              </span>
            </p>
            <p className="mb-0 m-2">
              Date of Birth:{" "}
              <span className="not_badge">
                {person?.birthday || "Not Provided"}
              </span>
            </p>
            <p className="mb-0 m-2">
              Skill:{" "}
              <span className="not_badge">
                {person?.known_for_department || "Not Provided"}
              </span>
            </p>
            <p
              className="mb-0 m-2"
              style={{ fontSize: "18px", fontWeight: "400" }}
            >
              <span className="not_badge">
                {renderTrimmedText(person.biography, 200, isExpandedBio)}
              </span>

              {toggleExpandTrimmedText(
                person.biography,
                200,
                isExpandedBio,
                toggleExpandBio
              )}
            </p>
          </div>
        </motion.div>
      ) : (
        <h2>Item not found</h2>
      )}
    </>
  );
};

export default PersonDetailCard;
