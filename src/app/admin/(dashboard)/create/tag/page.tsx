import TagForm from "@/components/forms/TagForm";

export default function CreateTagPage() {
  return (
    <main className="mx-8 mt-6 flex justify-center gap-12">
      <TagForm className="items=center flex w-full flex-grow flex-col space-y-4" />
    </main>
  );
}
