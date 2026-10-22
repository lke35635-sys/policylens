"use client";

// Design Ref: §3.1 ③ 업로드 카드 / §3.3 업로드 카드 점검표
// 이 단계(PLAN 4번)는 화면 틀만 만든다. 아래는 뒤 작업에서 채운다.
// - PDF 검사(PDF만, 1개, 10MB)와 끌어다 놓기: PLAN 11번
// - 글자 꺼내기와 분석 연결: PLAN 12~13번
import { useId, useState } from "react";

interface UploadCardProps {
  // 화면에 보여 줄 오류 문구 (스캔본·PDF 아님 등). 없으면 오류 자리는 비어 있다.
  error?: string;
  // 분석 연결 전에는 넘기지 않는다. 넘기지 않으면 "분석하기"는 잠긴다.
  onAnalyze?: (file: File) => void;
}

// 파일 크기를 사람이 읽는 형태로 바꾼다 (예: 2.1MB, 340KB)
function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(bytes / 1024))}KB`;
}

export function UploadCard({ error, onAnalyze }: UploadCardProps) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);

  const canAnalyze = file !== null && onAnalyze !== undefined;

  return (
    <section
      aria-label="뉴스 PDF 업로드"
      className="break-keep rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      {/* 파일 선택 영역: PDF만, 한 번에 1개 (여러 개를 고를 수 없도록 multiple을 쓰지 않는다) */}
      <input
        id={inputId}
        type="file"
        accept="application/pdf,.pdf"
        className="peer sr-only"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <label
        htmlFor={inputId}
        className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-zinc-300 px-4 py-10 text-center text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
      >
        <span className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          PDF 파일을 선택하세요
        </span>
        <span className="text-sm">뉴스 기사 PDF 1개</span>
      </label>

      {/* 선택한 파일 이름과 크기 */}
      <p className="mt-4 min-h-6 break-words text-sm text-zinc-700 dark:text-zinc-300" aria-live="polite">
        {file ? (
          <>
            선택한 파일: <span className="font-medium">{file.name}</span> ({formatSize(file.size)})
          </>
        ) : (
          "선택한 파일이 없습니다"
        )}
      </p>

      {/* 오류 문구 자리 */}
      <p role="alert" className="min-h-6 text-sm font-medium text-red-600 dark:text-red-400">
        {error}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!canAnalyze}
          onClick={() => {
            if (file && onAnalyze) onAnalyze(file);
          }}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500"
        >
          분석하기
        </button>
        {onAnalyze === undefined && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">분석 기능은 아직 연결되지 않았습니다</span>
        )}
      </div>
    </section>
  );
}
