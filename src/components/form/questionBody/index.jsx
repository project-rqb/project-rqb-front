"use client";
import "zenn-content-css";
import { useEffect, useState } from "react";
import { RiQuestionFill } from "rocketicons/ri";
import markdownToHtml from "zenn-markdown-html";
import { PostHelp } from "@/features/questions/components";
import { resizeTextArea } from "@/utils";

export default function QuestionBody({ reviewBody, isReviewToggle }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [body, setBody] = useState("");
  const [postable, setPostable] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const html = markdownToHtml(body, {
    embedOrigin: "https://embed.zenn.studio",
  });

  useEffect(() => {
    import("zenn-embed-elements");
  }, []);

  useEffect(() => {
    if (reviewBody && body !== "") {
      setPostable(true);
    }
  }, [reviewBody, body]);

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const isHelpToggle = () => {
    setIsHelpVisible(!isHelpVisible);
  };

  return (
    <div className="my-4 flex min-h-[50vh] flex-1 gap-3">
      <div
        className={`relative flex w-full flex-col justify-between overflow-auto rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 lg:w-1/2 ${isPreviewVisible ? "hidden" : ""}`}
      >
        <textarea
          placeholder="質問内容"
          className="resize-none overflow-auto border-none bg-gray-100 p-2 outline-none"
          rows="12"
          name="questionBody"
          onChange={(e) => {
            resizeTextArea(e);
            setBody(e.target.value);
          }}
        />
        <div className="flex w-full flex-col justify-center gap-2 border-t border-gray-700 px-4 pb-10 pt-2">
          <button
            type="submit"
            disabled={!postable}
            id="POST"
            className={`w-auto rounded-xl border border-blue-500 bg-blue-500 px-4 py-1 text-sm text-white transition-all  ${postable ? "hover:bg-white hover:text-blue-500" : "cursor-not-allowed opacity-50"}`}
          >
            投稿
          </button>
          <button
            type="submit"
            id="REVIEW"
            disabled={!body}
            className={`w-auto rounded-xl border border-blue-500 bg-blue-500 px-4 py-1 text-sm text-white transition-all hover:bg-white hover:text-blue-500 ${!body ? "cursor-not-allowed opacity-50" : ""}`}
          >
            AIに質問をレビュー
          </button>
          <button
            onClick={togglePreview}
            type="button"
            className="w-auto rounded-xl bg-gray-500 px-4 py-1 text-sm text-white lg:hidden"
          >
            プレビュー
          </button>
          {reviewBody && (
            <button
              type="button"
              onClick={() => isReviewToggle()}
              className="w-auto rounded-xl bg-gray-500 px-4 py-1 text-sm text-white"
            >
              AIのレビューを表示
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => isHelpToggle()}
          className="absolute bottom-3 right-3 inline-block text-gray-700 transition-all hover:text-gray-400"
        >
          <RiQuestionFill className="size-7" />
        </button>
        {isHelpVisible && <PostHelp onClick={isHelpToggle} />}
      </div>
      <div
        className={`w-full flex-1 overflow-x-auto ${isPreviewVisible ? "" : "hidden lg:flex"}`}
      >
        <div className="flex size-full flex-col rounded-xl border border-gray-200 bg-white px-4 py-2">
          <div
            className="znc h-full p-2"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <div className="flex w-full justify-center border-t border-gray-700 px-4 py-2 lg:hidden">
            <button
              onClick={togglePreview}
              type="button"
              className="rounded-xl bg-gray-500 px-4 py-1 text-sm text-white"
            >
              戻る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
