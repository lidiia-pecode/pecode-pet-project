import { Box, Card, CardContent, Typography } from '@mui/material';
import { styles } from './AboutFeatures.styles';
import { features } from '../../constants';

export const AboutFeatures = () => {
  return (
    <Box sx={styles.featuresContainer}>
      {features.map((feature, index) => (
        <Card key={index} sx={styles.cardContainer}>
          <CardContent sx={styles.cardContent}>

            <Typography variant='h5' sx={styles.featureTitle}>
              <Box sx={styles.iconWrapper}>{feature.icon}</Box>
              {feature.title}
            </Typography>

            <Typography sx={styles.featureDescription}>
              {feature.description}
            </Typography>

            <Typography sx={styles.chipsTitle}>Key Features</Typography>
            <Box sx={styles.chipsList}>
              {feature.chips.map((chip, i) => (
                <Typography key={i} sx={styles.chipItem}>
                  {chip}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
