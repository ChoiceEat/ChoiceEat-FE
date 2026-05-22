import "./cards.scss";
import Card from "../../components/Cards/cards";
import { RESTAURANTS } from "../../data/restaurants";

export default function QualityCard({ activeTags, onTagClick }) {
  const {
    image,
    name,
    desc,
    rating,
    reviews,
    category,
    distance,
    status,
    tags,
  } = RESTAURANTS.quality;
  return (
    <Card
      image={image}
      name={name}
      label="퀄리티 맛집"
      desc={desc}
      meta={`${rating} (${reviews}) · ${category} · ${distance}`}
      status={status}
      tags={tags}
      activeTags={activeTags}
      onTagClick={onTagClick}
    />
  );
}
