import { useRef, createContext, useContext, MutableRefObject } from "react";

const audioProvider =
  createContext<MutableRefObject<HTMLAudioElement | null> | null>(null);

export const useAudio = () => {
  const context = useContext(audioProvider);
  if (!context) {
    throw new Error(
      "useAudioControl must be used within an AudioControlProvider"
    );
  }
  return context;
};
export const usePlayAudio = () => {
  const controlAudio = useAudio();
  const playAudioContext = (url: string) => {
    if (controlAudio.current) {
      controlAudio.current.pause();
      controlAudio.current.currentTime = 0;
    }
    const audio = new Audio(url);
    controlAudio.current = audio;
    audio.play().catch((error) => {
      console.log("Error while play audio: ", error);
    });
  };
  return playAudioContext;
};
export const useStopAudio = () => {
  const controlAudio = useAudio();
  const stop = () => {
    if (controlAudio.current) {
      controlAudio.current.pause();
      controlAudio.current.currentTime = 0;
    }
  };
  return stop;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const controlAudio = useRef<HTMLAudioElement | null>(null);
  return (
    <audioProvider.Provider value={controlAudio}>
      {children}
    </audioProvider.Provider>
  );
};
