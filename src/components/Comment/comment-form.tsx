"use client";

import { useSession } from "next-auth/react";
import { Alert, AlertDescription } from "../ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiMarkdown } from "@icons-pack/react-simple-icons";

const FormSchema = z.object({
  comment: z
    .string()
    .min(3, {
      message: "Bình luận phải dài ít nhất 3 ký tự!",
    })
    .max(2000, {
      message: "Bình luận không được dài hơn 2000 ký tự!",
    }),
});

interface CommentFormProps {
  mangaId: string;
  onCommentPosted?: () => void;
}

export default function CommentForm({
  mangaId,
  onCommentPosted,
}: CommentFormProps) {
  const { data: session } = useSession();
  if (!session?.user?.id)
    return (
      <Alert className="rounded-sm bg-secondary">
        <AlertDescription className="flex justify-center">
          Bạn cần đăng nhập để bình luận!
        </AlertDescription>
      </Alert>
    );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.comment.trim()) return;
    try {
      setLoading(true);
      await fetch(`/api/comments/manga/${mangaId}`, {
        method: "POST",
        body: JSON.stringify({ content: data.comment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Reset the form after successful submission
      form.reset({ comment: "" });
      
      // Call the onCommentPosted callback if provided
      if (onCommentPosted) {
        onCommentPosted();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Viết bình luận..."
                  className="resize-none w-full min-h-28"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <SiMarkdown className="mr-1" />
                  <Link
                    href="https://www.markdownguide.org/basic-syntax/"
                    className="text-primary underline mr-1"
                    target="_blank"
                  >
                    Markdown
                  </Link>
                  được hỗ trợ!
                </span>
                {!!field.value && !!field.value.length && (
                  <span
                    className={cn(
                      "text-xs italic text-muted-foreground pr-1",
                      field.value.length > 2000 && "text-destructive"
                    )}
                  >
                    {field.value.length}/2000
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {!!loading && <Loader2 className="animate-spin" />}
          Gửi bình luận
        </Button>
      </form>
    </Form>
  );
}