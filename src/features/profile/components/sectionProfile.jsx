import { Separator } from "@/components/ui/separator";

const SectionProfile = ({ props }) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl mb-2 text-colorPrimary font-bold w-full">
        {props}
      </h1>
      {/* <hr className="bg-colorPrimary rounded-full h-[3px]" /> */}
      <Separator />
    </div>
  );
};
export default SectionProfile;
