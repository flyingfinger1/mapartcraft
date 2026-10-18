import { Link } from "react-router-dom";

import "./faq.css";
import IMG_Palette from "../images/Palette128_Unobtainable_Trans.png";
import IMG_ClassicVsValley from "../images/classicVsValley.png";

import FAQContent_de from "./faq/de";
import FAQContent_en from "./faq/en";

const FAQContents = {
  de: FAQContent_de,
  en: FAQContent_en,
};

function FAQ(props) {
  const countryCode = props.match.params.countryCode;
  const FAQContent = FAQContents[countryCode] || FAQContent_en;
  return (
    <div className="FAQ">
      <Link to={`/${![undefined, "en"].includes(countryCode) ? countryCode : ""}`}>
        <h3>{FAQContent.closeLabel}</h3>
      </Link>

      <FAQContent images={{ palette: IMG_Palette, classicVsValley: IMG_ClassicVsValley }} />
    </div>
  );
}

export default FAQ;
