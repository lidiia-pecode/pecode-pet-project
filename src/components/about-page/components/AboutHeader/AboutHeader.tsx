import { Box, Typography } from "@mui/material";
import { styles } from "./AboutHeader.styles";

export const AboutHeader = () => {
  return (
    <Box sx={styles.container}>
      <Typography variant='h1' sx={styles.title}>
        About This Project
      </Typography>
      <Typography variant='body1' sx={styles.subtitle}>
        A simple web app including authentication, a product catalog, and an
        interactive weather dashboard.
      </Typography>
    </Box>
  );
}