import React from "react";
import { IResource } from "../../../../../interfaces/IResource";
import { audio } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { IMatchingOption } from "../../../../../interfaces/Options/IMatchingOption";
import { IWord } from "../../../../../interfaces/Questions/IPronunciationQuesion";

interface TextAudioPictureProps {
  vietnameseText: string | null;
  picture: IResource | null;
  englishText: string | null;
  isBuildSentence?: boolean;
  audio: IResource | null;
  words?: IWord[] | null;
}

export const TextAudioPicture: React.FC<TextAudioPictureProps> = ({
  vietnameseText,
  picture,
  englishText,
  isBuildSentence = false,
  audio,
  words,
}) => {
  const textToSplit = vietnameseText || englishText || "";
  const isEnglish = englishText ? true : false;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tokens = !isEnglish
    ? textToSplit
        .split(" ")
        .filter((token) => token !== "")
        .map((token) => ({ word: token, audio: "", hasAudio: false }))
    : words
        ?.sort((a, b) => a.order - b.order)
        .map((word) => ({
          word: word.word,
          audio: word.audio.url || "",
          hasAudio: true,
        }));

  const handleMouseEnter = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const playAudio = new Audio(audio?.url);
    audioRef.current = playAudio;
    audioRef.current.play();
    audioRef.current.onended = () => {
      audioRef.current = null;
    };
  };
  useEffect(() => {
    playAudio();
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [textToSplit]);
  return (
    <div
      className={`flex items-center text-white ${
        picture && isBuildSentence ? "border-b-2 border-[#37464F]" : ""
      }`}
    >
      {/* Image Placeholder */}
      {picture !== null && (
        <img
          src={picture.url}
          className="w-[175px] h-[175px] text-[20px] "
        ></img>
      )}

      {/* Text */}
      <div className="flex transform translate-x-[-12px]">
        <div
          className="transform translate-x-[1px] "
          style={{ marginTop: "25px" }}
        >
          {/* Chat image */}
          {picture !== null && (
            <svg height="20" viewBox="0 0 18 20" width="18" fill="#131F24">
              <path
                d="M2.00358 19.0909H18V0.909058L0.624575 15.9561C-0.682507 17.088 0.198558 19.0909 2.00358 19.0909Z"
                stroke="#37464F"
                strokeWidth="0"
              ></path>
              <path
                clipRule="evenodd"
                d="M18 2.48935V0L0.83037 15.6255C-0.943477 17.2398 0.312833 20 2.82143 20H18V18.2916H16.1228H2.82143C1.98523 18.2916 1.56646 17.3716 2.15774 16.8335L16.1228 4.12436L18 2.48935Z"
                fillRule="evenodd"
                stroke="#37464F"
                strokeWidth="1"
              ></path>
            </svg>
          )}
        </div>

        {/* Text Question: */}
        <div
          className={`flex gap-[4.84px] ${
            picture ? "border-2 border-[#37464F]" : ""
          } h-fit rounded-xl items-center `}
          style={{
            paddingLeft: audio ? (picture ? "30px" : "50px") : undefined,
          }}
        >
          {audio !== null && (
            <div
              className="w-full h-fit flex items-center cursor-pointer "
              onClick={playAudio}
            >
              {/* Icon 1 (Loa chính) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#49C0F8"
                stroke="#49C0F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-volume-2 w-[30px] h-auto  absolute left-7 "
              >
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
              </svg>

              {/* Icon 2 (Sóng âm thanh) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#49C0F8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-volume-2 w-[30px] h-auto absolute left-7"
              >
                <path d="M16 9a5 5 0 0 1 0 6" />
                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
              </svg>
            </div>
          )}
          <div
            className="flex gap-[4.84px] text-[20px] "
            style={{ padding: "10px 14px" }}
          >
            {tokens?.map((token, index) => (
              <span
                key={index}
                className={`${
                  englishText?.length != 0 ? "border-b-2 border-dashed" : ""
                } border-[#52656D] cursor-default`}
                style={{ paddingBottom: "4px" }}
                onMouseEnter={() => {
                  if (token.hasAudio) {
                    handleMouseEnter(token.audio);
                  }
                }}
              >
                {token.word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
