import { api } from "@/trpc/server";
import type { Tag } from "@prisma/client";
import TagForm from "@/components/forms/TagForm";

export default async function TagsPage() {
  const tags = await api.tag.findMany.query();

  return (
    <main className="mx-8">
      <p className="mt-6 font-display text-3xl text-primary ">Create New Tag</p>
      <TagForm />
      <TagTable tags={tags} />
    </main>
  );
}

function TagTable(props: { tags: Tag[] }) {
  return (
    <div>
      {props.tags.map((tag) => {
        return <div key={tag.id}>{tag.name}</div>;
      })}
    </div>
  );
}
