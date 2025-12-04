import { Box, Button, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LocationData } from '@/types/Weather';
import { formatCoordinates } from '@/lib/utils/weather/location';

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
      sx={{
        justifyContent: 'flex-start',
        paddingY: 1.2,
        borderRadius: 2,
        textTransform: 'none',
        transition: '0.2s',
        backgroundColor: 'background.paper',
        '&:hover': {
          backgroundColor: '#edf2fa',
        },
      }}
    >
      <RoomIcon color='primary' sx={{ mr: 1 }} />

      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'left',
          display: 'flex',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
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
        sx={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: '0.2s',
        }}
      />
    </Button>
  );
};
