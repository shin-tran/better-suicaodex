import { ChevronsDown, ChevronsUp, Loader2, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { SiGoogletranslate } from "@icons-pack/react-simple-icons";

interface MangaDescriptionProps {
  content: string;
  language: "en" | "vi";
  height: number;
  maxHeight: number;
}

const MangaDescription = ({
  content,
  language,
  height,
  maxHeight,
}: MangaDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState<number>(height);
  const contentRef = useRef<HTMLDivElement>(null);

  const [translated, setTranslated] = useState(false);
  const [translatedDesc, setTranslatedDesc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!translatedDesc) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(
            content
          )}`
        );
        const data = await response.json();
        const translatedText = data[0]
          .map((part: any) => part[0])
          .join(""); /* eslint-disable  @typescript-eslint/no-explicit-any */
        setTranslatedDesc(translatedText);
      } catch (error) {
        console.error("Lỗi dịch thuật:", error);
      } finally {
        setIsLoading(false);
      }
    }
    setTranslated(!translated);
  };

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        if (contentRef.current) {
          setFullHeight(contentRef.current.scrollHeight);
        }
      }, 100);
    }
  }, [translated, expanded]);

  useEffect(() => {
    if (expanded && contentRef.current) {
      setTimeout(() => {
        if (contentRef.current) {
          setFullHeight(contentRef.current.scrollHeight);
        }
      }, 100);
    }
  }, [expanded]);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* content */}
      <div
        className="overflow-hidden transition-[max-height,height] text-sm"
        style={{
          maxHeight: expanded ? fullHeight : maxHeight,
          height: expanded ? fullHeight : height,
          maskImage: expanded
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
                <table className="table-auto border-collapse border border-secondary rounded-md">
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
            {/* {content.replace(/   /g, "")} */}
            {translated && translatedDesc ? translatedDesc : content}
          </ReactMarkdown>

          {/* translate btn */}
          {language === "en" && (
            <Button
              size="sm"
              className="rounded-sm text-xs transition opacity-50 hover:opacity-100 mt-2"
              onClick={handleTranslate}
              variant="ghost"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : translated ? (
                <Undo2 />
              ) : (
                <SiGoogletranslate size={18} />
              )}

              {translated ? "Xem bản gốc" : "Dịch sang tiếng Việt"}
            </Button>
          )}
        </div>
      </div>

      {/* button */}
      {fullHeight > maxHeight && (
        <div
          className={cn(
            "flex justify-center w-full h-full border-t transition-[border-color]",
            expanded ? "border-transparent" : "border-primary"
          )}
        >
          <Button
            size="sm"
            className="rounded-t-none h-4 px-1"
            onClick={handleExpand}
            variant={expanded ? "secondary" : "default"}
          >
            {expanded ? (
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
