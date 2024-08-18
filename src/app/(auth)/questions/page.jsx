"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";
import { Routes, Settings } from "@/config";
import { Pagination, QuestionList } from "@/features/questions/components";

const OrderBy = {
  NEW: "new",
  OLD: "old",
};

const fetcher = (url) => fetch(url).then((res) => res.json());

const QuestionsPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const currentPage = params.get("page") || 1;
  const nextParams = new URLSearchParams(params);
  nextParams.set("page", Number(currentPage) + 1);
  const { data } = useSWR(`${Settings.API_URL}/questions/all_count`, fetcher, {
    fallbackData: { count: 500 },
    onErrorRetry: (error) => {
      if (error.status === 404) {
        return;
      }
    },
  });

  const handleOrderBy = (e) => {
    const query = new URLSearchParams(params);

    if (e.target.value === OrderBy.NEW) {
      query.delete("order");
    } else {
      query.set("order", OrderBy.OLD);
    }

    if (query.has("page")) {
      query.delete("page");
    }

    router.push(`${Routes.questions}?${query.toString()}`);
  };

  return (
    <>
      <article className="w-full">
        <div className="flex w-full flex-col items-center justify-center gap-3 md:px-8 md:pt-4">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-xl md:text-2xl">質問一覧ページ</h1>
            <Link
              href={Routes.questionsNew}
              type="button"
              className="rounded bg-runteq-secondary px-3 py-2 text-white transition-all hover:bg-white hover:text-runteq-secondary"
            >
              質問する
            </Link>
          </div>
          <div className="flex w-full items-center justify-between ">
            <p className="text-sm">{data.count}件の質問</p>
            <div
              id="question-order"
              className="flex items-center justify-center gap-2 rounded border border-slate-400 bg-white px-2 py-1 text-sm"
            >
              <label className="cursor-pointer p-1">
                <input
                  type="radio"
                  name="order"
                  className="hidden"
                  checked={params.get("order") ? false : true}
                  onChange={handleOrderBy}
                  value={OrderBy.NEW}
                />
                新着順
              </label>
              <label className="cursor-pointer p-1">
                <input
                  type="radio"
                  name="order"
                  className="hidden"
                  checked={params.get("order") === OrderBy.OLD ? true : false}
                  onChange={handleOrderBy}
                  value={OrderBy.OLD}
                />
                古い順
              </label>
            </div>
          </div>
        </div>

        <QuestionList
          url={`${Settings.API_URL}/questions?${params.toString()}`}
        />
      </article>

      <Pagination currentPage={Number(currentPage)} totalPage={Math.ceil(105 / 10)} />

      <div className="hidden">
        <QuestionList
          url={`${Settings.API_URL}/questions?${nextParams.toString()}`}
        />
      </div>
    </>
  );
};

export default function Questions() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuestionsPage />
    </Suspense>
  );
}
