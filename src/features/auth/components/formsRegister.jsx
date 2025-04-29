import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

// import Google from "./svgGoogle";
// import Github from "./svgGithub";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/axios.store";

const FormsRegister = () => {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // API CALL
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const res = await apiAuth.post("/register", {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      const tokenUrl = res.data.user.UrlVerificationTokens[0].token;

      navigate(`/auth-code?token=${tokenUrl}&type=register`);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao registar usuário. Tente novamente mais tarde.";

      setErrorApi(message);
      setDisabledButton(true);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">Cadastro</h1>

      {/* ERRORS API */}
      {errorApi && <p className="text-red-500 font-semibold">{errorApi}</p>}

      <div className="flex max-md:flex-col md:justify-between gap-6 w-full">
        {/* NAME FIELD */}
        <section className="flex flex-col gap-3 md:w-2/4">
          <Label htmlFor="nome">Nome</Label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} id="nome" placeholder="primeiro nome" />
            )}
          />
        </section>
        {/* LASTNAME FIELD */}
        <section className="flex flex-col gap-3 md:w-2/4">
          <Label htmlFor="sobrenome">Sobrenome</Label>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input {...field} id="sobrenome" placeholder="sobrenome" />
            )}
          />
        </section>
      </div>
      {/* ERRORS */}
      {(errors.name || errors.lastName) && (
        <p className="text-red-500 font-semibold text-sm -mt-4">
          Nome e sobrenome são obrigatórios
        </p>
      )}

      {/* EMAIL FIELD */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Formato do e-mail inválido",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              placeholder="seu email"
              onChange={(e) => {
                field.onChange(e);
                setErrorApi(""); // Limpa o erro ao modificar o input
                setDisabledButton(false);
              }}
            />
          )}
        />
        {/* ERRO EMAIL */}
        {errors.email && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.email.message}
          </p>
        )}
      </section>
      {/* PASSWORD FIELD */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Senha é obrigatória" }}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="senha"
              onChange={(e) => {
                field.onChange(e);
                setErrorApi("");
              }}
            />
          )}
        />
        {/* ERRO SENHA */}
        {errors.password && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.password.message}
          </p>
        )}
      </section>

      {/* SEND BUTTON */}
      <Button type="submit" size="lg">
        {isLoading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          "Criar conta"
        )}
      </Button>

      {/* LINKS */}
      <>
        <p className="text-sm font-semibold text-center">
          Já possui uma conta?{" "}
          <Link
            to={"/login"}
            className="text-colorSecondary underline underline-offset-2"
          >
            Entre por aqui
          </Link>
        </p>
      </>
    </form>
  );
};

export default FormsRegister;
