import SectionProfile from "./components/sectionProfile";
import ComponentDialog from "./components/componentDialog";

import Account from "./components/account";
import Security from "./components/security";
import Historic from "./components/historic";
import Preferences from "./components/preferences";

const Profile = () => {
  return (
    <main className="bg-colorBack py-12 px-7 lg:px-44 flex flex-col gap-7">
      {/* CONTA */}
      <Account />
      {/* SEGURANÇA */}
      <Security />
      {/* HISTORICO */}
      <Historic />
      {/* PREFERENCIAS */}
      <Preferences />
    </main>
  );
};

export default Profile;
