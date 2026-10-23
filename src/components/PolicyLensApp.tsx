"use client";
// Design Ref: §2.1 구성도, §4.3 화면 상태와 주소 — 보기·검색·선택한 정책 상태를 브라우저 안에서 관리하고, 보기와 선택한 정책만 주소 뒤쪽(#)에 담는다 (PLAN 11번).
// 검색어는 서버로 보내지 않고 주소에도 담지 않는다. 보기마다 검색어·마지막 검색·선택한 정책을 따로 기억해 보기를 바꿨다 돌아와도 그대로 보인다.
import { useMemo, useState, useSyncExternalStore } from "react";
import type { ChannelGraph } from "@/lib/corpus/graph";
import type { Government, Policy, TransmissionPlan } from "@/lib/corpus/types";
import { listPolicies, searchPolicies } from "@/lib/corpus/search";
import { DEFAULT_STATE, VIEW_LABEL, VIEW_SCOPE, formatHash, parseHash, type View, type ViewState } from "@/lib/corpus/viewState";
import { FooterNote } from "./FooterNote";
import { PolicyScreen } from "./PolicyScreen";
import { SearchBox } from "./SearchBox";
import { TransmissionView } from "./TransmissionView";
import { ViewButtons } from "./ViewButtons";

// 주소 뒤쪽(#)을 읽고, 바뀌면 다시 그린다 (서버에서 처음 그릴 때는 빈 값)
function subscribeHash(onChange: () => void): () => void {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const getHash = (): string => window.location.hash;
const getServerHash = (): string => "";

const EXAMPLES: Record<View, string[]> = {
  domestic: ["기준금리", "관세", "종합부동산세"],
  foreign: ["Fed", "연준 금리", "미국 관세"],
  transmission: ["Fed", "연준 금리", "미국 관세"],
};
const PLACEHOLDER: Record<View, string> = {
  domestic: "국내 정책 이름이나 키워드를 입력하세요",
  foreign: "해외 정책 이름이나 키워드를 입력하세요",
  transmission: "해외 정책을 검색해 파급경로를 보세요",
};

type PerView<T> = Record<View, T>;
const perView = <T,>(v: T): PerView<T> => ({ domestic: v, foreign: v, transmission: v });

export interface PolicyLensAppProps {
  policies: Policy[];
  governments: Government[];
  transmission: TransmissionPlan[];
  graphs: Record<string, ChannelGraph>; // 경로별 그래프 자료 (서버에서 미리 만들어 전달)
}

export function PolicyLensApp({ policies, governments, transmission, graphs }: PolicyLensAppProps) {
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const state: ViewState = useMemo(() => (hash ? parseHash(hash, policies) : DEFAULT_STATE), [hash, policies]);
  const { view } = state;

  // 보기마다 따로 기억하는 것: 입력 중인 글, 마지막으로 검색한 말, 선택한 정책
  const [draft, setDraft] = useState<PerView<string>>(perView(""));
  const [submitted, setSubmitted] = useState<PerView<string>>(perView(""));
  const [remembered, setRemembered] = useState<PerView<string | null>>(perView(null));

  const go = (next: ViewState) => {
    window.location.hash = formatHash(next);
  };
  const selectView = (v: View) => go({ view: v, policyId: remembered[v] });
  const selectPolicy = (id: string) => {
    setRemembered((r) => ({ ...r, [view]: id }));
    go({ view, policyId: id });
  };
  // [해외 정책 바로가기] · [파급경로·그래프 바로가기]: 검색 없이 해당 보기로 넘어가 그 정책을 보여 준다
  const goTo = (target: View, id: string) => {
    setRemembered((r) => ({ ...r, [target]: id }));
    go({ view: target, policyId: id });
  };
  const submit = (text?: string) => {
    const q = text ?? draft[view];
    setSubmitted((s) => ({ ...s, [view]: q }));
    setRemembered((r) => ({ ...r, [view]: null }));
    go({ view, policyId: null });
  };

  const scope = VIEW_SCOPE[view];
  const hits = useMemo(() => searchPolicies(policies, submitted[view], scope), [policies, submitted, view, scope]);
  const all = useMemo(() => listPolicies(policies, scope), [policies, scope]);
  const selected = state.policyId ? policies.find((p) => p.id === state.policyId) : undefined;

  return (
    <div className="flex flex-col gap-6">
      <ViewButtons view={view} onSelect={selectView} />
      <SearchBox
        label={`${VIEW_LABEL[view]} 검색`}
        placeholder={PLACEHOLDER[view]}
        examples={EXAMPLES[view]}
        draft={draft[view]}
        onDraftChange={(value) => setDraft((d) => ({ ...d, [view]: value }))}
        onSubmit={submit}
        submitted={submitted[view]}
        hits={hits}
        allPolicies={all}
        showPairBadge={view === "domestic"}
        onSelectPolicy={selectPolicy}
      />
      {selected && view !== "transmission" && (
        <PolicyScreen
          key={selected.id}
          policy={selected}
          policies={policies}
          governments={governments}
          onGoForeign={(id) => goTo("foreign", id)}
          onGoTransmission={(id) => goTo("transmission", id)}
        />
      )}
      {selected && view === "transmission" && (
        <TransmissionView key={selected.id} policy={selected} plan={transmission.find((t) => t.foreignPolicyId === selected.id)} graphs={graphs} />
      )}
      <FooterNote
        policy={selected}
        policies={policies}
        statsPeriods={
          selected && view === "transmission"
            ? Object.values(graphs)
                .filter((g) => transmission.find((t) => t.foreignPolicyId === selected.id)?.channels.some((c) => c.id === g.channelId))
                .flatMap((g) => g.series.map((s) => s.latestPeriod))
            : []
        }
      />
    </div>
  );
}
