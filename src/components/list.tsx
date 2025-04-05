import { useCallback, useMemo, useRef, useState } from "react";

export default function List(props: {
  tasks: {
    id: string;
    body?: string;
    collection: "tasks";
    data: {
      title: string;
      age_group: string[];
      time_req: string;
      space_req: string;
      keywords: string[];
      type?: string[] | null | undefined;
      suggestion?: string | null | undefined;
      tool_req?: string | null | undefined;
      attachment?: string | null | undefined;
    };
    filePath?: string;
  }[];
}) {
  const types = useMemo(() => {
    return [
      ...new Set(props.tasks.flatMap((v) => v.data.type).filter(Boolean)),
    ].sort((a, b) => a!.localeCompare(b!));
  }, [props.tasks]);

  const ageGroups = useMemo(() => {
    return [
      ...new Set(props.tasks.flatMap((v) => v.data.age_group).filter(Boolean)),
    ].sort((a, b) => a!.localeCompare(b!));
  }, [props.tasks]);

  const timeRequirements = useMemo(() => {
    return [
      ...new Set(props.tasks.flatMap((v) => v.data.time_req).filter(Boolean)),
    ].sort((a, b) => a!.localeCompare(b!));
  }, [props.tasks]);

  const spaceRequirements = useMemo(() => {
    return [
      ...new Set(props.tasks.flatMap((v) => v.data.time_req).filter(Boolean)),
    ].sort((a, b) => a!.localeCompare(b!));
  }, [props.tasks]);

  const form = useRef(null);
  const search = useCallback(() => {
    if (form.current) {
      const fd = new FormData(form.current);
      setFilters([...fd.entries()]);
    }
  }, [form.current]);
  const [filters, setFilters] = useState<[string, FormDataEntryValue][]>([]);
  const filteredTasks = useMemo(() => {
    return props.tasks.filter((task) => {
      if (!filters.length) return true;
      // do you evan hack bro?
      return filters.some(
        (filter) =>
          // @ts-ignore
          task.data[filter[0]] &&
          // @ts-ignore
          (task.data[filter[0]] === filter[1] ||
            // @ts-ignore
            (task.data[filter[0]].includes &&
              // @ts-ignore
              task.data[filter[0]].includes(filter[1])))
      );
    });
  }, [filters]);

  return (
    <div className="w-full flex flex-col items-center">
      <form className="w-full px-12" ref={form} onChange={search}>
        <fieldset className="fieldset pt-2 pb-4 px-4 bg-base-100 border border-base-300 rounded-box w-64">
          <legend className="fieldset-legend">Típusok</legend>
          {types.map((type) => (
            <label key={type} className="fieldset-label">
              <input
                type="checkbox"
                value={type!}
                name="type"
                className="checkbox"
              />{" "}
              {type}
            </label>
          ))}
        </fieldset>
      </form>
      <ul className="list max-w-2xl text-center text-lg">
        {filteredTasks.map((task) => (
          <li key={task.id} className="list-row">
            <a
              className="font-semibold group hover:bg-base-200 rounded-box py-2 px-2"
              href={`${import.meta.env.BASE_URL}/${task.id}`}
            >
              <div className="group-hover:underline">{task.data.title}</div>
              <p className="font-normal list-col-wrap text-xs leading-5">
                {task.body?.slice(0, 200)}...
              </p>
            </a>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <li className="list-row mt-4 text-base-content/60">
            Nem található a keresésnek megfelelő gyakorlat
          </li>
        )}
      </ul>
    </div>
  );
}
