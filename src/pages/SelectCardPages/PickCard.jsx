import "./cards.scss";
import Card from "../../components/Cards/cards";
import { RESTAURANTS } from "../../data/restaurants";

const CARD_LABELS = {
  balance: "밸런스 맛집",
  quality: "퀄리티 맛집",
  value: "가성비 맛집",
};

export default function PickCard({ type, activeTags, onTagClick }) {
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
  } = RESTAURANTS[type];

  return (
    <Card
      image={image}
      name={name}
      label={CARD_LABELS[type]}
      desc={desc}
      meta={`${rating} (${reviews}) · ${category} · ${distance}`}
      status={status}
      tags={tags}
      activeTags={activeTags}
      onTagClick={onTagClick}
    />
  );
}
