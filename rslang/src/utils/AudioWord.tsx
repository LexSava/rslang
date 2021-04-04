import { url } from "./../api/defData";

export const playAudioWord = (audioPath: string) => {
  const audioWord = new Audio(url + audioPath);
  audioWord.play();
};

export const playAudio = (audio: any) => {
  const audioWord = new Audio(audio);
  audioWord.play();
};
