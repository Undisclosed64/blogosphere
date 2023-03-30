import { AiFillGithub } from "react-icons/ai";
import { AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="brandName">
        Blogosphere<span>.</span>
      </div>
      <div className="socials">
        <a href="https://github.com/Undisclosed64">
          <AiFillGithub />
          Github
        </a>
        <a href="https://twitter.com/alam_tahera">
          <AiFillTwitterCircle />
          Twitter
        </a>
        <a href="https://www.linkedin.com/in/tahera-alam-77a25a229/">
          <AiFillLinkedin />
          LinkedIn
        </a>
      </div>
      <div className="closingLine">
        Developed with ❤️ by{" "}
        <a href="https://twitter.com/alam_tahera">Tahera.</a>
      </div>
    </div>
  );
};
export default Footer;
