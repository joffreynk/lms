import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react";
import {Draggable, DragDropContext, Droppable, DropResult} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";

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

  return (
    <DragDropContext onDragEnd={()=>{}} >
      <Droppable droppableId="chapters">
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index)=>(
              <Draggable
              key={chapter.id}
              draggableId={chapter.id}
              index={index}
              >
                {(provided) =>(
                  <div className={cn("flex items-center bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm", chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700")}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  >
                    <div className={cn("px-2 py-2 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition", chapter.isPublished && "border-r-sky-200 hover:bg-sky-200")}
                    {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ChaptersList