import { countryDropdownStyles } from '@/components/weather/LocationPicker/LocationPicker.styles';
import { Box } from '@mui/material';

export function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;

  const startIndex = text.toLowerCase().indexOf(query.toLowerCase());
  if (startIndex === -1) return text;

  const endIndex = startIndex + query.length;

  return (
    <>
      {text.slice(0, startIndex)}
      <Box
        component='span'
        sx={countryDropdownStyles.highlited}
      >
        {text.slice(startIndex, endIndex)}
      </Box>
      {text.slice(endIndex)}
    </>
  );
}
