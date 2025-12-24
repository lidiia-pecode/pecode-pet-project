import { Typography } from '@mui/material';
import { Box, Card } from '@mui/material';
import { technologies } from '../../constants';
import { styles } from './AboutTechStack.styles';

export const AboutTeckStack = () => {
  return (
    <Box>
      <Typography variant='h5' sx={styles.techTitle}>
        Tech Stack
      </Typography>
      <Box sx={styles.techContainer}>
        {technologies.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <Card key={index} sx={styles.techCard}>
              <Box className='icon' sx={styles.techIcon}>
                <IconComponent size={32} strokeWidth={1.5} />
              </Box>
              <Typography variant='body2' sx={styles.techIconName}>
                {tech.name}
              </Typography>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
