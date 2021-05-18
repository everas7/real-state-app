import { Badge } from 'react-bootstrap';
import { FaBuilding } from 'react-icons/fa';
import { PRIMARY_COLOR } from '../../constants';

interface Props {
  price?: number;
  lat: number;
  lng: number;
  onClick?(): void;
  onMouseOver?(): void;
  onMouseOut?(): void;
}

export const MapMarker: React.FC<Props> = ({
  onClick,
  onMouseOver,
  onMouseOut,
  price,
}) =>
  price ? (
    <h6>
      <Badge
        variant="light"
        pill={true}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        ${price.toLocaleString()}
      </Badge>
    </h6>
  ) : (
    <FaBuilding
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      size="16"
      color={PRIMARY_COLOR}
    />
  );
