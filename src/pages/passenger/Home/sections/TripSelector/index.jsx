import { useState } from "react";
import { Locate, MapPin, Search } from "lucide-react";

import styles from "./tripSelector.module.css";

import Button from "../../../../../components/ui/Button";

export default function TripSelector({ setOrigin, setDestination }) {
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");

  function handleSearch() {
    setOrigin(originInput);
    setDestination(destinationInput);
  }

  return (
    <section className={styles.tripSelector}>
      <div className={styles.tripSelectorContainer}>
        <div className={styles.tripSelectorLocate}>
          <Locate className={styles.iconStart} size={20} />
          <input
            type="text"
            placeholder="De onde você sai?"
            value={originInput}
            onChange={(e) => setOriginInput(e.target.value)}
          />
        </div>

        <div className={styles.tripSelectorLocate}>
          <MapPin className={styles.iconEnd} size={20} />
          <input
            type="text"
            placeholder="Para onde quer ir?"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
          />
        </div>

        <Button
          type={"submit"}
          variant="primary"
          onClick={handleSearch}
          content={"Buscar Viagens"}
          btnIcon={<Search />}
        />
      </div>
    </section>
  );
}
