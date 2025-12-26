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
        sx={{ fontWeight: 'bold', bgcolor: '#c6d4e9ff', borderRadius: 0.5 }}
      >
        {text.slice(startIndex, endIndex)}
      </Box>
      {text.slice(endIndex)}
    </>
  );
}
