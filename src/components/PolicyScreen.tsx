"use client";
// Design Ref: §3.2~3.3 정책 화면 — 정책 이름·분야·기준일·마지막 확인일·공식 사이트, 연혁(시간순/정부별), 이후 변경 안내, 바로가기 버튼 (PLAN 12~13번).
// 국내 정책은 시간순·정부별 묶음을 고를 수 있고 해외 짝이 있으면 [해외 정책 바로가기]가 있다. 해외 정책은 시간순만 있고 [파급경로·그래프 바로가기]가 있다.
import { useState } from "react";
import { groupByGovernment, timeline } from "@/lib/corpus/history";
import type { Government, Policy } from "@/lib/corpus/types";
import { GovernmentView } from "./GovernmentView";
import { HistoryTimeline } from "./HistoryTimeline";

type Mode = "time" | "government";

export interface PolicyScreenProps {
  policy: Policy;
  policies: Policy[];
  governments: Government[];
  onGoForeign: (policyId: string) => void;
  onGoTransmission: (policyId: string) => void;
}

export function PolicyScreen({ policy, policies, governments, onGoForeign, onGoTransmission }: PolicyScreenProps) {
  const [mode, setMode] = useState<Mode>("time");
  const isDomestic = policy.scope === "domestic";
  const pair = isDomestic && policy.foreignPolicyId ? policies.find((p) => p.id === policy.foreignPolicyId) : undefined;

  return (
    <article aria-label={`${policy.name} 연혁`} className="flex flex-col gap-5 rounded-xl border border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      {/* 정책 머리: 이름 · 분야 · 기준일 · 마지막 확인일 · 공식 사이트 */}
      <header className="flex flex-col gap-2">
        <h2 className="break-keep text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-50">{policy.name}</h2>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs dark:bg-zinc-800">{policy.field}</span>
          <span className="font-semibold">{policy.asOf}까지 반영</span>
          <span>마지막 확인일 {policy.lastCheckedAt}</span>
          <a href={policy.officialSite.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:text-blue-600 dark:text-blue-300">
            공식 사이트 ({policy.officialSite.institution})<span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (새 창으로 열림)</span>
          </a>
        </p>
      </header>

      {/* 묶음 방식: 국내 정책만 고를 수 있다 */}
      {isDomestic && (
        <div role="group" aria-label="묶음 방식" className="flex gap-2">
          {([["time", "시간순"], ["government", "정부별"]] as const).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                mode === m ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
            >
              {mode === m ? "● " : ""}
              {label}
            </button>
          ))}
        </div>
      )}

      {/* 연혁 */}
      {isDomestic && mode === "government" ? <GovernmentView groups={groupByGovernment(policy, governments)} /> : <HistoryTimeline items={timeline(policy)} />}

      {/* 기준일 이후 변경 안내 */}
      <p className="break-keep rounded bg-zinc-100 px-3 py-2 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
        이후 변경은 공식 사이트에서 확인하세요.{" "}
        <a href={policy.officialSite.url} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline hover:text-blue-600 dark:text-blue-300">
          {policy.officialSite.institution}<span aria-hidden="true"> ↗</span>
          <span className="sr-only"> (새 창으로 열림)</span>
        </a>
      </p>

      {/* 바로가기 */}
      {pair && (
        <button
          type="button"
          onClick={() => onGoForeign(pair.id)}
          className="self-start rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          해외 정책 바로가기: {pair.name}
        </button>
      )}
      {!isDomestic && (
        <div className="flex flex-col items-start gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <p className="break-keep text-sm text-zinc-700 dark:text-zinc-300">이 정책이 국내 경제에 어떻게 번졌는지 보기</p>
          <button
            type="button"
            onClick={() => onGoTransmission(policy.id)}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            파급경로·그래프 바로가기
          </button>
        </div>
      )}
    </article>
  );
}
