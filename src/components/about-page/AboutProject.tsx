'use client';

import { Container } from '@mui/material';

import { styles } from './AboutProject.styles';
import { AboutHeader } from './components/AboutHeader';
import { AboutFeatures } from './components/AboutFeatures';
import { AboutTeckStack } from './components/AboutTechStack';

export const AboutProject = () => {
  return (
    <Container maxWidth='lg' sx={styles.container}>
      <AboutHeader />

      <AboutFeatures />

      <AboutTeckStack />
    </Container>
  );
};
