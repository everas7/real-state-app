import { FaBuilding } from 'react-icons/fa';
import { PRIMARY_COLOR } from '../../constants';

interface Props {
  lat: number;
  lng: number;
}

export const MapMarker: React.FC<Props> = () => (
  <FaBuilding color={PRIMARY_COLOR} />
);
