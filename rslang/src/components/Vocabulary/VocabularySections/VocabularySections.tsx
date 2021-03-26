import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import StudiedSections from "./StudiedSections";
import ComplexSections from "./ComplexSections";
import DeletedSections from "./DeletedSections";
interface InterfaceVocabularySections {
  selectedSection: string;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  const showSelectedSection = () => {
    if (props.selectedSection === "complex-sections") {
      return <ComplexSections />;
    } else if (props.selectedSection === "deleted-sections") {
      return <DeletedSections />;
    } else {
      return <StudiedSections />;
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
