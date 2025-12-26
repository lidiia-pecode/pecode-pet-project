import { Box, Skeleton } from '@mui/material';
import { styles } from './CategoryFilterSkeleton.styles';

export const CategoryFilterSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box key={i} sx={styles.skeletonBox}>
          <Skeleton
            variant='rectangular'
            width={16}
            height={16}
            sx={styles.skeletonItem}
          />
          <Skeleton variant='text' width='50%' />
        </Box>
      ))}
    </>
  );
};
