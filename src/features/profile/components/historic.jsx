import ComponentDialog from "./componentDialog";
import SectionProfile from "./sectionProfile";

const Historic = () => {
  return (
    <section className="flex flex-col gap-7">
      <SectionProfile props={"Histórico"} />
      {/* tabela de entradas do usuario */}
      <table className="table-fixed max-md:border-separate max-md:border-spacing-1.5">
        <thead>
          <tr className="w-full">
            <th className="w-1/3 text-left md:py-1">Dispositivo</th>
            <th className="w-1/3 text-left md:py-1">Última vez</th>
            <th className="w-1/3 text-left md:py-1">Localização</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="md:py-2 text-balance">Windows Device</td>
            <td className="md:py-2">31 de Out, 2025</td>
            <td className="md:py-2 text-balance">São José dos Campos</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Historic;
