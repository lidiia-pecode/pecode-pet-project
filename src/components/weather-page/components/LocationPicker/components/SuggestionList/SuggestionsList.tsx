import { Paper, List, ListItemButton, ListItemText } from '@mui/material';
import { styles } from './SuggestionList.styles';

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface SuggestionListProps {
  suggestions: NominatimResult[];
  onSelect: (item: NominatimResult) => void;
}

export const SuggestionList = ({
  suggestions,
  onSelect,
}: SuggestionListProps) => {
  if (suggestions.length === 0) return null;

  return (
    <Paper elevation={3} sx={styles.paper}>
      <List dense>
        {suggestions.map((s: NominatimResult) => (
          <ListItemButton key={s.place_id} onClick={() => onSelect(s)}>
            <ListItemText
              primary={s.display_name}
              secondary={`${Number(s.lat).toFixed(4)}, ${Number(s.lon).toFixed(
                4
              )}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};
