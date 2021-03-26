import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React from "react";
import StudiedSections from "./StudiedSections";
import ComplexSections from "./ComplexSections";
import DeletedSections from "./DeletedSections";
interface InterfaceVocabularySections {
  selectedSection: string;
  words: any;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  const showSelectedSection = () => {
    if (props.selectedSection === "complex-sections") {
      return <ComplexSections />;
    } else if (props.selectedSection === "deleted-sections") {
      return <DeletedSections />;
    } else {
      return <StudiedSections words={props.words} />;
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
