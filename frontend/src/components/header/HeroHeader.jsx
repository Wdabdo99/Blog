import style from "./css/hero.module.css";
import image from "./baghdad.jpg";

function HeroHeader() {
    return (
        <>
            <div className={style.hero}>
                <img src={image} alt="hero" />
            </div>
        </>
    );
}

export default HeroHeader;
