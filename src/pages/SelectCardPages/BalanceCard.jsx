import "./cards.scss";
import Card from "../../components/Cards/cards";
import { RESTAURANTS } from "../../data/restaurants";

export default function BalanceCard({ activeTags, onTagClick }) {
  const { image, name, price, desc, rating, reviews, category, distance, status, tags } =
    RESTAURANTS.balance;
  return (
    <Card
      image={image}
      name={name}
      price={price}
      label="밸런스 맛집"
      desc={desc}
      meta={`${rating} (${reviews}) · ${category} · ${distance}`}
      status={status}
      tags={tags}
      activeTags={activeTags}
      onTagClick={onTagClick}
    />
  );
}
