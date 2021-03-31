import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import StudiedVocabularySection from "./StudiedVocabularySection";
import HardVocabularySection from "./HardVocabularySection";
import DeletedVocabularySection from "./DeletedVocabularySection";
interface InterfaceVocabularySections {
  selectedSection: string;
  hardWords: any;
  learnedWords: any;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  // const [words, setWords] = useState<any>([]);
  // const [selectedWordsDeleted, setSelectedWordsDeleted] = useState<any>([]);
  // const [selectedWordsComplex, setSelectedWordsComplex] = useState<any>([]);
  // const [selectedWordsStudied, setSelectedWordsStudied] = useState<any>([]);

  // console.log(selectedWordsDeleted);
  // console.log(selectedWordsComplex);
  // console.log(selectedWordsStudied);

  // useEffect(() => {
  //   setWords(props.learnedWords);
  // }, [props.learnedWords]);

  // const getSelectedWordsDeleteds = (arr: any) => {
  //   setSelectedWordsDeleted(
  //     _.uniqWith(selectedWordsDeleted.concat(arr), _.isEqual)
  //   );
  // };

  // const getSelectedWordsComplex = (arr: any) => {
  //   setSelectedWordsComplex(
  //     _.uniqWith(selectedWordsComplex.concat(arr), _.isEqual)
  //   );
  // };

  // const getSelectedWordsStudied = (arr: any) => {
  //   setSelectedWordsComplex(
  //     _.uniqWith(selectedWordsComplex.concat(arr), _.isEqual)
  //   );
  // };

  const showSelectedSection = () => {
    if (props.selectedSection === "hard-sections") {
      return (
        <HardVocabularySection
          hardWords={props.hardWords}
          // onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
        />
      );
    } else if (props.selectedSection === "deleted-sections") {
      return (
        <DeletedVocabularySection
          words={props.learnedWords}
          // onGetSelectedWordsComplex={getSelectedWordsComplex}
          // onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
        />
      );
    } else {
      return (
        <StudiedVocabularySection
          learnedWords={props.learnedWords}
          // onGetSelectedWordsDeleteds={getSelectedWordsDeleteds}
          // onGetSelectedWordsComplex={getSelectedWordsComplex}
          // onGetSelectedWordsStudied={getSelectedWordsStudied}
        />
      );
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
