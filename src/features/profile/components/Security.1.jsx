import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/contexts/user.context";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

export const Security = () => {
  const { user, clearUser } = useUserStore();
  const [errorApi, setErrorApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  // UPDATE DATA USER
  // API CALL
  // --- UPDATE EMAIL ---
  async function updateEmail(data) {
    try {
      setIsLoading(true);
      // const res = await apiAuth.post("/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      setOpenDialog(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao entrar no sistema. Tente novamente mais tarde.";

      setErrorApi(message);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  async function updatePassword(data) {
    try {
      setIsLoading(true);
      // const res = await apiAuth.post("/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      setOpenDialog(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao entrar no sistema. Tente novamente mais tarde.";

      setErrorApi(message);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  async function updatePhones(data) {
    try {
      setIsLoading(true);
      // const res = await apiAuth.post("/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      setOpenDialog(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao entrar no sistema. Tente novamente mais tarde.";

      setErrorApi(message);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteUser(data) {
    try {
      setIsLoading(true);
      // const res = await apiAuth.post("/login", {
      //   email: data.email,
      //   password: data.password,
      // });
      setOpenDialog(false);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao entrar no sistema. Tente novamente mais tarde.";

      setErrorApi(message);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex flex-col gap-7">
      <SectionProfile props={"Segurança"} />
      {/* EMAIL */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 max-md:w-[190px]">
          <Label>E-mail</Label>
          <p className="text-colorText text-sm truncate">
            eduardo.silvamachado07@gmail.com
          </p>
        </div>
        {/* COMPONENT DIALOG */}
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar e-mail
            </Button>
          }
          content={
            <>
              <section className="flex flex-col gap-3">
                <Label htmlFor="email" className="text-sm">
                  E-mail
                </Label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "E-mail é obrigatório",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Formato do e-mail inválido",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      autoComplete="off"
                      placeholder="seu email"
                      onChange={(e) => {
                        field.onChange(e);
                        setErrorApi(""); // Limpa o erro ao modificar o input
                      }}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.email.message}
                  </p>
                )}
              </section>
            </>
          }
          title="Alterar e-mail"
          isLoading={isLoading}
          btnLabel="Alterar"
          btnClick={handleSubmit(updateEmail)}
        />
      </section>

      {/* PASSWORD */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Senha</Label>
          <p className="text-colorText text-sm truncate">****</p>
        </div>
        {/* COMPONENT DIALOG */}
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar senha
            </Button>
          }
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
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Senha obrigatória",
                    minLength: 3,
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="confirmPassword"
                      placeholder=""
                      onChange={(e) => {
                        field.onChange(e);
                        setErrorApi(""); // Limpa o erro ao modificar o input
                      }}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </section>
            </>
          }
          title="Alterar senha"
          isLoading={isLoading}
          btnLabel="Alterar"
          btnClick={handleSubmit(updatePassword)}
        />
      </section>

      {/* PHONES */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label>Telefone</Label>
          <p className="text-colorText text-sm truncate">(12) 98850-3575</p>
          <p className="text-colorText text-sm truncate">(12) 98850-3575</p>
        </div>
        {/* COMPONENT DIALOG */}
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

      {/* DELETE ACCOUNT */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label className="text-red-600">Excluir conta</Label>
          <p className="text-colorText text-sm text-pretty">
            Deleta permanentemente a conta e os seus dados do nosso sistema
          </p>
        </div>
        {/* COMPONENT DIALOG */}
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
