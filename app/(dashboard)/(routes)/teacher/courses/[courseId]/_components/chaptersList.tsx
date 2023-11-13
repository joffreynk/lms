import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react";

type ChaptersListProps = {
  items: Chapter[],
  onReoder: (updateData: {id: string, position: number}[]) => void,
  onEdit: (id: string) => void,
};
function ChaptersList({items, onReoder, onEdit}: ChaptersListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [isMounted])

  useEffect(() => {
    setChapters(items)
  }, [items])
  

  if (!isMounted) return null;


  return (<div>ChaptersList</div>);
}

export default ChaptersList