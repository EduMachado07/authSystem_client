import { Outlet } from "react-router-dom";

import background from "../../assets/imgLogin.jpg";

function Auth() {
  return (
    <main className="h-dvh flex">
      <section className="xl:w-2/5 h-full max-lg:hidden overflow-hidden">
        <img src={background} alt="" className="max-xl:h-full" />
      </section>
      {/* FORMULARIO */}
      <section className="bg-colorBack h-full xl:w-3/5 w-full flex flex-col gap-7 justify-center items-center px-8 md:px-28 xl:px-52">
        {/* -- component forms -- */}
        <Outlet />
      </section>
    </main>
  );
}

export default Auth;
