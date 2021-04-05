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
  deletedWords: any;
  getHardWords(arr: any): void;
  getLearnedWords(arr: any): void;
  getDeletedWords(arr: any): void;
}

const VocabularySections: React.FC<InterfaceVocabularySections> = (props) => {
  const [hardWords, setHardWords] = useState<any>([]);
  const [learnedWords, setLearnedWords] = useState<any>([]);
  const [deletedWords, setDeletedWords] = useState<any>([]);

  useEffect(() => {
    props.getHardWords(hardWords);
  }, [hardWords]);

  useEffect(() => {
    props.getLearnedWords(learnedWords);
  }, [learnedWords]);

  useEffect(() => {
    props.getDeletedWords(deletedWords);
  }, [deletedWords]);
 
  const getHardWords = (arr: any) => {
    setHardWords(_.uniqWith(hardWords.concat(arr), _.isEqual));
  };

  const getLearnedWords = (arr: any) => {
    setLearnedWords(_.uniqWith(learnedWords.concat(arr), _.isEqual));
  };

  const getDeletedWords = (arr: any) => {
    setDeletedWords(_.uniqWith(deletedWords.concat(arr), _.isEqual));
  };

  const showSelectedSection = () => {
    if (props.selectedSection === "hard-sections") {
      return (
        <HardVocabularySection
          hardWords={props.hardWords}
          onGetLearnedWords={getLearnedWords}
          onGetDeletedWords={getDeletedWords}
        />
      );
    } else if (props.selectedSection === "deleted-sections") {
      return (
        <DeletedVocabularySection
          deletedWords={props.deletedWords}
          onGetHardWords={getHardWords}
          onGetLearnedWords={getLearnedWords}
        />
      );
    } else {
      return (
        <StudiedVocabularySection
          learnedWords={props.learnedWords}
          onGetHardWords={getHardWords}
          onGetLearnedWords={getLearnedWords}
          onGetDeletedWords={getDeletedWords}
        />
      );
    }
  };
  return showSelectedSection();
};
export default VocabularySections;
