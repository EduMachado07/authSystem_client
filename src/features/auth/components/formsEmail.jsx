import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/axios.config";

const FormsEmail = () => {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");
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
      const res = await apiAuth.post("/alter-password", {
        email: data.email,
      });

      const tokenUrl = res.data.user.token;

      navigate(`/auth-code?token=${tokenUrl}&type=reset`);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro no sistema. Tente novamente mais tarde.";

      setErrorApi(message);
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
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Redefinir Senha
      </h1>

      {/* ERRORS API */}
      {errorApi && (
        <p className="text-red-500 font-semibold -mb-3">{errorApi}</p>
      )}

      <p className="text-md font-semibold text-pretty">
        Informe o seu e-mail para encontrarmos a sua conta, e assim, enviarmos
        uma mensagem para redefinição da sua senha.
      </p>

      {/* FIELD EMAIL */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Informe o seu e-mail",
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

      {/* SEND BUTTON */}
      <Button type="submit" size="lg">
        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Entrar"}
      </Button>

      <p className="text-sm font-semibold text-center">
        Lembrou de sua senha?{" "}
        <Link
          to={"/login"}
          className="text-colorSecondary underline underline-offset-2"
        >
          Entre por aqui
        </Link>
      </p>
    </form>
  );
};

export default FormsEmail;
