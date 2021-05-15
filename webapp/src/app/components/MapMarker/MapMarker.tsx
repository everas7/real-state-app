import { FaBuilding } from 'react-icons/fa';
import { PRIMARY_COLOR } from '../../constants';

interface Props {
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
}) => (
  <FaBuilding
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    size="16"
    color={PRIMARY_COLOR}
  />
);
