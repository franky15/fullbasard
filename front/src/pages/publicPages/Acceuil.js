import React from "react";

//importattion de l'image heros.jpeg qui se trouve dans le dossier images
import herosImage from "../../images/digital.jpeg";
import lateralDigital from "../../images/digital.jpeg";

const Acceuil = () => {

    

	return <div className="Acceuil">
    <main>
        <div className="containervoisPlus" style={{ backgroundImage: `url(${herosImage})`,    backgroundPosition: "-150px 0"   }}>
           
            <div className="voisPlus">
                <div className="block1" >
                    <p className="paraph1">Notre Vision</p>
                    <p className="paraph2">En savoir plus</p>
                </div>
                <div className="block2">
                    <p className="paraph1">Notre Essence​</p>
                    <p className="paraph2">En savoir plus</p>
                </div>
            </div>
        </div>
        <section className="section-info">
            <div className="entreprise">
                <h2 className="h2Center">« ENTREPRISE DE SOLUTION INFORMATIQUE ET D’E-COMMERCE »​</h2>
                <p className="pCenter">Nous accompagnons les métiers dans leur transformation digitale pour innover et développer leurs services.</p>
            </div>
            <div className="Partons">
                <p className="h2Center">PARTONS ENSEMBLE VERS LE MONDE DU NUMÉRIQUE!​</p>
                <p className="pCenter"><span className="colorLetterHtag">#</span> <span className="colorLetter">Full</span><span className="colorLetter">B</span>asard​</p>
            </div>
            <div className="notreVision">
                <div className="conteneur-image"  style={{ backgroundImage: `url(${lateralDigital})` }}>
                    
                </div>
                <div className="pCenterViv">
                    <h2 className="h2Center">NOTRE VISION DU NUMÉRIQUE​</h2>
                    <p className="pCenter pCenterGris" >« Nous développons les outils de travail des métiers pour accroître leur performance opérationnelle et satisfaire leur client. »​</p>
                </div>
            </div>
        </section>
       
       
    </main>
</div>

};

export default Acceuil;
