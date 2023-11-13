import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react";

type ChaptersListProps = {
  items: Chapter[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
};
function ChaptersList({ items, onReorder, onEdit }: ChaptersListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) return null;

  return <div>ChaptersList</div>;
}

export default ChaptersList