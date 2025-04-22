import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Loader2 } from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/axios.config";

const AuthCode = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors, isSubmitted },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const codeValue = watch("code");
  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get("token");
  const typeAuth = searchParams.get("type");

  // API CALL
  async function onSubmit(data) {
    try {
      setIsLoading(true);
      const res = await apiAuth.post("/verify-code", {
        token: urlToken,
        code: data.code,
      });

      if (typeAuth === "register") {
        navigate("/profile");
      } else {
        navigate(`/reset-password?token=${urlToken}`);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Erro na autenticação. Tente novamente mais tarde.";

      setErrorApi(message);
      setDisabledButton(true);
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  const [timer, setTimer] = useState(90);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (timer && isRunning > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  async function resendCode() {
    try {
      // await apiAuth.post("/verify-code", {
      //   token: urlToken,
      // });
      setTimer(90);
      setIsRunning(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-8 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Código de Autenticação
      </h1>

      {/* ERRORS API */}
      {errorApi && (
        <p className="text-red-500 font-semibold w-full -mb-3 text-pretty">
          {errorApi}
        </p>
      )}

      <p className="text-md font-semibold text-pretty">
        Enviamos um código de autenticação para o seu email, digite os números
        nos campos abaixo para verificar o seu acesso.
      </p>

      {/* CODE FIELD */}
      <section className="flex flex-col gap-3">
        <Controller
          name="code"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              {...field}
              onChange={(value) => {
                field.onChange(value);
                setDisabledButton(false);
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <div className="w-full text-right">
          <button
            disabled={isRunning}
            onClick={resendCode}
            className={`${isRunning ? "text-zinc-700/50" : "cursor-pointer"}`}
          >
            Reenviar código {isRunning && timer}
          </button>
        </div>
      </section>

      {/* SEND BUTTON */}
      <Button
        disabled={!codeValue || codeValue.length < 6 || disabledButton}
        className="w-full"
        type="submit"
        size="lg"
      >
        {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Verificar"}
      </Button>
    </form>
  );
};

export default AuthCode;
