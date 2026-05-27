import Card from "../../components/Cards/cards";

const CARD_LABELS = {
  balance: "밸런스 맛집",
  quality: "퀄리티 맛집",
  value: "가성비 맛집",
};

export default function PickCard({ type, restaurant, activeTags, onTagClick, isActive }) {
  const { 
    image,
     name, 
     desc, 
     rating, 
     reviews, 
     category, 
     distance, 
     status,
     tags } = restaurant;

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
      isActive={isActive}
    />
  );
}
