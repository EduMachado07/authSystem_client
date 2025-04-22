import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Security = () => {
  return (
    <main className="flex flex-col gap-7">
      <SectionProfile props={"Segurança"} />
      {/* email do usuario */}
      <section className="flex justify-between items-end">
        {/* email */}
        <div className="flex flex-col gap-3 max-md:w-[190px]">
          <Label>E-mail</Label>
          <p className="text-colorText text-sm truncate">
            eduardo.silvamachado07@gmail.com
          </p>
        </div>
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar e-mail
            </Button>
          }
          title="Alterar e-mail"
          content={
            <>
              <section className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-sm">
                  E-mail
                </Label>
                <Input
                  id="email"
                  placeholder="eduardo.silvamachado@gmail.com"
                />
              </section>
            </>
          }
          btnLabel="Alterar"
        />
      </section>

      {/* senha do usuario */}
      <section className="flex justify-between items-end">
        {/* senha */}
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Senha</Label>
          <p className="text-colorText text-sm truncate">****</p>
        </div>
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar senha
            </Button>
          }
          title="Alterar senha"
          content={
            <>
              <section className="flex flex-col gap-3">
                <Label htmlFor="password" className="text-sm">
                  Nova senha
                </Label>
                <Input type="password" id="password" placeholder="senha" />
              </section>
              <section className="flex flex-col gap-3">
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirmar senha
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="senha"
                />
              </section>
            </>
          }
          btnLabel="Alterar"
        />
      </section>

      {/* telefone do usuario */}
      <section className="flex justify-between items-end">
        {/* telefone */}
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Telefone</Label>
          <p className="text-colorText text-sm truncate">(12) 98850-3575</p>
          <p className="text-colorText text-sm truncate">(12) 98850-3575</p>
        </div>
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar telefone
            </Button>
          }
          title="Alterar telefone"
          content={
            <>
              <section className="flex flex-col gap-3">
                <Label htmlFor="tel_1" className="text-sm">
                  Telefone
                </Label>
                <Input id="tel_1" placeholder="(12) 98850-3575" />
                <Input id="tel_2" placeholder="-" />
              </section>
            </>
          }
          btnLabel={"Alterar"}
        />
      </section>

      {/* excluir conta do usuario */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label className="text-red-600">Excluir conta</Label>
          <p className="text-colorText text-sm text-pretty">
            Deleta permanentemente a conta e os seus dados do nosso sistema
          </p>
        </div>
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"destructive"}>
              Excluir
            </Button>
          }
          title="Tem certeza disso?"
          description="Deleta permanentemente a conta e seus dados do nosso sistema"
          btnVariant="destructive"
          btnLabel="Deletar conta"
        />
      </section>
    </main>
  );
};

export default Security;
