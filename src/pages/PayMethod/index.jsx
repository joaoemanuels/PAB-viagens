import { QrCode, Barcode, ScanBarcodeIcon, MoveRight } from "lucide-react";
import Header from "../../components/ui/Header";
import styles from "./payMethod.module.css";

export default function PayMethod() {
  return (
    <section className={styles.payMethod}>
      <Header navigationType="back" />

      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Formas de Pagamento</h1>
          <p>
            Gerencie seus cartões salvos e opções de pagamento para suas
            viagens.
          </p>
        </header>

        <div className={styles.sectionBlock}>
          <div className={styles.optionsList}>
            <div className={styles.optionItem}>
              <div className={styles.optionLeft}>
                <QrCode size={22} className={styles.pixIcon} />
                <div>
                  <p className={styles.optionName}>Pix</p>
                  <p className={styles.optionDescription}>
                    Aprovação imediata. 5% de desconto nas passagens.
                  </p>
                </div>
              </div>
              <span className={styles.arrowIcon}>
                <MoveRight />
              </span>
            </div>

            <div className={styles.optionItem}>
              <div className={styles.optionLeft}>
                <Barcode size={22} className={styles.boletoIcon} />
                <div>
                  <p className={styles.optionName}>Boleto Bancário</p>
                  <p className={styles.optionDescription}>
                    Aprovação em até 3 dias úteis.
                  </p>
                </div>
              </div>
              <span className={styles.arrowIcon}>
                <MoveRight />
              </span>
            </div>

            <div className={styles.optionItem}>
              <div className={styles.optionLeft}>
                <ScanBarcodeIcon size={22} className={styles.boletoIcon} />
                <div>
                  <p className={styles.optionName}>Pagamento no Embarque</p>
                  <p className={styles.optionDescription}>
                    Aprovação em até 3 dias úteis.
                  </p>
                </div>
              </div>
              <span className={styles.arrowIcon}>
                <MoveRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
