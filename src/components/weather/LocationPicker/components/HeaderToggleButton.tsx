import { Box, Button, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocationData } from '@/types/Weather';
import { formatCoordinates } from '@/lib/utils/weather/location';
import { headerToggleButtonStyles } from '../LocationPicker.styles';

interface Props {
  isOpen: boolean;
  isSelected: boolean;
  location: LocationData | null;
  onClick: () => void;
}

export const HeaderToggleButton = ({
  isOpen,
  isSelected,
  location,
  onClick,
}: Props) => {
  return (
    <Button
      onClick={onClick}
      fullWidth
      variant='outlined'
      color='primary'
      sx={headerToggleButtonStyles.button}
    >
      <RoomIcon color='primary' sx={headerToggleButtonStyles.icon} />

      <Box sx={headerToggleButtonStyles.contentBox}>
        <Typography variant='subtitle1' sx={headerToggleButtonStyles.mainText}>
          {isSelected ? 'Change Location' : 'Choose Location'}
        </Typography>

        {isSelected && location && (
          <Typography variant='body2' color='text.secondary'>
            {location?.label ||
              `${formatCoordinates(location.lat, location.lon)}`}
          </Typography>
        )}
      </Box>

      <ExpandMoreIcon
        sx={
          isOpen
            ? headerToggleButtonStyles.expandIconOpen
            : headerToggleButtonStyles.expandIconClosed
        }
      />
    </Button>
  );
};
