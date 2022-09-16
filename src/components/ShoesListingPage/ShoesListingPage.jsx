import ActionButton from '../../sharedComponent/ActionButton/ActionButton';
import './styles.scss';
const ShoesListingPage = ({ highestRatedShoes, restartHandler }) => {
    return (
        <div className="shoeslisting-wrapper">
            <strong>Congratulations!</strong>
            <label>Bases on your selection we decided on the <strong>{highestRatedShoes[0].name}</strong></label>
            <div className="shoes-placeholder">
                <img src={`/assets/${highestRatedShoes[0].name}.png`} />
                <p>{highestRatedShoes[0].name}</p>
            </div>


            <div className='similar-options'>
                <strong>Similar Options</strong>
                {highestRatedShoes.slice(1).map((shoes) => {
                    return <div className="shoes-placeholder" key={shoes.id}>
                        <img src={`/assets/${shoes.name}.png`} />
                        <p>{shoes.name}</p>
                    </div>
                })}
            </div>

            <ActionButton text="Retake Quiz" varient={"contained"} clickHandler={restartHandler} />
        </div>
    )
}
export default ShoesListingPage