import type { InferEntrySchema, RenderedContent } from "astro:content";

export default function List(props: {
  tasks: {
    id: string;
    body?: string;
    collection: "tasks";
    data: InferEntrySchema<"tasks">;
    rendered?: RenderedContent;
    filePath?: string;
  }[];
}) {
  return (
    <ul className="list">
      {props.tasks.map((task) => (
        <li key={task.id} className="list-row">
          <a href={`${import.meta.env.BASE_URL}/${task.id}`}>
            {task.data.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
