import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useUserStore from "@/contexts/user.context";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";

import { apiUser } from "@/store/axios.store";

const Security = () => {
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
  } = useForm({
    defaultValues: {
      firstPhone: user.phone?.[0]?.number || "",
      secondPhone: user.phones?.[1]?.number || "",
    },
  });

  useEffect(() => {
    setValue("firstPhone", user.phones?.[0]?.number || "");
    setValue("secondPhone", user.phones?.[1]?.number || "");
  }, [user.phones, setValue]);

  function formatPhone(phone) {
    return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  function formatPhoneInput(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11); // Limita a 11 dígitos

    if (digits.length <= 10) {
      return digits.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else {
      return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }
  }

  // UPDATE DATA USER
  // API CALL
  // --- UPDATE EMAIL ---
  async function updateEmail(data) {
    try {
      setIsLoading(true);
      // const res = await apiUser.post("/login", {
      //   email: user.email,
      //   newEmail: data.email,
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
      // const res = await apiUser.post("/", {
      //   email: user.email,
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
      // const res = await apiUser.post("/", {
      //   email: user.email,
      //   fistPhone: data.fistPhone,
      //   secondPhone: data.secondPhone,
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
      // const res = await apiUser.delete("/login", {
      //   email: user.email,
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
          <p className="text-colorText text-sm truncate">{user.name}</p>
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
                {/* ERRORS API */}
                {errorApi && (
                  <p className="text-red-500 font-semibold">{errorApi}</p>
                )}
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
              {/* ERRORS API */}
              {errorApi && (
                <p className="text-red-500 font-semibold">{errorApi}</p>
              )}
              {/* PASSWORD */}
              <section className="flex flex-col gap-3">
                <Label htmlFor="password" className="text-sm">
                  Nova senha
                </Label>
                {/* input */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Senha obrigatória",
                    minLength: {
                      value: 7,
                      message: "A senha deve ter no mínimo 7 caracteres",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      id="password"
                      onChange={(e) => {
                        field.onChange(e);
                        setErrorApi(""); // Limpa o erro ao modificar o input
                      }}
                    />
                  )}
                />
              </section>
              {/* CONFIRM PASSWORD */}
              <section className="flex flex-col gap-3">
                <Label htmlFor="confirmPassword" className="text-sm">
                  Confirmar senha
                </Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Senha obrigatória",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
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
          {user.phones.map((item, index) => (
            <p key={index} className="text-colorText text-sm truncate">
              {item.number && formatPhone(item.number)}
            </p>
          ))}
        </div>
        {/* COMPONENT DIALOG */}
        <ComponentDialog
          trigger={
            <Button size={"sm"} variant={"outline"}>
              Alterar telefone
            </Button>
          }
          content={
            <>
              {/* ERRORS API */}
              {errorApi && (
                <p className="text-red-500 font-semibold">{errorApi}</p>
              )}
              <p className="font-semibold underline underline-offset-2 text-sm my-2">
                Obs: Telefones não são obrigatórios
              </p>
              <section className="flex flex-col gap-3">
                <Label htmlFor="firstPhone" className="text-sm">
                  Telefone (1)
                </Label>
                <Controller
                  name="firstPhone"
                  control={control}
                  // rules={{}}
                  render={({ field }) => (
                    <Input {...field} id="firstPhone" maxLength={11} />
                  )}
                />
                <Label htmlFor="secondPhone" className="text-sm">
                  Telefone (2)
                </Label>
                <Controller
                  name="secondPhone"
                  control={control}
                  // rules={{}}
                  render={({ field }) => (
                    <Input {...field} id="secondPhone" maxLength={11} />
                  )}
                />
              </section>
            </>
          }
          title="Alterar telefone"
          isLoading={isLoading}
          btnLabel="Alterar"
          btnClick={handleSubmit(updatePhones)}
        />
      </section>

      {/* DELETE ACCOUNT */}
      <section className="flex justify-between items-end">
        <div className="flex flex-col gap-3 w-3/5">
          <Label className="text-[#ff6467]">Excluir conta</Label>
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
          isLoading={isLoading}
          btnClick={handleSubmit(deleteUser)}
        />
      </section>
    </main>
  );
};

export default Security;
