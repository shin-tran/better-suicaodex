import { ChevronsDown, ChevronsUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

interface MangaDescProps {
  desc: string;
  height?: string;
  maxHeight?: string;
}

const MangaDesc = ({ desc, height, maxHeight }: MangaDescProps) => {
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState<string | undefined>(height);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && contentRef.current) {
      setTimeout(() => {
        if (contentRef.current) {
          setFullHeight(`${contentRef.current.scrollHeight}px`);
        }
      }, 100); // Chờ 100ms để Markdown render xong
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
          maxHeight: expanded ? fullHeight : maxHeight ?? height,
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
                  //   style={{ textDecoration: "underline" }}
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
            {desc.replace(/   /g, "")}
          </ReactMarkdown>
        </div>
      </div>

      {/* button */}

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
    </div>
  );
};

export default MangaDesc;
