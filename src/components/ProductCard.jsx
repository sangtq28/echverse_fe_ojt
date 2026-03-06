import CarCard from "./CarCard";
import ClassCard from "./ClassCard";
import InfoCard from "./InfoCard";

function ProductCard({ name, price, onAdd }) {
  return (
    <div>
      <h2>{name}</h2>
      <span>${price}</span>
      //pasing one object
      <button onClick={() => onAdd({ name: name, price: price })}>
        Add to Cart
      </button>
      <CarCard />
      <InfoCard />
      <ClassCard />
    </div>
  );
}
export default ProductCard;
