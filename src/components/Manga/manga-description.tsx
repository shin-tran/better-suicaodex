import { ChevronsDown, ChevronsUp, Loader2, Undo2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { SiGoogletranslate } from "@icons-pack/react-simple-icons";
import { Button } from "../ui/button";

interface MangaDescriptionProps {
  content: string;
  language: "en" | "vi";
  maxHeight: number;
}

const MangaDescription = ({
  content,
  language,
  maxHeight,
}: MangaDescriptionProps) => {
  const [state, setState] = useState({
    expanded: false,
    translated: false,
    translatedDesc: null as string | null,
    isLoading: false,
    fullHeight: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const updateFullHeight = useCallback(() => {
    if (contentRef.current) {
      setState((prev) => ({
        ...prev,
        fullHeight: contentRef.current?.scrollHeight || 0,
      }));
    }
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateFullHeight();
    });

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    const handleResize = () => {
      updateFullHeight();
    };

    window.addEventListener("resize", handleResize);
    const timer = setTimeout(updateFullHeight, 100);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [state.translated, state.expanded, updateFullHeight]);

  const handleTranslate = async () => {
    if (state.translatedDesc) {
      setState((prev) => ({ ...prev, translated: !prev.translated }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
          content
        )}`
      );
      const data = await response.json();
      const translatedText = data[0].map((part: any) => part[0]).join("");
      setState((prev) => ({
        ...prev,
        translatedDesc: translatedText,
        translated: true,
      }));
    } catch (error) {
      console.error("Lỗi dịch thuật:", error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleExpand = () => {
    setState((prev) => ({ ...prev, expanded: !prev.expanded }));
  };

  return (
    <div className="relative flex flex-col gap-1">
      <div
        className="overflow-hidden transition-[max-height,height] text-sm h-auto"
        style={{
          maxHeight: state.expanded ? state.fullHeight : maxHeight,
          //height: state.expanded ? state.fullHeight : "auto",
          maskImage:
            state.expanded || state.fullHeight <= maxHeight
              ? "none"
              : "linear-gradient(black 0%, black 60%, transparent 100%)",
        }}
      >
        <div ref={contentRef}>
          <ReactMarkdown
            className="flex flex-col gap-3"
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <table className="table-auto border-collapse border border-secondary rounded-md w-fit">
                  {children}
                </table>
              ),
              thead: ({ children }) => (
                <thead className="border-b border-secondary">{children}</thead>
              ),
              tr: ({ children }) => (
                <tr className="even:bg-secondary">{children}</tr>
              ),
              th: ({ children }) => (
                <th className="px-2 py-1 text-left">{children}</th>
              ),
              td: ({ children }) => <td className="px-2 py-1">{children}</td>,
            }}
          >
            {state.translated && state.translatedDesc
              ? state.translatedDesc
              : content}
          </ReactMarkdown>

          {language === "en" && (
            <Button
              size="sm"
              className="rounded-sm text-xs transition opacity-50 hover:opacity-100 mt-2"
              onClick={handleTranslate}
              variant="ghost"
            >
              {state.isLoading ? (
                <Loader2 className="animate-spin" />
              ) : state.translated ? (
                <Undo2 />
              ) : (
                <SiGoogletranslate size={18} />
              )}
              {state.translated ? "Xem bản gốc" : "Dịch sang tiếng Việt"}
            </Button>
          )}
        </div>
      </div>

      {state.fullHeight > maxHeight && (
        <div
          className={cn(
            "flex justify-center w-full h-full border-t transition-[border-color]",
            state.expanded ? "border-transparent" : "border-primary"
          )}
        >
          <Button
            size="sm"
            className="rounded-t-none h-4 px-1"
            onClick={handleExpand}
            variant={state.expanded ? "secondary" : "default"}
          >
            {state.expanded ? (
              <>
                <ChevronsUp />
                thu gọn
                <ChevronsUp />
              </>
            ) : (
              <>
                <ChevronsDown />
                xem thêm
                <ChevronsDown />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MangaDescription;
