export default function Tags({ tags }) {
    return (
      <div className="flex gap-2 mt-2">
        {Array.isArray(tags) && tags.length > 0 && 
          tags.map((tag) => (
            <span
              key={tag}
              className="text-sm text-neutral-600 bg-neutral-100 p-1 rounded-md"
            >
              {tag}
            </span>
          ))}
      </div>
    );
  }
  