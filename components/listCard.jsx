export default function ListCard({ tags }) {
  return (
    <div className="mt-4 bg-white  border rounded-md">
      {Array.isArray(tags) &&
        tags.length > 0 &&
        tags.map((tag, index) => (
          <div key={tag} className="flex flex-col w-full">
            <span className="text-sm text-neutral-600 p-3 ">{tag}</span>
            {index < tags.length - 1 && (
              <hr className="border-neutral-100 my-1" />
            )}
          </div>
        ))}
    </div>
  );
}
