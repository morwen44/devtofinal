import Image from 'next/image';

const SocialButton = ({ social, logo, newUser }) => {
  return (
    <button className="grid grid-cols-[auto_1fr] border border-neutral-300 rounded-md p-3 text-sm hover:bg-neutral-100">
      <Image src={logo} alt={`${social} logo`} width={24} height={24} className="mr-2" />
      <span>{newUser ? `Sign up with ${social}` : `Continue with ${social}`}</span>
    </button>
  );
};

export default SocialButton;
