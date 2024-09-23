import clsx from "clsx";

export default function Reactions({ reactions = [], onAddReaction, section }) {
  const emojis = ["💖", "🦄", "🤯", "🙌", "🔥"];

  

  return (
    <div
      className={clsx("flex", {
        "flex-row": section === "detail",
        "gap-4": section !== "detail",
      })}
    >
      {section === "home" ? (
        <div className="flex items-center">
          <span className="text-center text-sm flex items-center relative">
            {emojis.map((emoji, index) => (
              <span
                key={emoji}
                className="bg-gray-100 border border-white rounded-full flex items-center justify-center"
                style={{
                  width: "30px",
                  height: "30px",
                  position: "absolute",
                  left: `${index * 15}px`,
                  zIndex: 1,
                }}
              >
                {emoji}
              </span>
            ))}
          </span>
          
        </div>
      ) : (
        emojis.map((emoji) => {
          const count = reactions.find((r) => r.emoji === emoji)?.count || 0;

          return (
            <span key={emoji} className="grid grid-rows-[auto_auto] text-center">
              <button
                className={clsx("hover:bg-neutral-100 rounded-2xl p-3", {
                  "text-sm flex items-center gap-1 hover:bg-transparent":
                    section === "detail",
                  "text-2xl": section !== "detail",
                })}
                onClick={() => onAddReaction(emoji)}
              >
                {emoji}{" "}
                <p
                  className={clsx("text-base text-neutral-600 mt-2", {
                    "text-sm": section === "detail",
                  })}
                >
                  {count}
                </p>
              </button>
            </span>
          );
        })
      )}
    </div>
  );
}
