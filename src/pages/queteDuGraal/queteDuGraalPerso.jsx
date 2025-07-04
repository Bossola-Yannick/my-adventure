import { useEffect } from "react";
import { UsePersistedState } from "../../hooks/usePersistedState";
import { handleInputChange } from "../../utils/handleInputChange";

export default function QdGPerso() {
  const [equipments, setEquipments] = UsePersistedState("qdg-equipement", [""]);
  const [pdvStart, setPdvStart] = UsePersistedState("start-pdv", "");
  const [pdvCurrent, setPdvCurrent] = UsePersistedState("current-pdv", "");
  const [xpFight, setXpFight] = UsePersistedState("xp-fight", 0);
  const [pdvPerm, setPdvPerm] = UsePersistedState("perm-pdvt", 0);
  // Gérer la modification d'une note
  const handleEquipChange = (index) => (e) => {
    const newEquips = [...equipments];
    newEquips[index] = e.target.value;
    setEquipments(newEquips);
  };
  // ajouter une nouvelle note
  const addEquipment = () => {
    setEquipments([...equipments, ""]);
  };
  // supprimer une note
  const deleteEquip = (index) => {
    setEquipments(equipments.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (xpFight >= 20) {
      const newPdvPerm = pdvPerm + 1;
      const newPdvStart = pdvStart + 1;
      const newPdvCurrent = pdvCurrent + 1;
      setPdvStart(newPdvStart);
      setPdvPerm(newPdvPerm);
      setPdvCurrent(newPdvCurrent);
      setXpFight(0);
    }
  }, [
    xpFight,
    pdvCurrent,
    pdvPerm,
    pdvStart,
    setPdvCurrent,
    setPdvPerm,
    setPdvStart,
    setXpFight,
  ]);
  return (
    <section>
      <h3 className="df-title">Ma Fiche Perso </h3>
      <article className="qdg-stats">
        <article className="qdg-stat">
          <label className="qdg-title" htmlFor="StartLife">
            Pts de Vie Départ
          </label>
          <input
            type="number"
            name="StartLife"
            id="StartLife"
            value={pdvStart}
            onChange={handleInputChange(setPdvStart, "number")}
          />
        </article>
        <article className="qdg-stat">
          <label className="qdg-title" htmlFor="currentLife">
            Pts de vie Actuelle
          </label>
          <input
            type="number"
            name="currentLife"
            id="currentLife"
            value={pdvCurrent}
            onChange={handleInputChange(setPdvCurrent, "number")}
          />
        </article>
      </article>
      <article className="qdg-stats">
        <article className="qdg-stat">
          <label className="qdg-title" htmlFor="xpFight">
            Expérience de combat
          </label>
          <input
            type="number"
            name="xpFight"
            id="xpFight"
            value={xpFight}
            onChange={handleInputChange(setXpFight, "number")}
          />
        </article>
        <article className="qdg-stat">
          <label className="qdg-title" htmlFor="xpFight">
            Pts de Vie Permanents
          </label>
          <input
            type="number"
            name="xpFight"
            id="xpFight"
            value={pdvPerm}
            readOnly
          />
        </article>
      </article>
      <section className="qdg-equipment">
        <h5 className="qdg-title">Equipments Transportés :</h5>
        <ul>
          {equipments.map((equip, i) => (
            <li key={i}>
              <input
                className="qdg-list"
                type="text"
                name={`equip-${i}`}
                value={equip}
                onChange={handleEquipChange(i)}
              />
              <span className="qdg-delete-equip" onClick={() => deleteEquip(i)}>
                X
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={addEquipment}
          className="qdg-note-button"
        >
          Ajouter un équipement
        </button>
      </section>
    </section>
  );
}
