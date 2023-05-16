import React from "react";
import "./footer.css";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiOutlineCode
} from "react-icons/ai";
export const Footer = () => {
  return (
    <div className="footer">
      <div>
        <a
          href="https://github.com/anshtripathi01"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub size={25}/>
        </a>
        <a
          href="https://www.linkedin.com/in/anshtripathi01/"
          className="footer-link"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin size={25}/>
        </a>
        <a href="https://www.twitter.com/ansh_tripathi01" className="footer-link" target="_blank" rel="noreferrer">
          <AiFillTwitterCircle size={25}/>
        </a>
      </div>
      <div className="footer_text">&copy; <AiOutlineCode size={25}/> by Ansh Tripathi</div>
    </div>
  );
};
