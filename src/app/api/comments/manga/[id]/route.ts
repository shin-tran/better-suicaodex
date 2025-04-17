import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeComment } from "@/lib/suicaodex/serializers";
import { auth } from "@/auth";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}
//TODO: rate limit & validation; xss

// GET /api/comments/manga/[id]
export async function GET(_: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const comments = await prisma.mangaComment.findMany({
    where: {
      mangaId: id,
    },
    include: {
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const safeComments = comments.map(serializeComment);
  return NextResponse.json(safeComments);
}

// POST /api/comments/manga/[id]
export async function POST(req: NextRequest, { params }: RouteParams) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { content } = await req.json();

  if (!id || !content) {
    return NextResponse.json({ error: "Missing id or content" }, { status: 400 });
  }

  const comment = await prisma.mangaComment.create({
    data: {
      content,
      mangaId: id,
      userId: session.user.id,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(comment);
}
