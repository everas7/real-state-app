import { FaBuilding } from 'react-icons/fa';

interface Props {
  lat: number;
  lng: number;
}

export const MapMarker: React.FC<Props> = () => <FaBuilding color="#3eb49e" />;
