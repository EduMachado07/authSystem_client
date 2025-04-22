import SectionProfile from "./sectionProfile";
import ComponentDialog from "./componentDialog";

import Account from "./account";
import Security from "./security";
import Historic from "./historic";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";

const Preferences = () => {
  return (
    <main className="flex flex-col gap-7">
      <SectionProfile props={"Preferências"} />

      {/* APARENCIA DO SITE */}
      <section className="flex justify-between items-end">
        {/* aparência */}
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Aparência</Label>
          <p className="text-colorText text-sm text-pretty">
            Personalize o tema utilizado pelo sistema
          </p>
        </div>
        {/* select idioma */}
        <Select>
          <SelectTrigger className="w-[100px] border-0 shadow-none md:hover:bg-gray-200">
            <SelectValue placeholder="claro" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="claro">Claro</SelectItem>
              <SelectItem value="escuro">Escuro</SelectItem>
              <SelectItem value="sistema">Sistema</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      {/* IDIOMA DO SITE */}
      <section className="flex justify-between items-end">
        {/* aparência */}
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Idioma</Label>
          <p className="text-colorText text-sm text-pretty">
            Escolha o idioma usado no sistema
          </p>
        </div>
        {/* select idioma */}
        <Select>
          <SelectTrigger className="border-0 shadow-none md:hover:bg-gray-200">
            <SelectValue placeholder="Portguês-BR" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Português-BR">Português-BR</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </main>
  );
};

export default Preferences;
