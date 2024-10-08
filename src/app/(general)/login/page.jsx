"use client";
import { FaGithub } from "rocketicons/fa";
import { Settings } from "@/config";

export default function Login() {
  const handleGithhubAuth = () => {
    window.location.href = `${Settings.API_URL}/auth/github`;
  };
  return (
    <article className="mt-16 flex items-center justify-center">
      <div className="flex w-full max-w-96 items-center justify-center rounded bg-white p-8">
        <button
          onClick={handleGithhubAuth}
          className="flex gap-2 rounded-md bg-black p-2 text-2xl text-white"
        >
          <FaGithub className="mb-1 inline-block size-8" />
          <span>GitHubでログイン</span>
        </button>
      </div>
    </article>
  );
}
