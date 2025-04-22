import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";

import perfil from "../../../assets/perfil.jpg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Account = () => {
  return (
    <main className="flex flex-col gap-7">
      <SectionProfile props={"Conta"} />
      <section className="flex max-md:justify-between items-center gap-7">
        <section className="flex flex-col items-center gap-2">
          {/* imagem perfil */}
          <label
            htmlFor="imgPerfil"
            className="md:w-32 w-24 md:h-32 h-24 rounded-full overflow-hidden shadow cursor-pointer"
          >
            <img src={perfil} alt="perfil" className="rounded-full" />
          </label>
          <label
            htmlFor="imgPerfil"
            className="text-sm text-colorSecondary font-semibold cursor-pointer"
          >
            Adicionar foto
          </label>
          <input id="imgPerfil" type="file" className="hidden" />
        </section>
        {/* nome de usuario */}
        <div className="w-56 md:w-72 flex flex-col gap-3">
          <Label>Nome de usuário</Label>
          <Input placeholder="Eduardo da Silva Machado" />
          {/* MODAL PARA DESCONECTAR CONTA */}
          <ComponentDialog
            trigger={
              <Button
                size="link"
                variant="ghost"
                className="text-red-600 w-fit"
              >
                Sair da conta
              </Button>
            }
            title="Tem certeza?"
            description="Você será desconectado da sua conta."
            btnVariant="destructive"
            btnLabel="Sair"
          />
        </div>
      </section>
    </main>
  );
};

export default Account;
