import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/axios.config";

const FormsResetPassword = () => {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  // API CALL
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const res = await apiAuth.post("/alter-password", {
        token: urlToken,
        password: data.password,
      });
      navigate("/profile");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro ao registrar nova senha. Tente novamente mais tarde.";

      setErrorApi(message);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Nova Senha
      </h1>

      {/* ERRORS API */}
      {errorApi && (
        <p className="text-red-500 font-semibold -mb-3">{errorApi}</p>
      )}

      {/* NEW PASSWORD FIELD */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <Controller
          name="newPassword"
          control={control}
          rules={{ required: "Informe uma nova senha" }}
          render={({ field }) => (
            <Input
              {...field}
              id="newPassword"
              type="password"
              placeholder="senha"
            />
          )}
        />
        {errors.newPassword && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.newPassword.message}
          </p>
        )}
      </section>

      {/* CONFIRM PASSWORD FIELD */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirme a sua senha",
            validate: (value) =>
              value === getValues("newPassword") || "Senhas diferentes",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="confirmPassword"
              type="password"
              placeholder="senha"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </section>

      {/* SEND BUTTON */}
      <Button type="submit" size="lg">
        {isLoading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          "Redefinir senha"
        )}
      </Button>
    </form>
  );
};

export default FormsResetPassword;
