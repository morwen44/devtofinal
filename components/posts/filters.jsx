export default function Filter({filter}) {
    return (
        <button className="active:font-bold p-2 rounded-md active:text-neutral-900 text-neutral-500 text-lg hover:bg-white hover:text-purple ">{filter}</button>
    );
    }