"use client";
// Design Ref: §3.4 [파급경로·그래프] 보기 — 글 해설 [설명] → 전달경로 도식 [설명] → 시계열 그래프 [사실] 순서 (PLAN 14번).
// 글 해설은 요약 문단 → 경로별 문단(각 문단 아래 출처)이고, 도식은 단계 칸을 누르면 그 단계의 설명과 근거 자료가 펼쳐진다.
// 연결할 통계가 없는 경로는 그래프를 그리지 않고 "연결 통계 없음"으로 표시한다. 해설의 변수 이름과 그래프의 선 이름은 같은 통계 이름을 쓴다.
import { useState } from "react";
import type { ChannelGraph } from "@/lib/corpus/graph";
import type { Channel, Policy, TransmissionPlan } from "@/lib/corpus/types";
import { ChannelChart } from "./ChannelChart";
import { SourceLine } from "./SourceLine";

function ExplainBadge() {
  return <span className="rounded bg-violet-100 px-1.5 py-0.5 text-xs font-semibold text-violet-900 dark:bg-violet-950 dark:text-violet-200">설명</span>;
}

function SectionTitle({ children, badge }: { children: React.ReactNode; badge: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
      {children}
      {badge}
    </h3>
  );
}

function Sources({ sources }: { sources: Channel["narrative"]["sources"] }) {
  return (
    <div className="mt-2 flex flex-col gap-0.5">
      {sources.map((s) => (
        <SourceLine key={s.url + (s.evidence ?? "")} source={s} />
      ))}
    </div>
  );
}

// 전달경로 도식: 단계 칸이 화살표로 이어지고, 칸을 누르면 설명과 근거가 펼쳐진다
function ChannelDiagram({ channel }: { channel: Channel }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = channel.steps.find((s) => s.id === openId);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{channel.name}</p>
      <ol className="flex flex-wrap items-center gap-2" aria-label={`${channel.name} 단계`}>
        {channel.steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2">
            <button
              type="button"
              aria-expanded={openId === s.id}
              onClick={() => setOpenId(openId === s.id ? null : s.id)}
              className={`rounded-lg border px-3 py-2 text-left text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                openId === s.id ? "border-violet-700 bg-violet-100 text-violet-950 dark:bg-violet-950 dark:text-violet-100" : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {s.label}
              {!s.seriesId && <span className="mt-0.5 block text-xs font-normal text-zinc-600 dark:text-zinc-400">연결 통계 없음</span>}
            </button>
            {i < channel.steps.length - 1 && (
              <span aria-hidden="true" className="text-zinc-500">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      {open && (
        <div role="region" aria-label={`${open.label} 설명`} className="rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-violet-950/30">
          <p className="flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-100">
            <ExplainBadge />
            <span className="break-keep">{open.explanation}</span>
          </p>
          <SourceLine source={open.source} className="mt-2" />
        </div>
      )}
    </div>
  );
}

export interface TransmissionViewProps {
  policy: Policy;
  plan: TransmissionPlan | undefined;
  graphs: Record<string, ChannelGraph>;
}

export function TransmissionView({ policy, plan, graphs }: TransmissionViewProps) {
  if (!plan) {
    return (
      <article className="rounded-xl border border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{policy.name}</h2>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">이 정책의 파급경로는 아직 자료집에 없습니다.</p>
      </article>
    );
  }
  return (
    <article aria-label={`${policy.name} 파급경로`} className="flex flex-col gap-8 rounded-xl border border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <header>
        <h2 className="break-keep text-xl font-bold text-zinc-900 sm:text-2xl dark:text-zinc-50">{policy.name}</h2>
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">국내 경제에 번지는 경로 · {policy.asOf}까지 반영 · 마지막 확인일 {policy.lastCheckedAt}</p>
      </header>

      {/* 글 해설 [설명] */}
      <section aria-label="글 해설" className="flex flex-col gap-5">
        <SectionTitle badge={<ExplainBadge />}>글 해설</SectionTitle>
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">요약</h4>
          <p className="mt-1 break-keep leading-relaxed text-zinc-800 dark:text-zinc-200">{plan.summary.sentences.join(" ")}</p>
          <Sources sources={plan.summary.sources} />
        </div>
        {plan.channels.map((c) => (
          <div key={c.id}>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</h4>
            <p className="mt-1 break-keep leading-relaxed text-zinc-800 dark:text-zinc-200">{c.narrative.sentences.join(" ")}</p>
            <Sources sources={c.narrative.sources} />
          </div>
        ))}
      </section>

      {/* 전달경로 도식 [설명] */}
      <section aria-label="전달경로 도식" className="flex flex-col gap-4">
        <SectionTitle badge={<ExplainBadge />}>전달경로 도식</SectionTitle>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">단계 칸을 누르면 그 단계의 설명과 근거 자료가 펼쳐집니다.</p>
        {plan.channels.map((c) => (
          <ChannelDiagram key={c.id} channel={c} />
        ))}
      </section>

      {/* 시계열 그래프 [사실] */}
      <section aria-label="시계열 그래프" className="flex flex-col gap-6">
        <SectionTitle badge={<span className="rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200">사실</span>}>시계열 그래프</SectionTitle>
        {plan.channels.map((c) => {
          const g = graphs[c.id];
          return (
            <div key={c.id} className="flex flex-col gap-2">
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">{c.name}</h4>
              {g ? (
                <ChannelChart graph={g} />
              ) : (
                <p className="rounded bg-zinc-100 px-3 py-2 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">연결 통계 없음 (이 경로는 그래프를 그리지 않습니다)</p>
              )}
            </div>
          );
        })}
        <p role="note" className="break-keep rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100">
          그래프는 함께 움직인 지표일 뿐 인과가 아닙니다.
        </p>
      </section>
    </article>
  );
}
