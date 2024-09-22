import Image from 'next/image';

export default function NavLink ({ section, icon }) {
  
  return (
    <li> <button className="grid grid-cols-[auto_1fr] hover:bg-ghostpurple rounded-md p-2 text-neutral-700 w-full text-start hover:underline hover:text-darkpurple text-nowrap">
     <Image src={icon} alt={section} width={24} height={24} className="mx-2" />
      <span>{section}</span>
    </button></li>
  );
};

