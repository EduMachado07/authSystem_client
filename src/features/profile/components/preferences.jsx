import SectionProfile from "./sectionProfile";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import usePreferencesStore from "@/contexts/preferences.context";

const Preferences = () => {
  const { setTheme, theme } = usePreferencesStore();

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
        <Select
          value={theme}
          onValueChange={(value) => {
            setTheme(value);
          }}
        >
          <SelectTrigger className="w-[100px] border-0 shadow-none md:hover:bg-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Claro</SelectItem>
              <SelectItem value="dark">Escuro</SelectItem>
              <SelectItem value="system">Sistema</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      {/* IDIOMA DO SITE */}
      {/* <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Idioma</Label>
          <p className="text-colorText text-sm text-pretty">
            Escolha o idioma usado no sistema
          </p>
        </div>
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
      </section> */}
    </main>
  );
};

export default Preferences;
