import "bootstrap/dist/css/bootstrap.min.css";
import "./VocabularySections.scss";
import React, { useState } from "react";
import _ from "lodash";
import StudiedSection from "./StudiedSection";
import ComplexSection from "./ComplexSection";
import DeletedSection from "./DeletedSection";
interface InterfaceVocabularySections {
  selectedSection: string;
  words: any;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  const [selectedWordsDeleted, setSelectedWordsDeleted] = useState<any>([]);
  const [selectedWordsComplex, setSelectedWordsComplex] = useState<any>([]);

  const getSetselectedWordsDeleteds = (arr: any) => {
    setSelectedWordsDeleted(
      _.uniqWith(selectedWordsDeleted.concat(arr), _.isEqual)
    );
  };
  const getSetselectedWordsComplex = (arr: any) => {
    setSelectedWordsComplex(
      _.uniqWith(selectedWordsComplex.concat(arr), _.isEqual)
    );
  };

  const showSelectedSection = () => {
    if (props.selectedSection === "complex-sections") {
      return <ComplexSection words={selectedWordsComplex} />;
    } else if (props.selectedSection === "deleted-sections") {
      return <DeletedSection words={selectedWordsDeleted} />;
    } else {
      return (
        <StudiedSection
          words={props.words}
          onGetsetselectedWordsDeleteds={getSetselectedWordsDeleteds}
          onGetsetselectedWordsComplex={getSetselectedWordsComplex}
        />
      );
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
