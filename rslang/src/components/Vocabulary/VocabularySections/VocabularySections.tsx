import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import StudiedSection from "./StudiedSection";
import ComplexSection from "./ComplexSection";
import DeletedSection from "./DeletedSection";
interface InterfaceVocabularySections {
  selectedSection: string;
  words: any;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  const [words, setWord] = useState<any>([]);
  const [selectedWordsDeleted, setSelectedWordsDeleted] = useState<any>([]);
  const [selectedWordsComplex, setSelectedWordsComplex] = useState<any>([]);
  const [selectedWordsStudied, setSelectedWordsStudied] = useState<any>([]);

  // console.log(selectedWordsDeleted);
  // console.log(selectedWordsComplex);
  // console.log(selectedWordsStudied);

  useEffect(() => {
    if (words.length > 0) {
      setWord(selectedWordsStudied);
    } else {
      setWord(props.words);
    }
  }, [props.words]);

  const getSelectedWordsDeleteds = (arr: any) => {
    setSelectedWordsDeleted(
      _.uniqWith(selectedWordsDeleted.concat(arr), _.isEqual)
    );
  };

  const getSelectedWordsComplex = (arr: any) => {
    setSelectedWordsComplex(
      _.uniqWith(selectedWordsComplex.concat(arr), _.isEqual)
    );
  };

  const getSelectedWordsStudied = (arr: any) => {
    setSelectedWordsComplex(
      _.uniqWith(selectedWordsComplex.concat(arr), _.isEqual)
    );
  };

  const showSelectedSection = () => {
    if (props.selectedSection === "complex-sections") {
      return (
        <ComplexSection
          words={selectedWordsComplex}
          onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
        />
      );
    } else if (props.selectedSection === "deleted-sections") {
      return (
        <DeletedSection
          words={selectedWordsDeleted}
          onGetSelectedWordsComplex={getSelectedWordsComplex}
          onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
        />
      );
    } else {
      return (
        <StudiedSection
          words={words}
          onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
          onGetSelectedWordsComplex={getSelectedWordsComplex}
          onGetSelectedWordsStudied={getSelectedWordsStudied}
        />
      );
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
