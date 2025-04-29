import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";

import perfil from "../../../assets/perfil.assets.jpg";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useUserStore from "@/contexts/user.context";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { apiUser } from "@/store/axios.store";

const Account = () => {
  const { user, clearUser } = useUserStore();
  const [errorApi, setErrorApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function logout() {
    clearUser();
    navigate("/login");
  }

  // API CALL
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      // const res = await apiUser.post("/login", {
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
      <SectionProfile props={"Conta"} />
      <section className="flex max-md:justify-between items-center gap-7">
        <section className="flex flex-col items-center gap-2">
          {/* IMAGEM PERFIL */}
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
        {/* NOME DO USUARIO */}
        <div className="w-56 md:w-72 flex flex-col gap-3">
          <Label>Nome de usuário</Label>
          <ComponentDialog
            trigger={
              <Input value={user.name} className="w-full text-left" readOnly />
            }
            content={
              <>
                {/* ERRORS API */}
                {errorApi && (
                  <p className="text-[#ff6467] font-semibold">{errorApi}</p>
                )}
                <form className="flex flex-col gap-3">
                  <Label htmlFor="name" className="text-sm">
                    Nome de usuário
                  </Label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: "Nome é obrigatório",
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="name"
                        onChange={(e) => {
                          field.onChange(e);
                          setErrorApi(""); // Limpa o erro ao modificar o input
                        }}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 font-semibold text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </form>
              </>
            }
            title="Alterar nome de usuário"
            isLoading={isLoading}
            btnLabel="Alterar"
            btnClick={handleSubmit(onSubmit)}
          />
          {/* MODAL PARA DESCONECTAR CONTA */}
          <ComponentDialog
            trigger={
              <Button
                size="link"
                variant="ghost"
                className="text-[#ff6467] w-fit"
              >
                Sair da conta
              </Button>
            }
            title="Tem certeza?"
            description="Você será desconectado da sua conta."
            btnVariant="destructive"
            btnLabel="Sair"
            btnClick={logout}
          />
        </div>
      </section>
    </main>
  );
};

export default Account;
